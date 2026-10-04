import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations'
import { LOCALES } from '../config/site'
import { NAV_EVENT, pushPath } from '../router/RouteContext'
import { pathFor, routeFromPath } from '../router/routes'

const STORAGE_KEY = 'quartier.lang'
const CODES = LANGUAGES.map((l) => l.code)

const LanguageContext = createContext(null)

/**
 * The URL is the source of truth for language.
 *
 * Every language has its own indexable address — `/` for Spanish, `/en/`,
 * `/fr/`, `/de/` for the rest, and the same again for every sub-page — and
 * each of those is prerendered at build time as real HTML. That is what makes
 * the hreflang tags honest: without distinct URLs, they would all point at the
 * same document and Google would (correctly) ignore them.
 *
 * The stored preference is written when the visitor switches, but is never
 * read to decide the initial language — see resolveInitialLanguage below.
 */
export function languageFromPath(pathname = '/') {
  const seg = pathname.split('/').filter(Boolean)[0]
  return seg && CODES.includes(seg) ? seg : null
}

function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  /* The URL decides, and nothing else.
   *
   * Falling back to localStorage or navigator.language here looks friendly but
   * breaks the canonical: a visitor with French stored, or a German browser,
   * would be served that language at "/" — the URL Google indexes as the
   * Spanish page. Content and canonical must agree, so "/" is always Spanish
   * and every other language has its own address. The stored preference is
   * still written on switch, for future use. */
  return languageFromPath(window.location.pathname) || DEFAULT_LANGUAGE
}

export function LanguageProvider({ children, initialLanguage }) {
  const [lang, setLangState] = useState(initialLanguage || resolveInitialLanguage)

  /**
   * Switching language keeps you on the page you are reading.
   *
   * The current route is read back out of the address bar rather than taken
   * from the router, so the two providers stay independent: this one never
   * needs to sit inside the router, and the router never needs to know about
   * languages beyond what the path already says.
   */
  const setLang = useCallback((code) => {
    if (!CODES.includes(code)) return
    setLangState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }

    const { routeId } = routeFromPath(window.location.pathname)
    const next = pathFor(routeId, code)
    if (window.location.pathname !== next) {
      pushPath(next + window.location.hash)
    }
  }, [])

  /* Back/forward and in-page navigation both change the language, because
     language is part of the URL. */
  useEffect(() => {
    const sync = () => setLangState(languageFromPath(window.location.pathname) || DEFAULT_LANGUAGE)
    window.addEventListener('popstate', sync)
    window.addEventListener(NAV_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(NAV_EVENT, sync)
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang], locales: LOCALES }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
