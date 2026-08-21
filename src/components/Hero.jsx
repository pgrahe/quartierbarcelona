import { useEffect, useRef, useState } from 'react'
import { SLOGAN, SLOGAN_ROTATIONS } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './Hero.css'

/**
 * Full-viewport cinematic hero.
 *
 * The poster frame is the video's own frame 0, so the swap to playing video is
 * invisible. On mobile the bar above the fold is deliberately empty — the hero
 * carries its own logo (top-left) and CTA (top-right) and nothing else.
 *
 * The slogan cycles MORE THAN A NIGHT. → MOMENT. → CLUB. in a soft crossfade,
 * Sutton-style. Reduced motion holds on the brand line only.
 */

const HOLD_MS = 3200
const FADE_MS = 700

/** Phones only. `<source media>` is unreliable across browsers — many ignore
 *  it and always take the first file, which made desktop play the soft 720 cut.
 *  `?v=2` busts the previous over-compressed encodes cached on CDN/browsers. */
function heroSrc() {
  if (typeof window === 'undefined') return '/video/hero-1080.mp4?v=2'
  return window.matchMedia('(max-width: 600px)').matches
    ? '/video/hero-720.mp4?v=2'
    : '/video/hero-1080.mp4?v=2'
}

export default function Hero() {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [src, setSrc] = useState('/video/hero-1080.mp4?v=2')
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const clubIndex = SLOGAN_ROTATIONS.findIndex((s) => s.id === 'club')

  useEffect(() => {
    setSrc(heroSrc())
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setActive(clubIndex >= 0 ? clubIndex : 0)
      setEntered(true)
      return
    }

    const enter = window.setTimeout(() => setEntered(true), 280)
    const tick = window.setInterval(() => {
      setActive((i) => (i + 1) % SLOGAN_ROTATIONS.length)
    }, HOLD_MS + FADE_MS)

    return () => {
      window.clearTimeout(enter)
      window.clearInterval(tick)
    }
  }, [clubIndex])

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
  }, [src])

  return (
    <section id="inicio" className="hero" aria-label="Quartier Barcelona">
      <div className="hero__media" data-playing={playing}>
        <img
          className="hero__poster"
          src="/video/hero-poster.jpg?v=2"
          alt=""
          width="1920"
          height="1080"
        />
        <video
          key={src}
          ref={videoRef}
          className="hero__video"
          src={src}
          poster="/video/hero-poster.jpg?v=2"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={t.hero.videoLabel}
          tabIndex={-1}
        />
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
        <h1 className="hero__slogan" data-entered={entered} aria-label={SLOGAN}>
          {SLOGAN_ROTATIONS.map((slogan, i) => (
            <span
              key={slogan.id}
              className="hero__slogan-frame"
              data-active={i === active}
              aria-hidden={i === active ? undefined : true}
            >
              {slogan.lines.map((line) => (
                <span key={line} className="hero__slogan-line">
                  {line}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
