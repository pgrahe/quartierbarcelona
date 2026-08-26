import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './BrandMoment.css'

/**
 * Editorial collage — three portraits layered like physical prints dropped on
 * a table, drifting past each other as the page scrolls.
 *
 * How the motion works:
 *
 *  - Layout is pure CSS (`left`/`top`/`width` per layer), so the collage is
 *    already correct before a single frame runs and stays correct if JS never
 *    does. The loop only ever writes `transform`.
 *  - A normalised scroll progress `p` runs +1 (section still below the fold)
 *    → 0 (centred) → -1 (gone past). Each layer translates by `p × amplitude`.
 *  - Amplitudes differ per layer — the front print travels furthest, the back
 *    one least — which is what reads as depth. The largest gap between any two
 *    layers is ~62px against several hundred px of overlap, so they never come
 *    apart.
 *  - Every frame lerps toward the target instead of snapping to it. That is
 *    what keeps the drift smooth and stops it stuttering on a coarse
 *    trackpad or a momentum-scrolling phone.
 *  - An IntersectionObserver gates the loop: no rAF at all while the collage
 *    is off screen.
 *
 * Deliberately not a carousel, slideshow or timed loop. Nothing moves unless
 * the visitor scrolls.
 */

/** x/y are drift amplitudes in px at the extremes of travel. Front travels
 *  most. Small opposing x values stop it reading as a flat lift. */
const LAYERS = [
  { id: 'back', ampY: 24, ampX: -7 },
  { id: 'mid', ampY: 52, ampX: 4 },
  { id: 'front', ampY: 86, ampX: -5 },
]

const FRAMES = [
  {
    src: '/img/brand-moment-1000.jpg?v=2',
    srcSet: '/img/brand-moment-1000.jpg?v=2 1000w, /img/brand-moment-1600.jpg?v=2 1600w',
  },
  {
    src: '/img/brand-moment-2-1000.jpg',
    srcSet: '/img/brand-moment-2-1000.jpg 1000w, /img/brand-moment-2-1600.jpg 1600w',
  },
  {
    src: '/img/brand-moment-3-1000.jpg',
    srcSet: '/img/brand-moment-3-1000.jpg 1000w, /img/brand-moment-3-1600.jpg 1600w',
  },
]

/** How hard each frame pulls toward the target. Lower = softer, longer glide. */
const EASE = 0.085

export default function BrandMoment() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const layerRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const layers = layerRefs.current.filter(Boolean)
    if (!section || !layers.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let running = false
    const current = layers.map(() => 0)
    let target = 0

    const readTarget = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // +1 while the section sits below the viewport, -1 once it has passed.
      const raw = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
      target = Math.max(-1, Math.min(1, raw))
    }

    const tick = () => {
      let moving = false

      layers.forEach((el, i) => {
        const { ampY, ampX } = LAYERS[i]
        current[i] += (target - current[i]) * EASE
        if (Math.abs(target - current[i]) > 0.0005) moving = true
        const y = (current[i] * ampY).toFixed(2)
        const x = (current[i] * ampX).toFixed(2)
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })

      // Keep going while in view; once out of view, run on only until the
      // glide has settled, then stop burning frames.
      frame = running || moving ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readTarget()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running) start()
      },
      { rootMargin: '25% 0px' },
    )
    io.observe(section)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    readTarget()
    // Land on the correct offsets immediately rather than gliding in from 0.
    current.forEach((_, i) => (current[i] = target))
    start()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      layers.forEach((el) => (el.style.transform = ''))
    }
  }, [])

  const alts = [t.brand.imageAlt, t.brand.imageAlt2, t.brand.imageAlt3]

  return (
    <section className="moment section" ref={sectionRef} aria-label={t.brand.caption}>
      <div className="shell">
        <div className="moment__collage">
          {FRAMES.map((item, i) => (
            <figure
              key={LAYERS[i].id}
              className="moment__layer"
              data-layer={LAYERS[i].id}
              ref={(el) => {
                layerRefs.current[i] = el
              }}
            >
              <img
                className="moment__img"
                src={item.src}
                srcSet={item.srcSet}
                sizes="(max-width: 900px) 70vw, 34vw"
                alt={alts[i]}
                width="1600"
                height="2223"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
