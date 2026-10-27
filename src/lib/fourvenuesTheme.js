const FOURVENUES_HOST = /(^|\.)fourvenues\.com$/i
const LOCALES = new Set(['es', 'en', 'fr', 'de', 'ca', 'it', 'pt'])
const EMBED_HASH = /^[A-Za-z0-9/_@.-]{1,200}$/

/**
 * Public Fourvenues pages treat `?theme=dark` as part of the event slug
 * (`2026` + `1` → `20261`) and render the light/broken checkout. Theme
 * belongs only on the embed widget inside /tickets.
 */
export function canonicalizeFourvenuesUrl(url) {
  if (!url) return ''
  try {
    const href = url.replace(/^https?:\/\/fourvenues\.com\//, 'https://www.fourvenues.com/')
    const parsed = new URL(href)
    if (!FOURVENUES_HOST.test(parsed.hostname)) return url
    parsed.searchParams.delete('theme')
    return parsed.toString()
  } catch {
    return url
  }
}

/** Hash the official widget understands: `events/slug` or the short code. */
export function fourvenuesEmbedHash(url) {
  if (!url) return ''
  try {
    const parsed = new URL(url.replace(/^https?:\/\/fourvenues\.com\//, 'https://www.fourvenues.com/'))
    const parts = parsed.pathname.split('/').filter(Boolean)
    if (parts[0] && LOCALES.has(parts[0])) parts.shift()
    const iframeAt = parts.indexOf('iframe')
    if (iframeAt >= 0) return sanitizeEmbedHash(parts.slice(iframeAt + 2).join('/'))
    return sanitizeEmbedHash(parts.slice(1).join('/'))
  } catch {
    return ''
  }
}

export function sanitizeEmbedHash(value) {
  const hash = String(value || '').replace(/^#/, '')
  return EMBED_HASH.test(hash) ? hash : ''
}
