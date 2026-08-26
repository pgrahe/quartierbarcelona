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
import { pathFor } from '../router/routes'
import { seoFor } from './meta'

/* -------------------------------------------------------------------------
 * Structured data.
 *
 * `NightClub` is the most specific Schema.org type that fits, and it inherits
 * from LocalBusiness → so address, geo, telephone and openingHours are all
 * valid on it.
 *
 * Every page carries the venue and the website nodes — that is what ties all
 * four languages and all four pages to one business — plus a WebPage node for
 * itself. Sub-pages add a BreadcrumbList, so search results can show the
 * "Quartier Barcelona › VIP Experience" trail instead of a bare URL.
 *
 * Everything here comes from real project data. Deliberately absent:
 * aggregateRating, review, priceRange and openingHoursSpecification — none of
 * those are known, and inventing them is exactly what gets structured data
 * flagged as spam. They are listed in the README as pending.
 * ---------------------------------------------------------------------- */
export function buildJsonLd(code, routeId = 'home') {
  const locale = localeFor(code)
  const seo = seoFor(code, routeId)
  const homeSeo = seoFor(code, 'home')
  const homeUrl = absoluteUrl(locale.path)
  const url = absoluteUrl(pathFor(routeId, code))

  const hasStreet = Boolean(LOCATION.street)
  const hasGeo = Number.isFinite(LOCATION.lat) && Number.isFinite(LOCATION.lng)

  const venue = {
    '@type': 'NightClub',
    '@id': `${SITE_URL}/#venue`,
    name: 'Quartier Barcelona',
    alternateName: 'Quartier Pedralbes',
    description: homeSeo.description,
    url: homeUrl,
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

  const webpage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: locale.hreflang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#venue` },
    primaryImageOfPage: absoluteUrl(OG_IMAGE),
  }

  const graph = [venue, website, webpage]

  if (routeId !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Quartier Barcelona',
          item: homeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          // The page's own title without the brand suffix reads as the crumb.
          name: seo.title.split('|')[0].trim(),
          item: url,
        },
      ],
    })
    webpage.breadcrumb = { '@id': `${url}#breadcrumb` }
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
