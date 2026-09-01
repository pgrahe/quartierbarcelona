import { useEffect, useState } from 'react'

/**
 * True once the hero has scrolled past the given threshold.
 *
 * On mobile this reveals the navbar chrome (logo + hamburger) after the hero;
 * the bar itself stays transparent and contrasts via mix-blend-mode. Uses an
 * IntersectionObserver on a sentinel rather than a scroll listener.
 *
 * `resetKey` exists because the hero is not on every page: pass the current
 * route and the sentinel is torn down when we leave the home page and built
 * again when we come back, instead of the answer going stale on a hero that
 * no longer exists.
 */
export function useHeroPassed(heroId = 'inicio', ratio = 0.72, resetKey) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(heroId)
    // No hero on this page — nothing has been scrolled past.
    if (!hero) {
      setPassed(false)
      return
    }

    // A zero-height sentinel parked `ratio` of the way down the hero.
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    Object.assign(sentinel.style, {
      position: 'absolute',
      top: `${ratio * 100}%`,
      left: '0',
      width: '1px',
      height: '1px',
      pointerEvents: 'none',
    })
    hero.appendChild(sentinel)

    const io = new IntersectionObserver(
      ([entry]) => setPassed(entry.boundingClientRect.top < 0 && !entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(sentinel)

    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [heroId, ratio, resetKey])

  return passed
}
