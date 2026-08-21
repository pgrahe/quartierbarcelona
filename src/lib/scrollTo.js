/**
 * Smooth-scrolls to a section, offsetting for the fixed navbar and skipping
 * the animation entirely when the visitor has asked for reduced motion.
 *
 * Deliberately does not touch the URL hash: no routing, no reload, no history
 * entries piling up as the visitor moves through a single page.
 */
export function scrollToSection(id, { offset = 0 } = {}) {
  const el = document.getElementById(id)
  if (!el) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

/** Navbar height as currently computed, so the offset survives breakpoints. */
export function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const n = parseInt(raw, 10)
  return Number.isFinite(n) ? n : 0
}
