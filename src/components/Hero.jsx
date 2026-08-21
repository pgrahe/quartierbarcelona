import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SLOGAN, SLOGAN_ARTICLE, SLOGAN_LEAD, SLOGAN_ROTATIONS } from '../i18n/translations'
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
 * The slogan cycles MORE THAN A NIGHT. → A MOMENT. → A CLUB.
 * "MORE THAN" and "A" stay fixed; only NIGHT / MOMENT / CLUB rotate (in italic).
 *
 * The rotation is Salient's `nectar-rotating-words-title` reveal, as used on
 * suttonbarcelona.com, read off the live site rather than approximated:
 *
 *   .dynamic-words > span        { overflow:hidden; translate3d(-100%,0,0) }
 *   .dynamic-words > span span   { translate3d(100%,0,0) }
 *   .active, .active span span   { translate3d(0,0,0); transition-delay:.4s }
 *   transition: transform .8s cubic-bezier(.2,1,.3,1)
 *   .dynamic-words               { transition: width .8s cubic-bezier(.2,1,.3,1) }
 *
 * The two layers move in opposite directions by exactly their own width, so
 * the word is *uncovered* left-to-right instead of sliding across — and the
 * container's width eases between words of different lengths. Both are what
 * make the effect read the way it does; a plain translate loses it.
 *
 * Timings are Sutton's shape, slowed down: .8s→1.2s, .4s→.5s delay, and a
 * 2.5s→4.6s cycle so each phrase is allowed to land.
 */
const ROTATION_MS = 4600
const ENTER_DELAY_MS = 550

/** Mobile gets the vertical cut; desktop the landscape 1080. Chosen in JS
 *  because `<source media>` is unreliable.
 *
 *  Both files are trimmed to start 1.0s into the source: it opens on a
 *  near-static wide shot of the street, so the first second of playback looked
 *  frozen even once it was running. The trim starts on the interior cut, which
 *  moves immediately.
 *
 *  The mobile file stays at the source's native 1080x1920. An earlier pass cut
 *  it to 900x1600/crf33 to speed up loading, which was a mistake: a phone
 *  renders this hero at ~1170px (390pt x3), so that was upscaled AND heavily
 *  quantised — mushy hair, no grain, plastic skin. It is encoded at crf27 with
 *  aq-mode=3 instead, which keeps detail in the dark areas the scrim sits over.
 *
 *  Load time is bought back from `heroSrc()` being resolved on first render
 *  (see below), not from starving the encode.
 *
 *  `?v=5` busts caches still holding the old encodes. */
const HERO_DESKTOP = '/video/hero-1080.mp4?v=5'
const HERO_MOBILE = '/video/hero-vertical.mp4?v=5'
const POSTER_DESKTOP = '/video/hero-poster.jpg?v=5'
const POSTER_MOBILE = '/video/hero-poster-vertical.jpg?v=5'

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
  // Resolved lazily on the FIRST render, not in an effect afterwards. Starting
  // from the desktop value meant a phone put <video src="hero-1080.mp4"> into
  // the DOM with preload="auto", began pulling the 7.6MB landscape file, and
  // only then swapped to the vertical one — downloading two heavy videos and
  // delaying the frame it actually needed. This was the single largest cause
  // of the hero appearing frozen on mobile.
  const [src, setSrc] = useState(heroSrc)
  const [poster, setPoster] = useState(heroPoster)
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const clubIndex = SLOGAN_ROTATIONS.findIndex((s) => s.id === 'club')

  // Sutton sets the rotator's width in JS to the active word's own width and
  // lets CSS ease between values. Measuring is the only way to get that: the
  // words are absolutely positioned, so the box has no natural width.
  const rotatorRef = useRef(null)
  const wordRefs = useRef([])
  const [widths, setWidths] = useState([])

  const measure = useCallback(() => {
    const next = wordRefs.current.map((el) => (el ? el.getBoundingClientRect().width : 0))
    setWidths((prev) =>
      prev.length === next.length && prev.every((w, i) => Math.abs(w - next[i]) < 0.5) ? prev : next,
    )
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (rotatorRef.current) ro.observe(rotatorRef.current)
    window.addEventListener('resize', measure)
    // Re-measure once webfonts settle — an Athena Bold drop-in changes widths.
    document.fonts?.ready?.then(measure).catch(() => {})
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // Only needed for a viewport that crosses the breakpoint after load
  // (rotation, desktop resize) — the initial choice is already correct.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => {
      setSrc(heroSrc())
      setPoster(heroPoster())
    }
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
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
        {/* aria-label states the slogan once; the moving parts are hidden from
            assistive tech so it is not read as three shuffling fragments. */}
        <h1 className="hero__slogan" data-entered={entered} aria-label={SLOGAN}>
          <span className="hero__slogan-lead" aria-hidden="true">
            <span>{SLOGAN_LEAD}</span>
          </span>

          <span className="hero__slogan-tail" aria-hidden="true">
            <span className="hero__slogan-article">
              <span>{SLOGAN_ARTICLE}</span>
            </span>

            <span
              className="hero__slogan-rotator"
              ref={rotatorRef}
              style={widths[active] ? { width: `${widths[active]}px` } : undefined}
            >
              {/* Baseline strut. Every rotating word is absolutely positioned,
                  which leaves this box with no baseline of its own — flexbox
                  then synthesises one from its bottom edge and the fixed "A"
                  ends up sitting ~9px below the word. A zero-width character
                  in normal flow gives the box a real text baseline, so
                  `align-items: baseline` lines the two up properly. */}
              <span className="hero__slogan-strut" aria-hidden="true">
                {'​'}
              </span>
              {SLOGAN_ROTATIONS.map((slogan, i) => (
                <span
                  key={slogan.id}
                  className="hero__slogan-wrap"
                  data-active={i === active && entered}
                >
                  <span
                    className="hero__slogan-word"
                    ref={(el) => {
                      wordRefs.current[i] = el
                    }}
                  >
                    {slogan.word}
                  </span>
                </span>
              ))}
            </span>
          </span>
        </h1>
      </div>
    </section>
  )
}
