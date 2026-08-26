import { useEffect } from 'react'

import { LOCALES, absoluteUrl, localeFor } from '../config/site'
import { LANGUAGES } from '../i18n/translations'
import { pathFor } from '../router/routes'
import { seoFor } from './meta'

/* -------------------------------------------------------------------------
 * Keeps <head> honest after a client-side navigation.
 *
 * The prerendered HTML already ships the correct title, description,
 * canonical, hreflang set and social tags for the URL that was requested —
 * that is what crawlers and link previews read, and none of this runs for
 * them. This exists for the visitor who then moves between pages or switches
 * language without a reload: the address bar changes, so the head has to
 * change with it, or "share this page" would send the wrong card.
 * ---------------------------------------------------------------------- */
export function useDocumentHead(lang, routeId) {
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang)
    const locale = localeFor(lang)
    const seo = seoFor(lang, routeId)
    const url = absoluteUrl(pathFor(routeId, lang))

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
    set('meta[property="og:image:alt"]', 'content', seo.ogImageAlt)
    set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', seo.title)
    set('meta[name="twitter:description"]', 'content', seo.description)
    set('meta[name="twitter:image:alt"]', 'content', seo.ogImageAlt)
    set('link[rel="canonical"]', 'href', url)

    /* The alternates have to move too: they point at THIS page in every other
       language, not at the page that happened to be prerendered. */
    LOCALES.forEach((l) => {
      set(
        `link[rel="alternate"][hreflang="${l.hreflang}"]`,
        'href',
        absoluteUrl(pathFor(routeId, l.code)),
      )
    })
    const xDefault = LOCALES.find((l) => l.isDefault)
    if (xDefault) {
      set(
        'link[rel="alternate"][hreflang="x-default"]',
        'href',
        absoluteUrl(pathFor(routeId, xDefault.code)),
      )
    }
  }, [lang, routeId])
}
