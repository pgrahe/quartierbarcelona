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
 * The slogan cycles MORE THAN A NIGHT. → MOMENT. → CLUB. with Salient’s
 * Sutton-style masked vertical wipe (overflow clip + translateY), not a fade.
 */

/* Sutton uses data-rotation="2500"; we hold longer so each line can land. */
const ROTATION_MS = 4800
const ENTER_DELAY_MS = 400

/** Mobile gets the vertical cut; desktop the landscape 1080. Chosen in JS
 *  because `<source media>` is unreliable. `?v=3` busts older encodes. */
const HERO_DESKTOP = '/video/hero-1080.mp4?v=3'
const HERO_MOBILE = '/video/hero-vertical.mp4?v=3'
const POSTER_DESKTOP = '/video/hero-poster.jpg?v=3'
const POSTER_MOBILE = '/video/hero-poster-vertical.jpg?v=3'

function isMobileHero() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
}

function heroSrc() {
  return isMobileHero() ? HERO_MOBILE : HERO_DESKTOP
}

function heroPoster() {
  return isMobileHero() ? POSTER_MOBILE : POSTER_DESKTOP
}

export default function Hero() {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [src, setSrc] = useState(HERO_DESKTOP)
  const [poster, setPoster] = useState(POSTER_DESKTOP)
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const clubIndex = SLOGAN_ROTATIONS.findIndex((s) => s.id === 'club')

  useEffect(() => {
    setSrc(heroSrc())
    setPoster(heroPoster())
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setActive(clubIndex >= 0 ? clubIndex : 0)
      setEntered(true)
      return
    }

    const enter = window.setTimeout(() => setEntered(true), ENTER_DELAY_MS)
    const tick = window.setInterval(() => {
      setActive((i) => (i + 1) % SLOGAN_ROTATIONS.length)
    }, ROTATION_MS)

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
          src={poster}
          alt=""
          width={poster.includes('vertical') ? 1080 : 1920}
          height={poster.includes('vertical') ? 1920 : 1080}
        />
        <video
          key={src}
          ref={videoRef}
          className="hero__video"
          src={src}
          poster={poster}
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
              data-active={i === active && entered}
              aria-hidden={i === active ? undefined : true}
            >
              <span className="hero__slogan-mask">
                <span className="hero__slogan-inner">
                  {slogan.lines.map((line) => (
                    <span key={line} className="hero__slogan-line">
                      {line}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
