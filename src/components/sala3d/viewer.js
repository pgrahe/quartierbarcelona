/* -------------------------------------------------------------------------
 * The 3D room viewer — plain three.js, no React inside.
 *
 * Loaded with a dynamic import only when the section nears the viewport, so
 * three.js (~150 KB gz) never touches the critical path of the page.
 *
 * Performance rules this file follows:
 *  - render ON DEMAND: no animation loop while nothing moves. The rAF loop
 *    only runs while the controls are damping or a camera tween is playing.
 *  - no shadows, no post-processing; one small PMREM environment, once.
 *  - pixel ratio capped (1.75) — the model is flat-shaded, more is wasted.
 *  - the model itself is pre-merged per material (~55 draw calls).
 *
 * Coordinates are glTF (Y-up, metres). Map north (the mezzanine) is -Z.
 * ---------------------------------------------------------------------- */
import {
  ACESFilmicToneMapping,
  Box3,
  Color,
  DirectionalLight,
  HemisphereLight,
  MathUtils,
  PMREMGenerator,
  PerspectiveCamera,
  Raycaster,
  SRGBColorSpace,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createLedScreen } from './ledScreen.js'

const BG = 0x0a0a0a
const BORDEAUX = new Color('#7a2230')
const GOLD = new Color('#d9c085')

/* The Blender materials are tuned for a dark, lit club. Seen from above
   under a neutral light they would read as a black box, so the viewer
   lifts them to a readable "scale model" in the brand's own tones. */
const MATERIAL_TONES = {
  Floor_DanceFloor_Grey: '#3b3a39',
  Floor_Tile_Grey: '#6f6b65',
  Floor_Platform_Dark: '#2a2224',
  Step_RedNosing: '#6b1f27',
  Wall_Charcoal: '#2b2b2c',
  Wall_MidGrey: '#4a4a4b',
  Column_Quilted_Black: '#1c1c1d',
  Slab_Edge_DarkRed: '#4a1a1f',
  Steel_Brushed: '#c9c6c0',
  Railing_OxideRed: '#8a2a22',
  Railing_PerforatedMesh: '#8a2a22',
  Panel_Beige_Diamond: '#a8977d',
  Upholstery_Taupe: '#6b5b4e',
  Upholstery_Cream: '#d8cfc2',
  Partition_Black: '#1a1a1a',
  Bar_Front_DarkPattern: '#232324',
  Bar_Top_Black_Gloss: '#111111',
  Shelf_Black: '#151515',
  DJ_Booth_Body: '#1d1d1e',
  DJ_Booth_Top_Grey: '#5d5a56',
  DJ_Equipment: '#0f0f10',
  Speaker_Black: '#141414',
  Lattice_H_Panel_Grey: '#8c8780',
  Wall_Slats_Black: '#161616',
  Door_DarkBronze: '#3a3128',
}

/** Camera presets: [camera position, look-at target], glTF coordinates. */
const VIEWS = {
  overview: { pos: [12.8, 26, 12], target: [12.8, 0, -11.6], upper: true },
  floor: { pos: [12.6, 10.5, -21.5], target: [12.2, 0.4, -6.5], upper: true },
  mezzanine: { pos: [12.4, 14.5, -11.5], target: [12.2, 3.5, -22.2], upper: true },
  ground: { pos: [12.8, 34, 1.5], target: [12.8, 0, -11.4], upper: false },
}

function toneFor(material) {
  const key = material.name.replace(/^MAT_/, '')
  return MATERIAL_TONES[key]
}

