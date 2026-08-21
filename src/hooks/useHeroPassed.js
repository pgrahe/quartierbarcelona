import { useEffect, useState } from 'react'

/**
 * True once the hero has scrolled past the given threshold.
 *
 * Drives two things: the navbar going from transparent to solid, and the
 * mobile hamburger appearing only after the hero. Uses an IntersectionObserver
 * on a sentinel rather than a scroll listener, so it costs nothing per frame.
 */
export function useHeroPassed(heroId = 'inicio', ratio = 0.72) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const hero = document.getElementById(heroId)
    if (!hero) return

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
  }, [heroId, ratio])

  return passed
}
