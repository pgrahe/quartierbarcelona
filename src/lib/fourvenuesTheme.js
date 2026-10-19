const FOURVENUES_HOST = /(^|\.)fourvenues\.com$/i

/**
 * Fourvenues iframe checkout defaults to light. /tickets and flyer links
 * force dark via `?theme=dark`.
 */
export function withFourvenuesDarkTheme(url) {
  if (!url) return ''
  try {
    const href = url.replace(/^https?:\/\/fourvenues\.com\//, 'https://www.fourvenues.com/')
    const parsed = new URL(href)
    if (!FOURVENUES_HOST.test(parsed.hostname)) return url

    const iframeMatch = parsed.pathname.match(/\/iframe\/(.+)$/)
    if (iframeMatch) {
      parsed.hostname = 'www.fourvenues.com'
      parsed.pathname = `/iframe/${iframeMatch[1]}`
    }

    parsed.searchParams.set('theme', 'dark')
    return parsed.toString()
  } catch {
    return url
  }
}
