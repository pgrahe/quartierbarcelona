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

/** No trailing slash. */
export const SITE_URL = 'https://quartierbarcelona.com'

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
 * ⚠️ PENDING — no social profiles were found anywhere in the project, so this
 * is empty rather than guessed. Add the real profile URLs and they flow
 * straight into the JSON-LD `sameAs`, which is how Google ties the site to
 * the Business Profile.
 */
export const SOCIAL = []

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

export const FOURVENUES_EMBED_SRC = `https://www.fourvenues.com/assets/iframe/${FOURVENUES_SLUG}/calendar@`

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

/** Legal pages are not built yet — these anchors keep the markup honest. */
export const LEGAL = {
  privacy: '#',
  notice: '#',
}

export const SECTIONS = ['inicio', 'sobre-nosotros', 'contacto']
