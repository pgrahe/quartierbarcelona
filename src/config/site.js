/* -------------------------------------------------------------------------
 * QUARTIER BARCELONA — single source of truth for every editable value.
 *
 * Everything that is expected to change (ticketing URL, exact address,
 * contact details) lives here and ONLY here. Nothing is hardcoded in
 * components.
 * ---------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
 * Site identity — canonical URL, languages, business data.
 *
 * SITE_URL is the single place the production domain is written. Canonical
 * tags, hreflang, the sitemap, robots.txt, Open Graph and JSON-LD all derive
 * from it, so pointing the site at a different domain is a one-line change.
 * ---------------------------------------------------------------------- */

/** No trailing slash. Must match the live host (Vercel redirects apex → www). */
export const SITE_URL = 'https://www.quartierbarcelona.com'

/**
 * URL-addressable languages. Spanish lives at the root and is also the
 * x-default; the rest get a path prefix. There is deliberately no /es/ —
 * it would duplicate / with no way to redirect from a static host.
 */
export const LOCALES = [
  { code: 'es', path: '/', hreflang: 'es', ogLocale: 'es_ES', isDefault: true },
  { code: 'en', path: '/en/', hreflang: 'en', ogLocale: 'en_GB' },
  { code: 'fr', path: '/fr/', hreflang: 'fr', ogLocale: 'fr_FR' },
  { code: 'de', path: '/de/', hreflang: 'de', ogLocale: 'de_DE' },
]

export function localeFor(code) {
  return LOCALES.find((l) => l.code === code) || LOCALES[0]
}

export function absoluteUrl(path = '/') {
  return SITE_URL + (path.startsWith('/') ? path : `/${path}`)
}

/**
 * Social profiles. Feeds JSON-LD `sameAs` and the footer icons.
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/quartierbarcelona/'

export const SOCIAL = [INSTAGRAM_URL]

/**
 * ⚠️ PENDING — Google Search Console verification token.
 * Paste the content value of the meta tag Search Console gives you; it is
 * injected into every prerendered page. Left empty the tag is omitted.
 */
export const GSC_VERIFICATION = ''

/** The image used when the site is shared. 1200x630, the size every platform
 *  crops toward. */
export const OG_IMAGE = '/img/og-quartier-barcelona.jpg'

/* -------------------------------------------------------------------------
 * Ticketing — Fourvenues
 *
 * Clicking "TICKETS Y MESAS VIP" opens the event calendar in a full-screen
 * overlay on this site rather than sending the visitor away. The overlay
 * embeds Fourvenues' official widget, which is loaded lazily — the third-party
 * script is only fetched the first time someone actually opens it.
 * ---------------------------------------------------------------------- */

/** Fourvenues account slug. Drives the embedded calendar. */
export const FOURVENUES_SLUG = 'quartier-club'

export const FOURVENUES_EMBED_SRC = `https://www.fourvenues.com/assets/iframe/${FOURVENUES_SLUG}/calendar@?theme=dark`

/**
 * Public Fourvenues page. Used as the CTA's real `href`, so cmd/middle-click
 * and "open in new tab" still work, and as the escape hatch inside the
 * overlay if someone would rather use the full site.
 */
export const TICKETS_VIP_URL = `https://site.fourvenues.com/es/${FOURVENUES_SLUG}`

export const CONTACT = {
  email: 'info@quartierbarcelona.com',
  // Displayed as written; the tel: href uses the international form.
  phoneDisplay: '+34 625 266 105',
  phoneHref: '+34625266105',
}

/* -------------------------------------------------------------------------
 * The company behind the club.
 *
 * The LSSI requires the operator's name, tax number and registered office to
 * be published, and the RGPD requires the same for the data controller — so
 * these values are written once here and read by both legal pages. Changing
 * the company details is a one-line change that updates every language.
 *
 * The registered office happens to be the venue's own street today, but it is
 * kept as its own value rather than derived from LOCATION: a domicilio social
 * and a venue are different things and either can move without the other.
 * ---------------------------------------------------------------------- */
