/* -------------------------------------------------------------------------
 * Per-language SEO metadata.
 *
 * Titles are ~50–60 characters with the brand first. Descriptions are
 * ~140–160 and written to earn a click, not to hold keywords: each one is
 * written natively in its language rather than translated word for word, so
 * "ocio nocturno", "nightlife", "vie nocturne" and "Nachtleben" all read the
 * way someone in that language would actually search.
 * ---------------------------------------------------------------------- */

export const SEO = {
  es: {
    title: 'Quartier Barcelona | Club en Pedralbes',
    description:
      'Quartier Barcelona, club premium en Pedralbes. Música, ambiente y una nueva forma de vivir la noche. Reserva tickets y mesas VIP.',
    ogImageAlt: 'Interior de Quartier Barcelona, club en Pedralbes',
    h1: 'Quartier Barcelona — More Than A Club',
  },
  en: {
    title: 'Quartier Barcelona | Club in Pedralbes',
    description:
      'Quartier Barcelona, a premium club in Pedralbes. Music, atmosphere and a new way to experience Barcelona nightlife. Tickets and VIP tables.',
    ogImageAlt: 'Interior of Quartier Barcelona, a club in Pedralbes',
    h1: 'Quartier Barcelona — More Than A Club',
  },
  fr: {
    title: 'Quartier Barcelona | Club à Pedralbes',
    description:
      'Quartier Barcelona, club premium à Pedralbes. Musique, ambiance et une nouvelle façon de vivre la nuit barcelonaise. Billets et tables VIP.',
    ogImageAlt: 'Intérieur du Quartier Barcelona, club à Pedralbes',
    h1: 'Quartier Barcelona — More Than A Club',
  },
  de: {
    title: 'Quartier Barcelona | Club in Pedralbes',
    description:
      'Quartier Barcelona, Premium-Club in Pedralbes. Musik, Atmosphäre und eine neue Art, das Nachtleben Barcelonas zu erleben. Tickets und VIP-Tische.',
    ogImageAlt: 'Innenraum des Quartier Barcelona, Club in Pedralbes',
    h1: 'Quartier Barcelona — More Than A Club',
  },
}

export function seoFor(code) {
  return SEO[code] || SEO.es
}
