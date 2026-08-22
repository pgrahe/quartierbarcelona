# Quartier Barcelona — landing page

One page, six sections, smooth-scroll navigation. No routing, no CMS, no extra pages.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

Stack: Vite + React + plain CSS (one stylesheet per component). No UI framework,
no animation library — reveals are one `IntersectionObserver`, everything else
is CSS transitions.

---

## The three things you'll want to change

| What | Where |
| --- | --- |
| **Ticketing account** | `src/config/site.js` → `FOURVENUES_SLUG` (`quartier-club`) |
| **Address (map + address line)** | `src/config/site.js` → `LOCATION` |
| **"Sobre nosotros" copy** | `src/i18n/translations.js` → `about.body` / `about.closing` (×4 languages) |

Each is defined once and consumed everywhere — no duplicated strings.

---

## Still placeholder

- **Legal pages** — `PRIVACIDAD` / `AVISO LEGAL` link to `#` (`LEGAL` in
  `src/config/site.js`). The pages themselves aren't built.
- **Athena Bold** — not present in the project. See `public/fonts/README.md`.

## Ticketing

"TICKETS Y MESAS VIP" opens a full-screen overlay containing Fourvenues'
official calendar widget for `quartier-club`, so visitors book without leaving
the site. The third-party script is injected on first open, never at page load.

The CTA is still a real link to `site.fourvenues.com/es/quartier-club`, so
cmd-click, middle-click and "open in new tab" behave normally and it degrades
gracefully without JavaScript.


## SEO

Four indexable, prerendered pages — `/` (Spanish, canonical + x-default),
`/en/`, `/fr/`, `/de/`. `npm run build` renders each one to real HTML with its
own title, description, canonical, hreflang set, Open Graph, Twitter card and
`NightClub` JSON-LD, then writes `sitemap.xml` and `robots.txt` from the same
config. Nothing is hand-maintained.

**The URL decides the language, and nothing else** — not localStorage, not the
browser's language. Serving French at `/` because of a stored preference would
put content and canonical in disagreement, which is the fastest way to confuse
Google about which page is which.

Everything derives from `SITE_URL` in `src/config/site.js`; point it at another
domain and canonicals, hreflang, sitemap, robots and JSON-LD all follow.

### Hosting requirement

The four pages are real files (`dist/index.html`, `dist/en/index.html`, …).
**Do not add a catch-all SPA rewrite** (`/* → /index.html`) on Vercel/Netlify:
it would serve the Spanish document at `/en/`, `/fr/` and `/de/`, breaking both
the language and the canonical. Static-file-first — the default on both hosts —
is what this needs.

### Still to add

- `SOCIAL` in `src/config/site.js` — empty; fills JSON-LD `sameAs`.
- `GSC_VERIFICATION` in the same file — Search Console's meta token.
- `LEGAL` paths — until they are real paths the footer renders them as plain
  text rather than dead `#` links.
- Opening hours — deliberately absent from the JSON-LD rather than guessed.

## Languages

ES (default) · EN · FR · DE, in `src/i18n/translations.js`. One HTML document;
the choice persists in `localStorage` and falls back to the browser's language.
`MORE THAN A CLUB` is never translated.

## Palette

`#000000`, `#161616`, `#E7E1D6`. Nothing else — every other tone in the design
is one of these three at some opacity. Photographs are graded to monochrome so
they stay inside it; the hero video is left at its original colours by design.

## Assets

Originals in `Fotos and assets/` are untouched. Web-ready derivatives live in
`public/` (see `public/README.md` for what came from what).
