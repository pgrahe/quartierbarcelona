import { useEffect } from 'react'

/**
 * Reveals every `[data-reveal]` inside `rootRef` once as it enters the
 * viewport. One observer for the whole subtree instead of one per element,
 * and it disconnects as soon as the last element has fired.
 */
/* threshold 0 + a negative bottom margin rather than a ratio: an element
   taller than the viewport can never reach a meaningful ratio, so the margin
   is what actually controls when the reveal fires. */
export function useReveal(rootRef, { threshold = 0, rootMargin = '0px 0px -12% 0px' } = {}) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll('[data-reveal]'))
    if (!targets.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-revealed', 'true'))
      return
    }

    let remaining = targets.length
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', 'true')
          io.unobserve(entry.target)
          if (--remaining === 0) io.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef, threshold, rootMargin])
}
