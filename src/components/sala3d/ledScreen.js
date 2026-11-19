/* -------------------------------------------------------------------------
 * The pixel LED screen behind the DJ: a small rotation of "screens".
 *
 *   1. Quartier logo, centred, on black (the unlit LEDs stay visible)
 *   2. FRIDAYS  · VelvetClub logo on red
 *   3. SATURDAYS · Cova logo on dark blue
 *
 * The GLB carries a static pixel screen (LED_Screen_DJ_Pixels_*) made of
 * geometry. Here it is swapped for one plane with a canvas texture:
 *   - every screen is pre-drawn once on a small "LED" canvas (one canvas
 *     pixel = one LED), so logos and text come out naturally pixelated;
 *   - each frame composes the current screen(s) on that LED canvas, scales it
 *     up without smoothing and lays a pre-drawn dark grid on top.
 * Screens hold, then the next one pushes in from the right behind a bright
 * scan line. The canvas is only redrawn during transitions, the timer only
 * runs while the viewer is on screen and the tab is visible, and with reduced
 * motion the Quartier screen is shown once and never changes.
 * ---------------------------------------------------------------------- */
import { Box3, CanvasTexture, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, Vector3 } from 'three'

const LED_PITCH = 0.045  // metres per LED on the web screen
const CELL = 6           // texture pixels per LED
const FPS = 30
const HOLD = 4.5         // seconds each screen stays
const SWITCH = 0.9       // seconds of the push transition
const OFF_LED = '#15151b' // an unlit LED: dark, but visibly a screen
const LABEL_FONT = "700 {px}px Montserrat, 'Helvetica Neue', Arial, sans-serif"

const SCREENS = [
  { id: 'quartier', bg: null, logo: '/brand/quartier-white.svg', logoH: 0.56 },
  { id: 'fridays', bg: ['#e0261b', '#b5160f'], label: 'FRIDAYS', logo: '/brand/velvetclub-white.png', logoW: 0.86 },
  { id: 'saturdays', bg: ['#0d1a4a', '#050a24'], label: 'SATURDAYS', logo: '/brand/cova-cream.png', logoH: 0.6 },
]

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

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
  const canvas = (w, h) => Object.assign(document.createElement('canvas'), { width: w, height: h })

  const led = canvas(cols, rows)
  const lctx = led.getContext('2d')
  const out = canvas(cols * CELL, rows * CELL)
  const octx = out.getContext('2d')
  octx.imageSmoothingEnabled = false

  // dark gaps between the LEDs, drawn once
  const grid = canvas(out.width, out.height)
  const gctx = grid.getContext('2d')
  gctx.fillStyle = 'rgba(0,0,0,0.9)'
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

  /* ---- pre-draw every screen on its own LED-sized canvas */
  function paintScreen(s, img) {
    const c = canvas(cols, rows)
    const x = c.getContext('2d')
    if (s.bg) {
      const g = x.createLinearGradient(0, 0, 0, rows)
      g.addColorStop(0, s.bg[0])
      g.addColorStop(1, s.bg[1])
      x.fillStyle = g
    } else {
      x.fillStyle = OFF_LED
    }
    x.fillRect(0, 0, cols, rows)
    let top = 0
    if (s.label) {
      const px = Math.max(6, Math.round(rows * 0.15))
      x.font = LABEL_FONT.replace('{px}', px)
      x.textAlign = 'center'
      x.textBaseline = 'top'
      x.fillStyle = '#ffffff'
      if ('letterSpacing' in x) x.letterSpacing = `${Math.round(px * 0.25)}px`
      x.fillText(s.label, cols / 2, Math.round(rows * 0.1))
      top = Math.round(rows * 0.1) + px
    }
    if (img) {
      const ar = img.naturalWidth / img.naturalHeight || 3
      const room = rows - top
      let w, h
      if (s.logoW) {
        w = cols * s.logoW
        h = w / ar
      } else {
        h = rows * s.logoH
        w = h * ar
      }
      if (h > room * 0.86) {
        h = room * 0.86
        w = h * ar
      }
      x.drawImage(img, Math.round((cols - w) / 2), Math.round(top + (room - h) / 2), Math.round(w), Math.round(h))
    }
    return c
  }

  let frames = SCREENS.map((s) => paintScreen(s, null))
  let ready = false
  Promise.all([
    document.fonts?.load(LABEL_FONT.replace('{px}', 12)).catch(() => {}),
    ...SCREENS.map((s) => loadImage(s.logo)),
  ]).then(([, ...imgs]) => {
    frames = SCREENS.map((s, i) => paintScreen(s, imgs[i]))
    ready = true
    last = ''
    draw(performance.now())
  })

  /* ---- compose */
  const t0 = performance.now()
  let last = ''
  const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)

  function draw(now) {
    const n = SCREENS.length
    const cycle = HOLD + SWITCH
    const t = reducedMotion ? 0 : (now - t0) / 1000
    const i = Math.floor(t / cycle) % n
    const local = t % cycle
    const k = local > HOLD ? ease((local - HOLD) / SWITCH) : 0
    const key = `${ready}|${i}|${k.toFixed(3)}`
    if (key === last) return
    last = key

    if (k === 0) {
      lctx.drawImage(frames[i], 0, 0)
    } else {
      const shift = Math.round(k * cols)
      lctx.drawImage(frames[i], -shift, 0)
      lctx.drawImage(frames[(i + 1) % n], cols - shift, 0)
      // bright scan line on the seam
      lctx.fillStyle = 'rgba(255,255,255,0.85)'
      lctx.fillRect(cols - shift - 1, 0, 2, rows)
      lctx.fillStyle = 'rgba(255,255,255,0.25)'
      lctx.fillRect(cols - shift - 4, 0, 3, rows)
    }
    octx.drawImage(led, 0, 0, out.width, out.height)
    octx.drawImage(grid, 0, 0)
    texture.needsUpdate = true
    request()
  }

  /* ---- run only while visible */
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
