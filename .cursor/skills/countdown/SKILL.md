---
name: countdown
description: Maintain the /countdown teaser page — video hero with opening clock, photo marquee, contact and location. Use when working on /countdown, OpeningCountdown, CountdownPage, or the 15 October clock. The rest of the site is live and must stay reachable.
---

# /countdown

Standalone teaser page. Same slug in every language. **Not** the site homepage and **not** a gate.

The live site is `/` (and `/en/`, `/fr/`, `/de/`). All routes, nav links, Explore cards and ticket CTAs stay functional.

## Page composition

`CountdownPage` is only:

1. `Hero variant="countdown"`
2. `PhotoMarquee`
3. `Contact`
4. `LocationMap`

Footer comes from `App`. Do not add agenda, VIP, private events or intro.

## Hero rules

- Reuse `Hero`. Do not fork the video, slogan rotation or mobile intro.
- Clock sits **above** the rotating slogan; both sit **lower** than the home hero (`.hero--countdown`).
- Opening instant is `OPENING_AT` in `src/config/site.js` (15 October 2026, midnight Europe/Madrid). Change only there.

## Clock

`OpeningCountdown` + `src/lib/countdown.js`. Fill numbers after mount so SSR/hydration cannot drift. Labels live in `translations.js` under `countdown` (ES / EN / FR / DE).

## Routing / SEO

- Route id `countdown` in `src/router/routes.js`
- `HERO_ROUTE_IDS` must include `countdown` so the navbar stays transparent over the film
- SEO block in `src/seo/meta.js` for every language
- Prerender preloads the same hero posters as home
- Do **not** redirect `/`, VIP, events or other pages to `/countdown`
- Do **not** add `vercel.json` redirects back to `/countdown`
- Countdown is `noindex` and omitted from the sitemap so it cannot replace `/` in Google again
