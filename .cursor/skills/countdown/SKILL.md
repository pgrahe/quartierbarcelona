---
name: countdown
description: Maintain the /countdown teaser landing — video hero with opening clock, photo marquee, contact and location, no tickets CTA in the chrome. Use when working on /countdown, the opening countdown, OpeningCountdown, CountdownPage, or the 1 October clock.
---

# /countdown

Teaser landing. Not in the main nav. Same slug in every language.

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
- No `TicketsCta` in the hero bar, the navbar or the mobile menu on this route.
- Opening instant is `OPENING_AT` in `src/config/site.js` (1 October 2026, midnight Europe/Madrid). Change only there.

## Clock

`OpeningCountdown` + `src/lib/countdown.js`. Fill numbers after mount so SSR/hydration cannot drift. Labels live in `translations.js` under `countdown` (ES / EN / FR / DE).

## Routing / SEO

- Route id `countdown` in `src/router/routes.js`
- `HERO_ROUTE_IDS` must include `countdown` so the navbar stays transparent over the film
- SEO block in `src/seo/meta.js` for every language
- Prerender preloads the same hero posters as home

## Opening gate

While the clock is up, only `countdown`, `privacy` and `legal` stay reachable.

- `publicRouteId()` in `src/router/routes.js` is the single switch — home, about, VIP, events and unknown URLs resolve to countdown
- `RouteLink` and the language switcher go through that helper, so footer / nav / logo / Contact (`#contacto`) land on `/countdown`
- `RouteProvider` `replaceState`s a typed or bookmarked gated URL to `/countdown` (keeps `#contacto`)
- `vercel.json` has matching temporary redirects for production
- Sitemap lists only the open routes

Privacy and legal notice stay as they are. Do not send those to `/countdown`.
