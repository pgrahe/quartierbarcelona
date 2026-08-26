import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { SLOGAN, SLOGAN_ARTICLE, SLOGAN_LEAD, SLOGAN_ROTATIONS } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink } from '../router/RouteContext'
import TicketsCta from './TicketsCta'
import './Hero.css'

/* useLayoutEffect has no meaning on the server and React warns about it during
   the prerender pass. The measurement it guards is client-only anyway. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Full-viewport cinematic hero.
 *
 * The poster frame is the video's own frame 0, so the swap to playing video is
 * invisible. On mobile the bar above the fold is deliberately empty — the hero
 * carries its own logo (top-left) and CTA (top-right) and nothing else.
 *
 * Mobile intro: large centred wordmark holds 2s, fades out in place, then the
 * rotating slogan enters while the small bar logo fades in top-left — no fly
 * / diagonal move, only opacity.
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
 * Timings are Sutton's shape, slowed down: .8s→1.2s, .4s→.5s delay, and a
 * 2.5s→4.6s cycle so each phrase is allowed to land.
 */
const ROTATION_MS = 4600
const ENTER_DELAY_MS = 550
const LOGO_HOLD_MS = 2000
const LOGO_FADE_MS = 900

/** Mobile gets the vertical cut; desktop the landscape 1080. Chosen in JS
 *  because `<source media>` is unreliable.
 *
 *  Both files are trimmed to start 2.3s into the source. The clip opens on a
 *  near-static wide shot of the street, so the first seconds read as frozen
 *  even once playing. 2.3s is a scene cut into the dancefloor — deliberately
 *  not 2.0s, where the frame is blown out (luminance ~230/255) and the hero
 *  would flash near-white a moment after load.
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
 *  `?v=6` busts caches still holding the old encodes. */
const HERO_DESKTOP = '/video/hero-1080.mp4?v=6'
const HERO_MOBILE = '/video/hero-vertical.mp4?v=6'
const POSTER_DESKTOP = '/video/hero-poster.jpg?v=6'
const POSTER_MOBILE = '/video/hero-poster-vertical.jpg?v=6'

function isMobileHero() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function heroSrc() {
  return isMobileHero() ? HERO_MOBILE : HERO_DESKTOP
}

function heroPoster() {
  return isMobileHero() ? POSTER_MOBILE : POSTER_DESKTOP
}

function initialIntro() {
  if (typeof window === 'undefined') return 'done'
  if (prefersReducedMotion() || !isMobileHero()) return 'done'
  return 'hold'
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
  // Mobile-only: hold (centre) → fade (out in place) → done (slogan + bar logo).
  const [intro, setIntro] = useState(initialIntro)
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

  useIsomorphicLayoutEffect(() => {
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
      // Leaving mobile mid-intro: snap to the settled chrome.
      if (!mq.matches && intro !== 'done') {
        setIntro('done')
        setEntered(true)
      }
    }
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [intro])

  // hold → fade → done
  useEffect(() => {
    if (intro === 'hold') {
      const hold = window.setTimeout(() => setIntro('fade'), LOGO_HOLD_MS)
      return () => window.clearTimeout(hold)
    }
    if (intro === 'fade') {
      const fade = window.setTimeout(() => setIntro('done'), LOGO_FADE_MS)
      return () => window.clearTimeout(fade)
    }
  }, [intro])

  // Slogan entrance + rotation — only after the intro has settled (desktop
  // starts as 'done'; mobile waits for the centre fade).
  useEffect(() => {
    if (intro !== 'done') return

    const reduced = prefersReducedMotion()
    if (reduced) {
      setActive(clubIndex >= 0 ? clubIndex : 0)
      setEntered(true)
      return
    }

    // Mobile already waited through the brand beat; desktop still gets the rise.
    const enterDelay = isMobileHero() ? 40 : ENTER_DELAY_MS
    const enter = window.setTimeout(() => setEntered(true), enterDelay)
    const tick = window.setInterval(() => {
      setActive((i) => (i + 1) % SLOGAN_ROTATIONS.length)
    }, ROTATION_MS)

    return () => {
      window.clearTimeout(enter)
      window.clearInterval(tick)
    }
  }, [intro, clubIndex])

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

  const showCentreBrand = intro === 'hold' || intro === 'fade'

  return (
    <section id="inicio" className="hero" data-intro={intro} aria-label="Quartier Barcelona">
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
        <RouteLink to="home" className="hero__logo" aria-label="Quartier Barcelona">
          <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
        </RouteLink>
        <TicketsCta className="hero__cta" />
      </div>

      <div className="hero__body">
        {/* Large centred mark — fades out in place; the bar logo fades in separately. */}
        {showCentreBrand && (
          <div className="hero__brand" aria-hidden="true">
            <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
          </div>
        )}

        {/* The page's single H1. Visually it is only the slogan, but a bare
            "MORE THAN A CLUB" tells a search engine nothing about who this
            is. The brand name leads the heading in the document and in the
            accessible name; the slogan keeps the visual stage.

            This is not hidden keyword text: it is the business's own name,
            it matches the <title>, and it is what a screen reader announces.
            The moving fragments below are aria-hidden so the heading is not
            read out as three shuffling pieces. */}
        <h1 className="hero__slogan" data-entered={entered} data-ready={intro === 'done'}>
          <span className="visually-hidden">Quartier Barcelona — {SLOGAN}</span>

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
