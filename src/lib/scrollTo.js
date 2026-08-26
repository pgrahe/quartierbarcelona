/**
 * Smooth-scrolls to a section, offsetting for the fixed navbar and skipping
 * the animation entirely when the visitor has asked for reduced motion.
 *
 * Deliberately does not touch the URL hash: within a page, moving between
 * sections is not a navigation and should not pile up history entries. The
 * router writes the hash when a link genuinely points at another page's
 * section — see src/router/RouteContext.jsx.
 */
export function scrollToSection(id, { offset = 0, behavior } = {}) {
  const el = document.getElementById(id)
  if (!el) return false

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: reduced ? 'auto' : behavior || 'smooth' })
  return true
}

/**
 * The same, but tolerant of a target that is not in the document yet.
 *
 * The router already waits for React to commit the incoming page before
 * calling this, so the first attempt normally succeeds. The retries cover the
 * case where the section is inside something that mounts a beat later.
 *
 * Deliberately a timer and not requestAnimationFrame: rAF is throttled — and
 * in a background or hidden tab, stopped altogether — so a frame-based retry
 * loop can sit unfinished for as long as the tab stays out of view, and the
 * visitor arrives at the top of the page with no idea why.
 */
export function scrollToSectionWhenReady(id, options = {}, timeoutMs = 800) {
  if (scrollToSection(id, options)) return

  const deadline = Date.now() + timeoutMs
  const retry = () => {
    if (scrollToSection(id, options) || Date.now() > deadline) return
    window.setTimeout(retry, 32)
  }
  window.setTimeout(retry, 32)
}

/** Navbar height as currently computed, so the offset survives breakpoints. */
export function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const n = parseInt(raw, 10)
  return Number.isFinite(n) ? n : 0
}
