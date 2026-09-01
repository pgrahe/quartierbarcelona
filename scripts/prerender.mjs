/* -------------------------------------------------------------------------
 * Build-time prerender.
 *
 * Turns the app into a set of indexable, fully-formed HTML documents — every
 * page, in every language:
 *
 *   /                  /en/            /fr/            /de/
 *   /sobre-nosotros    /en/about       /fr/a-propos    /de/ueber-uns
 *   /vip-experience    /en/vip-experience   …          …
 *   /private-events    /en/private-events   …          …
 *
 * Each one ships its own title, description, canonical, hreflang set, Open
 * Graph, Twitter card and JSON-LD — and the rendered content, so the copy,
 * headings, address and links are in the HTML before JavaScript runs.
 *
 * The URL list is not written here: it comes from src/router/routes.js, the
 * same table the running app navigates with, so a page can never exist in the
 * navigation and be missing from the build (or the sitemap).
 *
 * robots.txt and sitemap.xml are written here too, from that same source, so
 * they can never drift out of sync with the pages that actually exist.
 *
 * Run automatically by `npm run build`.
 * ---------------------------------------------------------------------- */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDist = path.join(root, 'dist-ssr')

const {
  render,
  LOCALES,
  SITE_URL,
  OG_IMAGE,
  GSC_VERIFICATION,
  absoluteUrl,
  allPaths,
  pathFor,
  PAGE_HEROES,
  HERO_POSTERS,
  seoFor,
  buildJsonLd,
} = await import(pathToFileURL(path.join(ssrDist, 'entry-server.js')).href)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

/** Every language's URL for one route, plus x-default. That set is what makes
 *  hreflang self-consistent: each page advertises every language including
 *  itself, and they all point at the same page rather than at the home page. */
function alternatesFor(routeId) {
  const tags = LOCALES.map(
    (l) =>
      `    <link rel="alternate" hreflang="${l.hreflang}" href="${absoluteUrl(pathFor(routeId, l.code))}" />`,
  )
  const xDefault = LOCALES.find((l) => l.isDefault)
  tags.push(
    `    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(pathFor(routeId, xDefault.code))}" />`,
  )
  return tags
}

/**
 * The one image worth preloading on this page — its LCP candidate.
 *
 * The home page has two, because the hero swaps between a landscape and a
 * vertical cut at 900px and only one of them is ever used; `media` makes the
 * browser fetch exactly one. The content pages have a single responsive
 * header photograph, so the preload carries the same srcset the <img> does —
 * without it the browser would preload one candidate and then download a
 * different one.
 */
function preloadFor(routeId) {
  if (routeId === 'home') {
    return [
      `    <link rel="preload" as="image" href="${HERO_POSTERS.desktop}" fetchpriority="high" media="(min-width: 901px)" />`,
      `    <link rel="preload" as="image" href="${HERO_POSTERS.mobile}" fetchpriority="high" media="(max-width: 900px)" />`,
    ].join('\n')
  }

  const hero = PAGE_HEROES[routeId]
  if (!hero) return ''

  return `    <link rel="preload" as="image" href="${hero.src}" imagesrcset="${esc(hero.srcSet)}" imagesizes="100vw" fetchpriority="high" />`
}

function headFor(locale, routeId, url) {
  const seo = seoFor(locale.code, routeId)
  const image = absoluteUrl(OG_IMAGE)

  const tags = [
    `    <meta name="description" content="${esc(seo.description)}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <link rel="canonical" href="${url}" />`,
    ...alternatesFor(routeId),
    ``,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="Quartier Barcelona" />`,
    `    <meta property="og:title" content="${esc(seo.title)}" />`,
    `    <meta property="og:description" content="${esc(seo.description)}" />`,
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:image" content="${image}" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    `    <meta property="og:locale" content="${locale.ogLocale}" />`,
    ...LOCALES.filter((l) => l.code !== locale.code).map(
      (l) => `    <meta property="og:locale:alternate" content="${l.ogLocale}" />`,
    ),
    ``,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${esc(seo.title)}" />`,
    `    <meta name="twitter:description" content="${esc(seo.description)}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    `    <meta name="twitter:image:alt" content="${esc(seo.ogImageAlt)}" />`,
  ]

  if (GSC_VERIFICATION) {
    tags.push(`    <meta name="google-site-verification" content="${esc(GSC_VERIFICATION)}" />`)
  }

  tags.push(
    ``,
    `    <script type="application/ld+json">${JSON.stringify(buildJsonLd(locale.code, routeId))}</script>`,
  )

  return tags.join('\n')
}

const pages = allPaths()

for (const { locale, routeId, path: urlPath } of pages) {
  const seo = seoFor(locale.code, routeId)
  const url = absoluteUrl(urlPath)

  const html = template
    .replace('<!--seo-head-->', headFor(locale, routeId, url))
    .replace('<!--lcp-preload-->', preloadFor(routeId))
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace('<html lang="es">', `<html lang="${locale.hreflang}">`)
    .replace('<!--app-html-->', render(locale.code, urlPath))

  // "/" is the dist root; "/en/" and "/sobre-nosotros" are directories with an
  // index.html inside, which is what a static host serves for a clean URL.
  const outDir = urlPath === '/' ? dist : path.join(dist, urlPath)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  console.log(`  prerendered ${urlPath.padEnd(22)} → ${(html.length / 1024).toFixed(1)} KB`)
}

/* ---- sitemap.xml ---- */
const lastmod = new Date().toISOString().slice(0, 10)

/* The legal pages belong in the sitemap — they are real, indexable documents
   and Google reads their presence as a trust signal — but they are not what
   the site is for, and they change once a year rather than weekly. */
const LEGAL_ROUTES = new Set(['privacy', 'legal'])

function sitemapPriority(routeId, locale) {
  if (LEGAL_ROUTES.has(routeId)) return locale.isDefault ? '0.3' : '0.2'
  if (routeId === 'home') return locale.isDefault ? '1.0' : '0.8'
  return locale.isDefault ? '0.8' : '0.6'
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    ({ locale, routeId, path: urlPath }) => `  <url>
    <loc>${absoluteUrl(urlPath)}</loc>
${LOCALES.map(
  (alt) =>
    `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${absoluteUrl(pathFor(routeId, alt.code))}" />`,
).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(pathFor(routeId, 'es'))}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${LEGAL_ROUTES.has(routeId) ? 'yearly' : 'weekly'}</changefreq>
    <priority>${sitemapPriority(routeId, locale)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

/* ---- robots.txt ---- */
const robots = `# Quartier Barcelona
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
fs.writeFileSync(path.join(dist, 'robots.txt'), robots)

console.log(`  sitemap.xml + robots.txt written (${pages.length} URLs)`)
