import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations'

const STORAGE_KEY = 'quartier.lang'
const CODES = LANGUAGES.map((l) => l.code)

const LanguageContext = createContext(null)

/** Stored choice first, then the browser's preference, then Spanish. */
function resolveInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && CODES.includes(stored)) return stored
  } catch {
    /* private mode / storage disabled — fall through */
  }
  const nav = window.navigator.languages || [window.navigator.language]
  for (const tag of nav) {
    const code = String(tag).slice(0, 2).toLowerCase()
    if (CODES.includes(code)) return code
  }
  return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(resolveInitialLanguage)

  const setLang = useCallback((code) => {
    if (!CODES.includes(code)) return
    setLangState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* storage unavailable — the choice still applies for this session */
    }
  }, [])

  // Keep the document in sync so screen readers and search engines agree.
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang)
    document.documentElement.lang = meta ? meta.htmlLang : lang
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', translations[lang].meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
