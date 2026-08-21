import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './BrandMoment.css'

/**
 * Campaign photographs, full bleed, stacked — the moment where the page stops
 * talking. Each frame keeps a portrait crop on mobile and a 2:1 crop on wide
 * screens so the subject survives both viewports.
 *
 * Parallax is a scroll-linked custom property, capped tight so it reads as
 * depth rather than as movement. Skipped entirely under reduced motion.
 */
const FRAMES = [
  {
    id: '1',
    portrait: {
      src: '/img/brand-moment-1000.jpg?v=2',
      srcSet: '/img/brand-moment-1000.jpg?v=2 1000w, /img/brand-moment-1600.jpg?v=2 1600w',
    },
    wide: {
      srcSet:
        '/img/brand-moment-wide-1200.jpg?v=2 1200w, /img/brand-moment-wide-1800.jpg?v=2 1800w, /img/brand-moment-wide-2400.jpg?v=2 2400w',
    },
  },
  {
    id: '2',
    portrait: {
      src: '/img/brand-moment-2-1000.jpg',
      srcSet: '/img/brand-moment-2-1000.jpg 1000w, /img/brand-moment-2-1600.jpg 1600w',
    },
    wide: {
      srcSet:
        '/img/brand-moment-2-wide-1200.jpg 1200w, /img/brand-moment-2-wide-1800.jpg 1800w, /img/brand-moment-2-wide-2400.jpg 2400w',
    },
  },
  {
    id: '3',
    portrait: {
      src: '/img/brand-moment-3-1000.jpg',
      srcSet: '/img/brand-moment-3-1000.jpg 1000w, /img/brand-moment-3-1600.jpg 1600w',
    },
    wide: {
      srcSet:
        '/img/brand-moment-3-wide-1200.jpg 1200w, /img/brand-moment-3-wide-1800.jpg 1800w, /img/brand-moment-3-wide-2400.jpg 2400w',
    },
  },
]

export default function BrandMoment() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const imgRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const imgs = imgRefs.current.filter(Boolean)
    if (!section || !imgs.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      // -1 leaving the top, +1 entering from the bottom.
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      const shift = Math.max(-1, Math.min(1, progress)) * 6 // percent
      const value = `${shift.toFixed(2)}%`
      for (const img of imgs) img.style.setProperty('--shift', value)
    }

    const onScroll = () => {
      if (!visible || frame) return
      frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) update()
      },
      { rootMargin: '20% 0px' },
    )
    io.observe(section)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const alts = [t.brand.imageAlt, t.brand.imageAlt2, t.brand.imageAlt3]

  return (
    <section className="moment" ref={sectionRef} aria-label={t.brand.caption}>
      <div className="moment__stack">
        {FRAMES.map((item, i) => (
          <div key={item.id} className="moment__frame" data-reveal="mask" style={{ '--reveal-delay': `${i * 80}ms` }}>
            <picture>
              <source media="(min-width: 901px)" srcSet={item.wide.srcSet} sizes="100vw" />
              <img
                ref={(el) => {
                  imgRefs.current[i] = el
                }}
                className="moment__img"
                src={item.portrait.src}
                srcSet={item.portrait.srcSet}
                sizes="100vw"
                alt={alts[i]}
                width="1600"
                height="2223"
                loading={i === 0 ? 'lazy' : 'lazy'}
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>

      <p className="eyebrow moment__caption" data-reveal style={{ '--reveal-delay': '200ms' }}>
        {t.brand.caption}
      </p>
    </section>
  )
}