export function createViewer(container, { modelUrl, onProgress, onReady, onSelect, onError, reducedMotion }) {
  const canvasHost = container.querySelector('[data-canvas]')
  const labelHost = container.querySelector('[data-labels]')

  const renderer = new WebGLRenderer({
    antialias: (window.devicePixelRatio || 1) < 2,
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.setClearColor(BG)
  canvasHost.appendChild(renderer.domElement)

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex
  scene.environmentIntensity = 0.45
  pmrem.dispose()

  scene.add(new HemisphereLight(0xf2ece2, 0x2a1416, 1.6))
  const sun = new DirectionalLight(0xfff1dc, 1.6)
  sun.position.set(20, 40, 10)
  scene.add(sun)

  const camera = new PerspectiveCamera(38, 1, 0.1, 200)
  camera.position.fromArray(VIEWS.overview.pos)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.fromArray(VIEWS.overview.target)
  controls.enableDamping = true
  controls.dampingFactor = 0.09
  controls.screenSpacePanning = false
  controls.minDistance = 5
  controls.maxDistance = 48
  controls.maxPolarAngle = MathUtils.degToRad(82)
  controls.zoomToCursor = true
  controls.enabled = false
  controls.update()

  /* ---------------------------------------------------------------- state */
  const tables = []        // { mesh, number, area, level, label, base }
  const areas = new Map()  // area id -> mesh
  const upper = []         // level-1 meshes (hidden in the "ground" view)
  const cutaways = []      // { mesh, center, out } perimeter walls, hidden when in front of the camera
  let bounds = null
  let selected = null
  let tween = null
  let raf = 0
  let disposed = false
  let showUpper = true
  let led = null
  const size = { w: 1, h: 1 }

  /* ---------------------------------------------------------------- render loop (on demand) */
  function frame(now) {
    raf = 0
    if (disposed) return
    let moving = controls.update()
    if (tween) moving = stepTween(now) || moving
    clampTarget()
    updateCutaways()
    renderer.render(scene, camera)
    placeLabels()
    if (moving) raf = requestAnimationFrame(frame)
  }
  function request() {
    if (!raf && !disposed) raf = requestAnimationFrame(frame)
  }
  controls.addEventListener('change', request)

  function clampTarget() {
    if (!bounds) return
    const t = controls.target
    const cx = MathUtils.clamp(t.x, bounds.min.x, bounds.max.x)
    const cz = MathUtils.clamp(t.z, bounds.min.z, bounds.max.z)
    if (cx !== t.x || cz !== t.z) {
      camera.position.x += cx - t.x
      camera.position.z += cz - t.z
      t.x = cx
      t.z = cz
    }
  }

  /* A wall is hidden while the camera is on its outer side — the room is
     always seen like a dollhouse, from whichever side you orbit to. */
  const tmp = new Vector3()
  function updateCutaways() {
    for (const c of cutaways) {
      tmp.copy(camera.position).sub(c.center)
      c.mesh.visible = tmp.x * c.out[0] + tmp.z * c.out[1] < 0
    }
  }

  /* ---------------------------------------------------------------- camera tween */
  const ease = (x) => 1 - Math.pow(1 - x, 3)
  function flyTo(pos, target, ms = 900) {
    const toPos = new Vector3().fromArray(pos)
    const toTarget = new Vector3().fromArray(target)
    if (reducedMotion) {
      camera.position.copy(toPos)
      controls.target.copy(toTarget)
      request()
      return
    }
    tween = {
      t0: performance.now(),
      ms,
      fromPos: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPos,
      toTarget,
    }
    request()
  }
  function stepTween(now) {
    const k = Math.min(1, (now - tween.t0) / tween.ms)
    const e = ease(k)
    camera.position.lerpVectors(tween.fromPos, tween.toPos, e)
    controls.target.lerpVectors(tween.fromTarget, tween.toTarget, e)
    if (k >= 1) tween = null
    return true
  }

  /* ---------------------------------------------------------------- labels */
  const v = new Vector3()
  function placeLabels() {
    for (const t of tables) {
      if (!t.label) continue
      const visible = showUpper || t.level === 0
      v.copy(t.mesh.position)
      v.y += 0.95
      v.project(camera)
      if (!visible || v.z > 1) {
        t.label.style.visibility = 'hidden'
        continue
      }
      const x = (v.x * 0.5 + 0.5) * size.w
      const y = (-v.y * 0.5 + 0.5) * size.h
      t.label.style.visibility = 'visible'
      t.label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`
    }
  }

  /* ---------------------------------------------------------------- selection */
  function paint() {
    for (const t of tables) {
      const on = selected === t
      t.mesh.material.color.copy(on ? GOLD : BORDEAUX)
      t.mesh.material.emissive.copy(on ? GOLD : BORDEAUX)
      t.mesh.material.emissiveIntensity = on ? 0.55 : 0.25
      t.label?.classList.toggle('is-selected', on)
    }
    for (const [id, mesh] of areas) {
      const on = selected && selected.area === id
      mesh.material.opacity = on ? 0.55 : 0.18
    }
    request()
  }

  function select(number, { fly = true } = {}) {
    const t = tables.find((x) => x.number === number) || null
    selected = t
    paint()
    if (t && fly) {
      if (t.level === 1 && !showUpper) setUpper(true)
      const p = t.mesh.position
      // Keep the current viewing direction, just come closer to the table.
      const dir = camera.position.clone().sub(controls.target).normalize()
      const dist = 9
      flyTo([p.x + dir.x * dist, Math.max(p.y + 5.5, p.y + dir.y * dist), p.z + dir.z * dist], [p.x, p.y + 0.4, p.z], 800)
    }
    onSelect?.(t ? { number: t.number, area: t.area, level: t.level } : null)
  }

  function setUpper(on) {
    showUpper = on
    for (const m of upper) m.visible = on
    request()
  }

  /* Presets are framed for a landscape stage. On a narrow (portrait) stage
     the camera backs off along the same line until the room's width fits. */
  function fit() {
    const tanH = Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.aspect
    return Math.max(1, 0.5 / tanH)
  }
  function pose(name) {
    const view = VIEWS[name] || VIEWS.overview
    const k = fit()
    const t = new Vector3().fromArray(view.target)
    const p = new Vector3().fromArray(view.pos).sub(t).multiplyScalar(k).add(t)
    return { pos: p.toArray(), target: view.target, upper: view.upper }
  }
  let currentView = 'overview'
  function setView(name, { instant = false } = {}) {
    currentView = name
    const view = pose(name)
    setUpper(view.upper)
    if (instant) {
      camera.position.fromArray(view.pos)
      controls.target.fromArray(view.target)
      request()
    } else flyTo(view.pos, view.target)
  }

  /* ---------------------------------------------------------------- picking (tap, not drag) */
  const ray = new Raycaster()
  const ndc = new Vector2()
  let down = null
  function onPointerDown(e) {
    down = { x: e.clientX, y: e.clientY }
  }
  function onPointerUp(e) {
    if (!down || !controls.enabled) return
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y)
    down = null
    if (moved > 6) return
    const r = renderer.domElement.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    const hits = ray.intersectObjects(
      tables.filter((t) => t.mesh.visible).map((t) => t.mesh),
      false,
    )
    if (hits.length) {
      const t = tables.find((x) => x.mesh === hits[0].object)
      select(t.number)
    } else if (selected) {
      select(null, { fly: false })
    }
  }
  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointerup', onPointerUp)

  /* ---------------------------------------------------------------- resize */
  function resize() {
    const r = canvasHost.getBoundingClientRect()
    size.w = Math.max(1, r.width)
    size.h = Math.max(1, r.height)
    renderer.setSize(size.w, size.h, false)
    camera.aspect = size.w / size.h
    // Narrow (portrait) screens need a wider lens to keep the room in frame.
    camera.fov = camera.aspect < 0.9 ? 50 : 38
    camera.updateProjectionMatrix()
    controls.maxDistance = 48 * fit()
    // Until the visitor takes control, keep the opening view framed.
    if (!controls.enabled && !tween) setView(currentView, { instant: true })
    request()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvasHost)
  resize()

  /* ---------------------------------------------------------------- load */
  new GLTFLoader().load(
    modelUrl,
    (gltf) => {
      if (disposed) return
      const root = gltf.scene
      root.traverse((o) => {
        if (!o.isMesh) return
        const d = o.userData || {}
        o.matrixAutoUpdate = false
        o.updateMatrix()
        const mat = o.material
        mat.metalness = Math.min(mat.metalness, 0.2)
        const tone = toneFor(mat)
        if (tone) mat.color.set(tone)
        if (mat.name === 'MAT_Railing_PerforatedMesh') {
          mat.transparent = true
          mat.opacity = 0.45
          mat.depthWrite = false
        }
        if (Number(d.level) === 1) upper.push(o)
        if (d.cutaway) {
          const out = { north: [0, -1], south: [0, 1], east: [1, 0], west: [-1, 0] }[d.cutaway]
          if (out) cutaways.push({ mesh: o, center: new Box3().setFromObject(o).getCenter(new Vector3()), out })
        }
        if (d.category === 'vip_table') {
          o.material = mat.clone()
          tables.push({ mesh: o, number: Number(d.vip_number), area: d.vip_area_id, level: Number(d.level) || 0 })
        } else if (d.category === 'vip_area') {
          o.material = mat.clone()
          o.material.color.copy(BORDEAUX)
          o.material.transparent = true
          o.material.opacity = 0.18
          o.material.depthWrite = false
          areas.set(d.vip_area_id, o)
        }
      })
      tables.sort((a, b) => a.number - b.number)
      scene.add(root)
      root.updateMatrixWorld(true)
      // looping Quartier banner on the LED screen behind the DJ
      led = createLedScreen({ root, scene, container, cutaways, request, reducedMotion })

      bounds = new Box3().setFromObject(root)
      bounds.expandByScalar(-1.5)

      // One HTML label per table: a real button, a big easy tap target.
      for (const t of tables) {
        const b = document.createElement('button')
        b.type = 'button'
        b.className = 'sala3d__pin'
        b.textContent = String(t.number)
        b.dataset.table = String(t.number)
        b.addEventListener('click', () => select(t.number))
        labelHost.appendChild(b)
        t.label = b
      }
      paint()
      onReady?.({ tables: tables.map((t) => ({ number: t.number, area: t.area, level: t.level })) })
    },
    (e) => {
      if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100))
    },
    (err) => onError?.(err),
  )

  /* ---------------------------------------------------------------- public api */
  return {
    setView,
    select: (n) => select(n),
    clear: () => select(null, { fly: false }),
    setInteractive(on) {
      controls.enabled = on
      renderer.domElement.style.touchAction = on ? 'none' : 'pan-y'
    },
    dispose() {
      disposed = true
      led?.dispose()
      cancelAnimationFrame(raf)
      ro.disconnect()
      controls.dispose()
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.domElement.removeEventListener('pointerup', onPointerUp)
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry.dispose()
          o.material.dispose()
        }
      })
      envTex.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
      labelHost.replaceChildren()
    },
  }
}
