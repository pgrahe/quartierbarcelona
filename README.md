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
| **Tickets / VIP tables URL** | `src/config/site.js` → `TICKETS_VIP_URL` |
| **Exact address (map + address line)** | `src/config/site.js` → `LOCATION.street` and `.postalCode` |
| **"Sobre nosotros" copy** | `src/i18n/translations.js` → `about.body` (×4 languages) |

Each is defined once and consumed everywhere — no duplicated strings.

---

## Still placeholder

- **Tickets URL** — no ticketing link existed in the project material, so
  `TICKETS_VIP_URL` currently points at a `mailto:`. Swap in the real URL and
  every placement (navbar, mobile hero, mobile menu, contact, footer) follows.
  The `TICKETS_VIP_IS_EXTERNAL` flag flips automatically and starts opening the
  link in a new tab.
- **Street address** — the assets confirm Pedralbes, Barcelona but contain no
  street address, so none was invented. Until `LOCATION.street` is filled the
  location section reads "Pedralbes, Barcelona" with a small "dirección exacta
  próximamente" line, and the map searches for "Quartier Barcelona, Pedralbes,
  Barcelona" (which Google already resolves to the right pin).
- **About copy** — provisional in all four languages, structured so it can be
  replaced without touching layout.
- **Legal pages** — `PRIVACIDAD` / `AVISO LEGAL` link to `#` (`LEGAL` in
  `src/config/site.js`). The pages themselves aren't built.
- **Athena Bold** — not present in the project. See `public/fonts/README.md`.

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
