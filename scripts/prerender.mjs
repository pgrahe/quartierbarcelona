/* -------------------------------------------------------------------------
 * Build-time prerender.
 *
 * Turns the single-page app into four indexable, fully-formed HTML documents:
 *
 *   /        Spanish (canonical + x-default)
 *   /en/     /fr/     /de/
 *
 * Each one ships its own title, description, canonical, hreflang set, Open
 * Graph, Twitter card and JSON-LD — and the rendered content, so the copy,
 * headings, address and links are in the HTML before JavaScript runs.
 *
 * robots.txt and sitemap.xml are written here too, from the same config, so
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
  seoFor,
  buildJsonLd,
} = await import(pathToFileURL(path.join(ssrDist, 'entry-server.js')).href)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function headFor(locale) {
  const seo = seoFor(locale.code)
  const url = absoluteUrl(locale.path)
  const image = absoluteUrl(OG_IMAGE)

  // Every page advertises every language, including itself — that is what the
  // spec requires and what makes the set self-consistent.
  const alternates = LOCALES.map(
    (l) =>
      `    <link rel="alternate" hreflang="${l.hreflang}" href="${absoluteUrl(l.path)}" />`,
  )
  const xDefault = LOCALES.find((l) => l.isDefault)
  alternates.push(
    `    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(xDefault.path)}" />`,
  )

  const tags = [
    `    <meta name="description" content="${esc(seo.description)}" />`,
    `    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `    <link rel="canonical" href="${url}" />`,
    ...alternates,
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
    `    <script type="application/ld+json">${JSON.stringify(buildJsonLd(locale.code))}</script>`,
  )

  return tags.join('\n')
}

let written = 0
for (const locale of LOCALES) {
  const seo = seoFor(locale.code)
  const html = template
    .replace('<!--seo-head-->', headFor(locale))
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace('<html lang="es">', `<html lang="${locale.hreflang}">`)
    .replace('<!--app-html-->', render(locale.code))

  const outDir = locale.path === '/' ? dist : path.join(dist, locale.path)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  written++
  console.log(`  prerendered ${locale.path.padEnd(6)} → ${(html.length / 1024).toFixed(1)} KB`)
}

/* ---- sitemap.xml ---- */
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(
  (l) => `  <url>
    <loc>${absoluteUrl(l.path)}</loc>
${LOCALES.map(
  (alt) =>
    `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${absoluteUrl(alt.path)}" />`,
).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl('/')}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${l.isDefault ? '1.0' : '0.8'}</priority>
  </url>`,
).join('\n')}
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

console.log(`  sitemap.xml + robots.txt written (${written} URLs)`)
