# Quartier Barcelona — site

Six pages in four languages — twenty-four real, prerendered HTML documents. No CMS,
no router dependency: the router is ~120 lines in `src/router/`.

| Page | ES | EN | FR | DE |
| --- | --- | --- | --- | --- |
| Home | `/` | `/en/` | `/fr/` | `/de/` |
| About | `/sobre-nosotros` | `/en/about` | `/fr/a-propos` | `/de/ueber-uns` |
| VIP | `/vip-experience` | `/en/vip-experience` | … | … |
| Private events | `/private-events` | `/en/private-events` | … | … |
| Privacy | `/politica-de-privacidad` | `/en/privacy-policy` | `/fr/politique-de-confidentialite` | `/de/datenschutz` |
| Legal notice | `/aviso-legal` | `/en/legal-notice` | `/fr/mentions-legales` | `/de/impressum` |

Contact and location stay on the home page, at the bottom — `/#contacto`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

Stack: Vite + React + plain CSS (one stylesheet per component). No UI framework,
no animation library — reveals are one `IntersectionObserver`, everything else
is CSS transitions.

---

## The things you'll want to change

| What | Where |
| --- | --- |
| **Ticketing account** | `src/config/site.js` → `FOURVENUES_SLUG` (`quartier-club`) |
| **Address (map + address line)** | `src/config/site.js` → `LOCATION` |
| **"Sobre nosotros" copy** | `src/i18n/translations.js` → `about.body` / `about.closing` / `about.coda` (×4 languages) |
| **The programme (PRÓXIMOS EVENTOS)** | `src/config/site.js` → `EVENTS` — currently placeholder test nights |
| **URLs / adding a page** | `src/router/routes.js` — one table drives navigation, hreflang, the sitemap and the build |
| **Company details on the legal pages** | `src/config/site.js` → `COMPANY` (name, NIF, registered office) |
| **Legal texts** | `src/i18n/translations.js` → `legal.privacy` / `legal.notice` (×4 languages) — bump `LEGAL_UPDATED` in `src/config/site.js` whenever you edit one |

Each is defined once and consumed everywhere — no duplicated strings.

### Próximos eventos

`EVENTS` is a list of `{ id, date, title, tag }`. The weekday, day and month
printed on each flyer are derived from `date` with `Intl` in the visitor's own
language, so a night is one line and needs no translation. Empty the array and
the section stops rendering rather than showing an empty heading.

⚠️ The three entries there now are **test data** (`TEST EVENT`, September 2026).
Replace them with the real line-up.

---

## Still placeholder

- **Athena Bold** — not present in the project. See `public/fonts/README.md`.

## Ticketing

"TICKETS Y MESAS VIP" opens a full-screen overlay containing Fourvenues'
official calendar widget for `quartier-club`, so visitors book without leaving
the site. The third-party script is injected on first open, never at page load.

The CTA is still a real link to `site.fourvenues.com/es/quartier-club`, so
cmd-click, middle-click and "open in new tab" behave normally and it degrades
gracefully without JavaScript.


## SEO

Twenty-four indexable, prerendered documents — every page in every language.
`npm run build` renders each one to real HTML with its own title, description,
canonical, hreflang set, Open Graph, Twitter card, `NightClub` + `WebPage`
JSON-LD (plus a `BreadcrumbList` on the inner pages) and an LCP `<link
rel="preload">` for that page's own header image, then writes `sitemap.xml` and
`robots.txt` from the same config. Nothing is hand-maintained.

The URL list comes from `src/router/routes.js` — the same table the running app
navigates with — so a page cannot exist in the navigation and be missing from
the build or the sitemap. Add a route there and the documents, the language
switcher, the hreflang sets and the sitemap all follow from it.

hreflang is per *page*, not per site: `/sobre-nosotros` points at `/en/about`,
`/fr/a-propos` and `/de/ueber-uns`, not at the home page of each language.

**The URL decides the language, and nothing else** — not localStorage, not the
browser's language. Serving French at `/` because of a stored preference would
put content and canonical in disagreement, which is the fastest way to confuse
Google about which page is which.

Everything derives from `SITE_URL` in `src/config/site.js`; point it at another
domain and canonicals, hreflang, sitemap, robots and JSON-LD all follow.

### Hosting requirement

Every page is a real file (`dist/index.html`, `dist/en/index.html`,
`dist/sobre-nosotros/index.html`, …). **Do not add a catch-all SPA rewrite**
(`/* → /index.html`) on Vercel/Netlify: it would serve the Spanish home page at
every URL, breaking the language, the canonical and every inner page — and it
would answer 200 for URLs that should 404. Static-file-first, which is the
default on both hosts, is exactly what this needs.

Navigation between pages is still instant: links are intercepted client-side,
so the ticketing overlay, the chosen language and the fixed navbar survive a
page change. The real `href` is always there for cmd-click, crawlers and
no-JS visitors.

### Still to add

- `SOCIAL` in `src/config/site.js` — empty; fills JSON-LD `sameAs`.
- `GSC_VERIFICATION` in the same file — Search Console's meta token.
- `LEGAL` paths — until they are real paths the footer renders them as plain
  text rather than dead `#` links.
- Opening hours — deliberately absent from the JSON-LD rather than guessed.

## Languages

ES (default) · EN · FR · DE, in `src/i18n/translations.js`. Switching language
keeps you on the page you are reading — `/vip-experience` → `/fr/vip-experience`,
not back to the home page.

Slugs are translated where the word is genuinely translated (`sobre-nosotros` /
`about` / `a-propos` / `ueber-uns`) and identical where the label is brand
English that already appears untranslated on the site (`vip-experience`,
`private-events`). `MORE THAN A CLUB`, `A NEW CHAPTER`, `OWN THE NIGHT` and
`Make it yours.` are never translated either — they are brand, not copy.

## Palette

`#000000`, `#161616`, `#E7E1D6`. Nothing else — every other tone in the design
is one of these three at some opacity. Photographs are graded to monochrome so
they stay inside it; the hero video is left at its original colours by design.

## Assets

Originals in `Fotos and assets/` are untouched. Web-ready derivatives live in
`public/` (see `public/README.md` for what came from what).
