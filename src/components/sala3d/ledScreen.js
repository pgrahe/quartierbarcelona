/* -------------------------------------------------------------------------
 * The pixel LED screen behind the DJ: a looping banner with the Quartier logo.
 *
 * The GLB carries a static pixel screen (LED_Screen_DJ_Pixels_*) made of
 * geometry. Here it is swapped for one plane with a canvas texture:
 *   - a small "LED" canvas (one canvas pixel = one LED) gets the background
 *     and the logo, so the logo is naturally pixelated;
 *   - it is scaled up without smoothing and a pre-drawn dark grid is laid on
 *     top, so every LED reads as a separate square.
 * Three drawImage calls per frame, ~24 fps, and only while the viewer is on
 * screen and the tab is visible (the viewer otherwise renders on demand).
 * With reduced motion the banner is drawn once, centred, and never moves.
 * ---------------------------------------------------------------------- */
import { Box3, CanvasTexture, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, Vector3 } from 'three'

const LOGO_URL = '/brand/quartier-white.svg'
const LED_PITCH = 0.06   // metres per LED on the web screen
const CELL = 8           // texture pixels per LED
const FPS = 24
const SPEED = 14         // LEDs per second
const GAP = 0.6          // space between logo repeats, in logo widths

export function createLedScreen({ root, scene, container, cutaways, request, reducedMotion }) {
  const pixels = []
  root.traverse((o) => {
    if (o.isMesh && o.name.startsWith('LED_Screen_DJ_Pixels')) pixels.push(o)
  })
  if (!pixels.length) return null

  const box = new Box3()
  for (const p of pixels) box.expandByObject(p)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  for (const p of pixels) p.visible = false

  const cols = Math.max(8, Math.round(size.x / LED_PITCH))
  const rows = Math.max(4, Math.round(size.y / LED_PITCH))

  const led = document.createElement('canvas')
  led.width = cols
  led.height = rows
  const lctx = led.getContext('2d')

  const out = document.createElement('canvas')
  out.width = cols * CELL
  out.height = rows * CELL
  const octx = out.getContext('2d')
  octx.imageSmoothingEnabled = false

  // dark grid between the LEDs, drawn once
  const grid = document.createElement('canvas')
  grid.width = out.width
  grid.height = out.height
  const gctx = grid.getContext('2d')
  gctx.fillStyle = 'rgba(0,0,0,0.85)'
  for (let i = 0; i <= cols; i++) gctx.fillRect(i * CELL - 1, 0, 2, grid.height)
  for (let j = 0; j <= rows; j++) gctx.fillRect(0, j * CELL - 1, grid.width, 2)

  const texture = new CanvasTexture(out)
  texture.colorSpace = SRGBColorSpace
  const material = new MeshBasicMaterial({ map: texture, toneMapped: false, side: DoubleSide })
  const plane = new Mesh(new PlaneGeometry(size.x, size.y), material)
  plane.name = 'LED_Screen_DJ_Banner'
  plane.rotation.y = Math.PI          // the screen faces the dance floor (-Z)
  plane.position.copy(center)
  plane.position.z -= 0.01
  scene.add(plane)
  // hide it together with the south wall when the camera is behind it
  cutaways.push({ mesh: plane, center: center.clone(), out: [0, 1] })

  const logo = new Image()
  let logoW = 0
  let logoH = 0
  logo.onload = () => {
    logoH = Math.round(rows * 0.62)
    logoW = Math.round(logoH * (logo.naturalWidth / logo.naturalHeight || 3.57))
    draw(performance.now())
  }
  logo.src = LOGO_URL

  function draw(now) {
    const t = now / 1000
    // slowly drifting purple / magenta background
    const g = lctx.createLinearGradient(0, 0, cols, rows)
    const h = (t * 8) % 360
    g.addColorStop(0, `hsl(${(280 + h * 0.15) % 360} 85% 32%)`)
    g.addColorStop(0.5, `hsl(${(315 + h * 0.15) % 360} 90% 42%)`)
    g.addColorStop(1, `hsl(${(265 + h * 0.15) % 360} 80% 28%)`)
    lctx.fillStyle = g
    lctx.fillRect(0, 0, cols, rows)

    if (logoW) {
      const y = Math.round((rows - logoH) / 2)
      if (reducedMotion) {
        lctx.drawImage(logo, Math.round((cols - logoW) / 2), y, logoW, logoH)
      } else {
        const period = Math.round(logoW * (1 + GAP))
        const shift = Math.floor(t * SPEED) % period
        for (let x = cols - shift; x > -logoW; x -= period) lctx.drawImage(logo, x, y, logoW, logoH)
        for (let x = cols - shift + period; x < cols; x += period) lctx.drawImage(logo, x, y, logoW, logoH)
      }
    }

    octx.drawImage(led, 0, 0, out.width, out.height)
    octx.drawImage(grid, 0, 0)
    texture.needsUpdate = true
    request()
  }

  // run only while visible
  let onScreen = true
  let timer = 0
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting
    sync()
  })
  io.observe(container)
  const onVis = () => sync()
  document.addEventListener('visibilitychange', onVis)
  function sync() {
    const run = !reducedMotion && onScreen && !document.hidden
    if (run && !timer) timer = setInterval(() => draw(performance.now()), 1000 / FPS)
    if (!run && timer) {
      clearInterval(timer)
      timer = 0
    }
  }
  draw(performance.now())
  sync()

  return {
    dispose() {
      clearInterval(timer)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      texture.dispose()
      material.dispose()
      plane.geometry.dispose()
    },
  }
}
