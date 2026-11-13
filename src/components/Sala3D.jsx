import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './Sala3D.css'

const MODEL_URL = '/models/quartier-sala.glb?v=1'
const VIEW_IDS = ['overview', 'floor', 'mezzanine', 'ground']

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * "Explora la sala" — an interactive 3D model of the room.
 *
 * Nothing heavy happens until the section is about to scroll into view: then
 * the viewer module (three.js + the 0.5 MB model) is imported and the room
 * appears behind a single "Explorar" button. The button exists so the model
 * never hijacks a page scroll or a pinch on its way past; one tap and it is
 * live. Everything else is four view buttons and tappable table numbers.
 *
 * Server render / no JS: heading, copy and the poster ground only.
 */
export default function Sala3D() {
  const { t } = useLanguage()
  const s = t.sala3d
  const rootRef = useRef(null)
  const viewerRef = useRef(null)
  const [phase, setPhase] = useState('idle') // idle | loading | ready | error | nowebgl
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)
  const [view, setView] = useState('overview')
  const [selected, setSelected] = useState(null)

  // Load when the section is ~one screen away.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (!hasWebGL()) {
      setPhase('nowebgl')
      return
    }
    let cancelled = false
    const io = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        setPhase('loading')
        try {
          const { createViewer } = await import('./sala3d/viewer.js')
          if (cancelled || !rootRef.current) return
          viewerRef.current = createViewer(rootRef.current.querySelector('.sala3d__stage'), {
            modelUrl: MODEL_URL,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            onProgress: setProgress,
            onReady: () => setPhase('ready'),
            onSelect: setSelected,
            onError: (err) => {
              console.error('Sala3D: model failed to load', err)
              setPhase('error')
            },
          })
          viewerRef.current.setInteractive(false)
        } catch (err) {
          console.error('Sala3D: viewer failed to start', err)
          setPhase('error')
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      viewerRef.current?.dispose()
      viewerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    setActive(true)
    viewerRef.current?.setInteractive(true)
  }, [])

  const pickView = useCallback(
    (id) => {
      if (!active) start()
      setView(id)
      viewerRef.current?.clear()
      viewerRef.current?.setView(id)
    },
    [active, start],
  )

  const ready = phase === 'ready'

  return (
    <section id="sala-3d" className="sala3d section velvet" aria-labelledby="sala3d-title" ref={rootRef}>
      <div className="shell">
        <div className="sala3d__head">
          <p className="eyebrow sala3d__eyebrow" data-reveal>
            {s.eyebrow}
          </p>
          <h2 className="sala3d__title" id="sala3d-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            {s.title}
          </h2>
          <p className="sala3d__body" data-reveal style={{ '--reveal-delay': '140ms' }}>
            {s.body}
          </p>
        </div>

        <div className="sala3d__frame" data-reveal="mask">
          <div
            className={`sala3d__stage${active ? ' is-active' : ''}`}
            role="application"
            aria-label={s.ariaLabel}
          >
            <div className="sala3d__canvas" data-canvas />
            <div className="sala3d__labels" data-labels aria-hidden={!active} />

            {!active && (
              <div className="sala3d__veil">
                {phase === 'nowebgl' || phase === 'error' ? (
                  <p className="sala3d__status">{s.unavailable}</p>
                ) : (
                  <button type="button" className="sala3d__start" onClick={start} disabled={!ready}>
                    {ready ? s.start : `${s.loading}${progress ? ` · ${progress}%` : ''}`}
                  </button>
                )}
              </div>
            )}

            {selected && (
              <div className="sala3d__card" role="status">
                <div>
                  <p className="eyebrow sala3d__card-zone">{s.areas[selected.area]}</p>
                  <p className="sala3d__card-table">
                    {s.table} {selected.number}
                  </p>
                </div>
                <div className="sala3d__card-actions">
                  <TicketsCta variant="outline" size="sm" label={s.book} />
                  <button
                    type="button"
                    className="sala3d__close"
                    aria-label={s.close}
                    onClick={() => viewerRef.current?.clear()}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="sala3d__bar">
            <div className="sala3d__views" role="group" aria-label={s.viewsLabel}>
              {VIEW_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="sala3d__view"
                  aria-pressed={active && view === id}
                  onClick={() => pickView(id)}
                  disabled={!ready}
                >
                  {s.views[id]}
                </button>
              ))}
            </div>
            <p className="sala3d__hint">{s.hint}</p>
          </div>
        </div>

        <p className="sala3d__note">{s.note}</p>
      </div>
    </section>
  )
}
