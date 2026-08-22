import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations'
import { LOCALES, localeFor } from '../config/site'
import { seoFor } from '../seo/meta'

const STORAGE_KEY = 'quartier.lang'
const CODES = LANGUAGES.map((l) => l.code)

const LanguageContext = createContext(null)

/**
 * The URL is the source of truth for language.
 *
 * Every language has its own indexable address — `/` for Spanish, `/en/`,
 * `/fr/`, `/de/` for the rest — and each of those is prerendered at build
 * time as real HTML. That is what makes the hreflang tags honest: without
 * distinct URLs, they would all point at the same document and Google would
 * (correctly) ignore them.
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

  const setLang = useCallback((code) => {
    if (!CODES.includes(code)) return
    setLangState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
    // Move the address bar to the language's own URL without a reload, so
    // what the visitor can copy and share matches what Google indexes.
    const { path } = localeFor(code)
    if (window.location.pathname !== path) {
      window.history.pushState({ lang: code }, '', path + window.location.hash)
    }
  }, [])

  // Back/forward should change language, since language is part of the URL.
  useEffect(() => {
    const onPop = () => {
      const fromPath = languageFromPath(window.location.pathname)
      if (fromPath) setLangState(fromPath)
      else setLangState(DEFAULT_LANGUAGE)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  /* Keep the document head in sync with the active language. The prerendered
     HTML already ships the correct tags for the URL that was requested; this
     only matters once the visitor switches language client-side. */
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang)
    const locale = localeFor(lang)
    const seo = seoFor(lang)

    document.documentElement.lang = meta ? meta.htmlLang : lang
    document.title = seo.title

    const set = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', seo.description)
    set('meta[property="og:title"]', 'content', seo.title)
    set('meta[property="og:description"]', 'content', seo.description)
    set('meta[property="og:locale"]', 'content', locale.ogLocale)
    set('meta[name="twitter:title"]', 'content', seo.title)
    set('meta[name="twitter:description"]', 'content', seo.description)
    set('link[rel="canonical"]', 'href', `${window.location.origin}${locale.path}`)
    set('meta[property="og:url"]', 'content', `${window.location.origin}${locale.path}`)
  }, [lang])

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
