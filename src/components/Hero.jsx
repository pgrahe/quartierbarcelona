import { useEffect, useRef, useState } from 'react'
import { SLOGAN, SLOGAN_LINES } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './Hero.css'

/**
 * Full-viewport cinematic hero.
 *
 * The poster frame is the video's own frame 0, so the swap to playing video is
 * invisible. On mobile the bar above the fold is deliberately empty — the hero
 * carries its own logo (top-left) and CTA (top-right) and nothing else.
 */
export default function Hero() {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Reduced motion: hold the poster frame rather than looping footage.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const onPlaying = () => setPlaying(true)
    v.addEventListener('playing', onPlaying)

    // React assigns `muted` as a property after the element exists, which is
    // late enough that some engines have already made their autoplay
    // decision. Setting it imperatively before play() is what actually makes
    // iOS Safari and Chrome's autoplay policy let this through.
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true

    const attempt = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    const onVisible = () => {
      // Chrome defers autoplay in background tabs, so a site opened into one
      // would otherwise sit on the poster forever.
      if (!document.hidden && v.paused) attempt()
    }

    attempt()
    // If the first attempt lost the race with metadata, try again when the
    // element is genuinely ready; if the policy blocked it, the first real
    // interaction unblocks it. All listeners clean up after themselves.
    v.addEventListener('canplay', attempt, { once: true })
    document.addEventListener('visibilitychange', onVisible)
    document.addEventListener('pointerdown', attempt, { once: true, passive: true })

    return () => {
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('canplay', attempt)
      document.removeEventListener('visibilitychange', onVisible)
      document.removeEventListener('pointerdown', attempt)
    }
  }, [])

  return (
    <section id="inicio" className="hero" aria-label="Quartier Barcelona">
      <div className="hero__media" data-playing={playing}>
        <img
          className="hero__poster"
          src="/video/hero-poster.jpg"
          alt=""
          width="1920"
          height="1080"
        />
        <video
          ref={videoRef}
          className="hero__video"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={t.hero.videoLabel}
          tabIndex={-1}
        >
          {/* Phones get the lighter cut; the 1080 file is only fetched on
              viewports wide enough to show the difference. */}
          <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/video/hero-1080.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Two very soft blacks: a flat wash for overall legibility and a
          bottom-weighted one under the slogan. Neither crushes the footage. */}
      <div className="hero__scrim" aria-hidden="true" />

      {/* Mobile-only chrome: logo left, CTA right. Nothing else above the fold. */}
      <div className="hero__bar">
        <a href="#inicio" className="hero__logo" aria-label="Quartier Barcelona">
          <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
        </a>
        <TicketsCta className="hero__cta" />
      </div>

      <div className="hero__body">
        {/* aria-label carries the slogan as one phrase; the spans only control
            where it breaks. */}
        <h1 className="hero__slogan" aria-label={SLOGAN}>
          {SLOGAN_LINES.map((line) => (
            <span key={line} aria-hidden="true">
              {line}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
