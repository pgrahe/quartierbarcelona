/**
 * Anchors this site owns (`#contacto`, `#agenda`). Fourvenues writes hashes
 * like `#calendar@2026-10` and `#events/…` onto the parent page; those must
 * never be treated as in-page targets or carried across language switches.
 */
export function isSiteHash(hash) {
  const value = String(hash || '').replace(/^#/, '')
  return /^[a-z][a-z0-9-]{0,40}$/i.test(value)
}
