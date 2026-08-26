/* -------------------------------------------------------------------------
 * ROUTES — the single source of truth for every URL on the site.
 *
 * The site is a set of real, separately indexable pages:
 *
 *   /                     home            (also /en/  /fr/  /de/)
 *   /sobre-nosotros       about           (/en/about, /fr/a-propos, /de/ueber-uns)
 *   /vip-experience       vip             (same slug in every language — brand)
 *   /private-events       events          (same slug in every language — brand)
 *
 * Slugs are per language wherever the word is genuinely translated, and
 * identical wherever the label is brand English that already appears
 * untranslated on the site ("VIP EXPERIENCE", "PRIVATE EVENTS"). Because
 * every path is derived from this one table, hreflang, the sitemap, the
 * language switcher and the navigation can never drift apart.
 * ---------------------------------------------------------------------- */
import { DEFAULT_LANGUAGE } from '../i18n/translations'
import { LOCALES, localeFor } from '../config/site'

export const ROUTES = [
  { id: 'home', slugs: { es: '', en: '', fr: '', de: '' } },
  {
    id: 'about',
    slugs: { es: 'sobre-nosotros', en: 'about', fr: 'a-propos', de: 'ueber-uns' },
  },
  {
    id: 'vip',
    slugs: { es: 'vip-experience', en: 'vip-experience', fr: 'vip-experience', de: 'vip-experience' },
  },
  {
    id: 'events',
    slugs: { es: 'private-events', en: 'private-events', fr: 'private-events', de: 'private-events' },
  },
]

export const HOME_ROUTE = 'home'

const CODES = LOCALES.map((l) => l.code)

export function routeById(id) {
  return ROUTES.find((r) => r.id === id) || ROUTES[0]
}

/**
 * The URL for a route in a language.
 *
 *   pathFor('home', 'es')   → '/'
 *   pathFor('home', 'en')   → '/en/'
 *   pathFor('about', 'es')  → '/sobre-nosotros'
 *   pathFor('about', 'de')  → '/de/ueber-uns'
 *
 * Home keeps its trailing slash (it is a directory index and the canonical
 * form Google already has); the rest are written without one, which is the
 * form the host serves and the form people type.
 */
export function pathFor(routeId, lang = DEFAULT_LANGUAGE) {
  const route = routeById(routeId)
  const locale = localeFor(lang)
  const slug = route.slugs[lang] ?? route.slugs[DEFAULT_LANGUAGE]
  if (!slug) return locale.path
  // locale.path is '/' or '/en/' — both already end in a slash.
  return `${locale.path}${slug}`
}

/**
 * The inverse: which language and which page a pathname addresses.
 *
 * Anything unrecognised resolves to the home page of the language it could
 * still be read from, so a stray URL never renders an empty document.
 */
export function routeFromPath(pathname = '/') {
  const segments = String(pathname).split('/').filter(Boolean)

  let lang = DEFAULT_LANGUAGE
  let rest = segments
  if (segments.length && CODES.includes(segments[0])) {
    lang = segments[0]
    rest = segments.slice(1)
  }

  if (!rest.length) return { lang, routeId: HOME_ROUTE, known: true }

  const slug = rest[0]
  const match = ROUTES.find((r) => r.slugs[lang] === slug)
  if (match) return { lang, routeId: match.id, known: true }

  // A slug from another language (someone hand-edited the URL, or a link was
  // shared before a translation existed) still resolves to the right page.
  const crossLang = ROUTES.find((r) => Object.values(r.slugs).includes(slug))
  if (crossLang) return { lang, routeId: crossLang.id, known: true }

  return { lang, routeId: HOME_ROUTE, known: false }
}

/** Every prerenderable URL: each route in each language. */
export function allPaths() {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      locale,
      routeId: route.id,
      path: pathFor(route.id, locale.code),
    })),
  )
}
