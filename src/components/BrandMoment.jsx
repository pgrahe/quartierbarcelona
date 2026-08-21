import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './BrandMoment.css'

/**
 * One photograph, full bleed, at campaign scale — the moment where the page
 * stops talking. A single frame rather than a grid: the photograph is strong
 * enough to carry the section on its own.
 *
 * The parallax is a scroll-linked custom property, capped tight so it reads as
 * depth rather than as movement. Skipped entirely under reduced motion.
 */
export default function BrandMoment() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      // -1 leaving the top, +1 entering from the bottom.
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
      const shift = Math.max(-1, Math.min(1, progress)) * 6 // percent
      img.style.setProperty('--shift', `${shift.toFixed(2)}%`)
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

  return (
    <section className="moment" ref={sectionRef} aria-label={t.brand.caption}>
      <div className="moment__frame" data-reveal="mask">
        {/* Two crops of the same frame rather than one crop stretched across
            both: full-bleed on a wide screen would cut a portrait photograph
            down to a strip, so wide viewports get a 2:1 crop composed around
            the subject and narrow ones keep the original portrait. */}
        <picture>
          <source
            media="(min-width: 901px)"
            srcSet="/img/brand-moment-wide-1200.jpg 1200w, /img/brand-moment-wide-1800.jpg 1800w, /img/brand-moment-wide-2400.jpg 2400w"
            sizes="100vw"
          />
          <img
            ref={imgRef}
            className="moment__img"
            src="/img/brand-moment-1000.jpg"
            srcSet="/img/brand-moment-1000.jpg 1000w, /img/brand-moment-1600.jpg 1600w"
            sizes="100vw"
            alt={t.brand.imageAlt}
            width="1600"
            height="2223"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <p className="eyebrow moment__caption" data-reveal style={{ '--reveal-delay': '200ms' }}>
        {t.brand.caption}
      </p>
    </section>
  )
}