export const COMPANY = {
  name: 'RETROMUSIC S.L.',
  nif: 'B62628599',
  street: 'Calle Santa Caterina de Siena, 28',
  postalCode: '08034',
  city: 'Barcelona',
  country: 'España',
}

/** Registered office as one line, for running text. */
export function companyAddress() {
  return [COMPANY.street, `${COMPANY.postalCode} ${COMPANY.city}`.trim(), COMPANY.country]
    .filter(Boolean)
    .join(', ')
}

/**
 * When the legal texts were last revised. ISO, so each language can print it
 * in its own form with Intl instead of four hand-written dates that drift.
 * Update this whenever either legal page is edited.
 */
export const LEGAL_UPDATED = '2026-09-01'

/* -------------------------------------------------------------------------
 * WhatsApp — private events enquiries
 *
 * Derived from CONTACT.phoneHref so there is only ever one phone number in
 * the project. If events should go to a different line, set
 * WHATSAPP_NUMBER to that number instead of pointing it at CONTACT.
 * ---------------------------------------------------------------------- */

/** wa.me wants digits only — no "+", no spaces. */
export const WHATSAPP_NUMBER = CONTACT.phoneHref.replace(/\D/g, '')

/**
 * Opens WhatsApp with the message already typed, so the enquiry arrives with
 * context instead of an empty "Hola". The text is translated per language —
 * see `privateEvents.whatsappMessage` in src/i18n/translations.js.
 */
export function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Venue address. Verified against OpenStreetMap, which places this street
 * number in Pedralbes (les Corts), 08034 — matching the brand.
 *
 * The printed address, the map pin and the "cómo llegar" link all derive from
 * these values, so changing them here updates all three.
 */
export const LOCATION = {
  street: 'Carrer de Santa Caterina de Siena, 28',
  district: 'Pedralbes',
  city: 'Barcelona',
  postalCode: '08034',
  country: 'España',
  // OpenStreetMap / Nominatim pin for this street number.
  lat: 41.3900488,
  lng: 2.1105701,
  zoom: 16,
}

/** Address as one line — used for the map query and link. */
export function formattedAddress() {
  return [LOCATION.street, LOCATION.district, [LOCATION.postalCode, LOCATION.city].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ')
}

/** Address broken for display: street on one line, postcode and city below. */
export function addressLines() {
  return [LOCATION.street, `${LOCATION.postalCode} ${LOCATION.city}`.trim()].filter(Boolean)
}

/** Query string used by the "get directions" link. */
export function mapQuery() {
  return ['Quartier Barcelona', formattedAddress(), LOCATION.country].filter(Boolean).join(', ')
}

export function mapDirectionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery())}`
}

/* -------------------------------------------------------------------------
 * PRÓXIMOS EVENTOS — the flyer cards on the home page.
 *
 * ⚠️ PLACEHOLDER LINE-UP. Replace with the real programme when Fourvenues
 * publishes each night. Until then the CTA opens the calendar listing inside
 * the on-site ticketing overlay (not the Fourvenues site).
 *
 * Each entry is:
 *   id     stable key, never shown
 *   date   ISO date, YYYY-MM-DD. Weekday / day / month are derived with Intl.
 *   title  the night's name — brand, shown as written, not translated
 *   age    required age, printed top-left on the flyer (e.g. '+20')
 *   blurDay optional — softens the day numeral when the exact date is TBA
 *   slug   optional Fourvenues event path; when set, the overlay can deep-link
 *          to that night. Left off → calendar listing.
 *
 * Empty the array and the whole section stops rendering.
 * ---------------------------------------------------------------------- */
export const EVENTS = [
  { id: 'opening', date: '2026-09-25', title: 'OPENING', age: '+20', blurDay: true },
]

/* Page URLs are not here — they live in src/router/routes.js, which is the one
   table the navigation, the language switcher, hreflang, the sitemap and the
   build all read from. Section anchors within the home page (`#contacto`) are
   written on the components that own them. */
