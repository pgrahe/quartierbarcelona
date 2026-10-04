import { renderToString } from 'react-dom/server'
import { LanguageProvider } from './i18n/LanguageContext'
import { RouteProvider } from './router/RouteContext'
import { TicketsProvider } from './tickets/TicketsContext'
import App from './App'

/* Re-exported so scripts/prerender.mjs has a single SSR bundle to import and
   the build cannot drift from the app's own config. */
export { LOCALES, SITE_URL, OG_IMAGE, GSC_VERIFICATION, absoluteUrl } from './config/site'
export { ROUTES, allPaths, pathFor } from './router/routes'
export { PAGE_HEROES, HERO_POSTERS } from './config/pageHeroes'
export { seoFor } from './seo/meta'
export { buildJsonLd } from './seo/jsonld'

/**
 * Server entry used only at build time by scripts/prerender.mjs.
 *
 * Every page is rendered to real HTML in every language, so the copy,
 * headings, contact details and links exist in the document before any
 * JavaScript runs. The browser still boots the full React app on top
 * (createRoot replaces the markup), so nothing about the live experience
 * changes — this exists purely so crawlers, link previews and no-JS visitors
 * get the content.
 *
 * The path is passed straight in rather than read from a global: that is what
 * lets one build render /vip-experience and /de/ueber-uns from the same
 * bundle without a DOM.
 */
export function render(lang, path) {
  return renderToString(
    <LanguageProvider initialLanguage={lang}>
      <RouteProvider initialPath={path}>
        <TicketsProvider>
          <App />
        </TicketsProvider>
      </RouteProvider>
    </LanguageProvider>,
  )
}
