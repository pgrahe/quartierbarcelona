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
