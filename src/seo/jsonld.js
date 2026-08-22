import {
  CONTACT,
  LOCATION,
  OG_IMAGE,
  SITE_URL,
  SOCIAL,
  TICKETS_VIP_URL,
  absoluteUrl,
  localeFor,
} from '../config/site'
import { seoFor } from './meta'

/* -------------------------------------------------------------------------
 * Structured data.
 *
 * `NightClub` is the most specific Schema.org type that fits, and it inherits
 * from LocalBusiness → so address, geo, telephone and openingHours are all
 * valid on it.
 *
 * Everything here comes from real project data. Deliberately absent:
 * aggregateRating, review, priceRange and openingHoursSpecification — none of
 * those are known, and inventing them is exactly what gets structured data
 * flagged as spam. They are listed in the README as pending.
 * ---------------------------------------------------------------------- */
export function buildJsonLd(code) {
  const locale = localeFor(code)
  const seo = seoFor(code)
  const url = absoluteUrl(locale.path)

  const hasStreet = Boolean(LOCATION.street)
  const hasGeo = Number.isFinite(LOCATION.lat) && Number.isFinite(LOCATION.lng)

  const venue = {
    '@type': 'NightClub',
    '@id': `${SITE_URL}/#venue`,
    name: 'Quartier Barcelona',
    alternateName: 'Quartier Pedralbes',
    description: seo.description,
    url,
    telephone: CONTACT.phoneHref,
    email: CONTACT.email,
    image: absoluteUrl(OG_IMAGE),
    logo: absoluteUrl('/brand/quartier-beige.png'),
    address: {
      '@type': 'PostalAddress',
      ...(hasStreet ? { streetAddress: LOCATION.street } : {}),
      addressLocality: LOCATION.city,
      ...(LOCATION.district ? { addressRegion: LOCATION.district } : {}),
      ...(LOCATION.postalCode ? { postalCode: LOCATION.postalCode } : {}),
      addressCountry: 'ES',
    },
    ...(hasGeo
      ? { geo: { '@type': 'GeoCoordinates', latitude: LOCATION.lat, longitude: LOCATION.lng } }
      : {}),
    ...(SOCIAL.length ? { sameAs: SOCIAL } : {}),
    // The ticketing platform is a genuine action available on the site.
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: TICKETS_VIP_URL },
      name: 'Tickets & VIP tables',
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Quartier Barcelona',
    inLanguage: locale.hreflang,
    publisher: { '@id': `${SITE_URL}/#venue` },
  }

  return { '@context': 'https://schema.org', '@graph': [venue, website] }
}
