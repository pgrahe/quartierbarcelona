/* -------------------------------------------------------------------------
 * The photograph at the top of each inner page.
 *
 * Kept here, and not inside the page components, because two very different
 * things need to agree on it: the component that renders the <img>, and the
 * build, which writes a <link rel="preload"> for exactly that image into the
 * page's head. That image is the LCP element on every inner page, so a
 * preload that pointed at the wrong file would be worse than none at all.
 *
 * The alt text is not here — it is copy, and lives per language in
 * translations.js under `pages.<route>.imageAlt`.
 * ---------------------------------------------------------------------- */
export const PAGE_HEROES = {
  about: {
    src: '/img/brand-moment-wide-1800.jpg',
    srcSet:
      '/img/brand-moment-wide-1200.jpg 1200w, /img/brand-moment-wide-1800.jpg 1800w, /img/brand-moment-wide-2400.jpg 2400w',
    width: 2400,
    height: 1200,
  },
  vip: {
    src: '/img/brand-moment-2-wide-1800.jpg',
    srcSet:
      '/img/brand-moment-2-wide-1200.jpg 1200w, /img/brand-moment-2-wide-1800.jpg 1800w, /img/brand-moment-2-wide-2400.jpg 2400w',
    width: 2400,
    height: 1200,
  },
  events: {
    src: '/img/brand-moment-3-wide-1800.jpg',
    srcSet:
      '/img/brand-moment-3-wide-1200.jpg 1200w, /img/brand-moment-3-wide-1800.jpg 1800w, /img/brand-moment-3-wide-2400.jpg 2400w',
    width: 2400,
    height: 1200,
  },
}

/** The home page's LCP is the hero video's poster frame, not a page header. */
export const HERO_POSTERS = {
  desktop: '/video/hero-poster.jpg?v=6',
  mobile: '/video/hero-poster-vertical.jpg?v=6',
}
