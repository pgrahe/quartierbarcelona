import { useEffect } from 'react'

/**
 * Reveals every `[data-reveal]` inside `rootRef` once as it enters the
 * viewport. One observer for the whole subtree instead of one per element.
 *
 * A MutationObserver picks up nodes that mount later (lazy sections, Suspense)
 * — querying once on the first paint would leave those elements at opacity 0
 * forever.
 */
/* threshold 0 + a negative bottom margin rather than a ratio: an element
   taller than the viewport can never reach a meaningful ratio, so the margin
   is what actually controls when the reveal fires. */
/* `active` must flip whenever the root node comes and goes. The ref object is
   stable, so without it the effect would never re-run: a page rendered
   without the root (the tickets page has no <main>) leaves the observer
   unarmed, and every page visited afterwards stays at opacity 0. */
export function useReveal(
  rootRef,
  { threshold = 0, rootMargin = '0px 0px -12% 0px', active = true } = {},
) {
  useEffect(() => {
    if (!active) return
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      const revealAll = () => {
        root.querySelectorAll('[data-reveal]').forEach((el) => {
          el.setAttribute('data-revealed', 'true')
        })
      }
      revealAll()
      const mo = new MutationObserver(revealAll)
      mo.observe(root, { childList: true, subtree: true })
      return () => mo.disconnect()
    }

    const seen = new WeakSet()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', 'true')
          io.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    const watch = () => {
      root.querySelectorAll('[data-reveal]').forEach((el) => {
        if (seen.has(el) || el.getAttribute('data-revealed') === 'true') return
        seen.add(el)
        io.observe(el)
      })
    }

    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [rootRef, threshold, rootMargin, active])
}
