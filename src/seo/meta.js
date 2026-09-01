/* -------------------------------------------------------------------------
 * Per-page, per-language SEO metadata.
 *
 * Shape: SEO[language][routeId] — one entry for every URL the site has, which
 * is what scripts/prerender.mjs walks to build the head of each document.
 *
 * Titles are ~45–60 characters with the brand present. Descriptions are
 * ~140–160 and written to earn a click, not to hold keywords: each one is
 * written natively in its language rather than translated word for word, so
 * "ocio nocturno", "nightlife", "vie nocturne" and "Nachtleben" all read the
 * way someone in that language would actually search.
 * ---------------------------------------------------------------------- */

export const SEO = {
  es: {
    home: {
      title: 'Quartier Barcelona | Club en Pedralbes',
      description:
        'Quartier Barcelona, club premium en Pedralbes. Música, ambiente y una nueva forma de vivir la noche. Reserva tickets y mesas VIP.',
      ogImageAlt: 'Interior de Quartier Barcelona, club en Pedralbes',
    },
    about: {
      title: 'Sobre nosotros | Quartier Barcelona',
      description:
        'Una nueva etapa de la noche de Barcelona. La historia del espacio, la identidad que la continúa y el club renovado de Pedralbes.',
      ogImageAlt: 'Una noche en Quartier Barcelona, club en Pedralbes',
    },
    vip: {
      title: 'VIP Experience | Mesas y reservados | Quartier Barcelona',
      description:
        'Reserva tu mesa VIP en Quartier Barcelona. Servicio dedicado, botella en mesa y el mejor ángulo de la sala. Mesas limitadas en Pedralbes.',
      ogImageAlt: 'Mesa VIP en Quartier Barcelona',
    },
    events: {
      title: 'Eventos privados en Barcelona | Quartier Pedralbes',
      description:
        'Celebra tu evento privado, corporativo o tu fiesta en Quartier Barcelona. Un espacio único en Pedralbes, a tu medida. Solicita información.',
      ogImageAlt: 'Espacio para eventos privados en Quartier Barcelona',
    },
    privacy: {
      title: 'Política de privacidad | Quartier Barcelona',
      description:
        'Cómo se tratan los datos personales en quartierbarcelona.com: responsable, finalidades, base jurídica, conservación y ejercicio de derechos.',
      ogImageAlt: 'Quartier Barcelona, club en Pedralbes',
    },
    legal: {
      title: 'Aviso legal | Quartier Barcelona',
      description:
        'Datos identificativos del titular de quartierbarcelona.com, objeto del sitio, propiedad intelectual, responsabilidad y legislación aplicable.',
      ogImageAlt: 'Quartier Barcelona, club en Pedralbes',
    },
  },

  en: {
    home: {
      title: 'Quartier Barcelona | Club in Pedralbes',
      description:
        'Quartier Barcelona, a premium club in Pedralbes. Music, atmosphere and a new way to experience Barcelona nightlife. Tickets and VIP tables.',
      ogImageAlt: 'Interior of Quartier Barcelona, a club in Pedralbes',
    },
    about: {
      title: 'About us | Quartier Barcelona',
      description:
        'A new chapter in Barcelona nightlife. The story of the space, the identity that carries it on, and the fully renovated club in Pedralbes.',
      ogImageAlt: 'A night at Quartier Barcelona, a club in Pedralbes',
    },
    vip: {
      title: 'VIP Experience | Tables & booths | Quartier Barcelona',
      description:
        'Book your VIP table at Quartier Barcelona. Dedicated service, bottle service and the best view of the room. Limited tables in Pedralbes.',
      ogImageAlt: 'VIP table at Quartier Barcelona',
    },
    events: {
      title: 'Private events in Barcelona | Quartier Pedralbes',
      description:
        'Host your private event, corporate occasion or celebration at Quartier Barcelona. A singular space in Pedralbes, made yours. Get in touch.',
      ogImageAlt: 'Private events space at Quartier Barcelona',
    },
    privacy: {
      title: 'Privacy policy | Quartier Barcelona',
      description:
        'How personal data is handled on quartierbarcelona.com: the controller, purposes, legal basis, retention and how to exercise your rights.',
      ogImageAlt: 'Quartier Barcelona, a club in Pedralbes',
    },
    legal: {
      title: 'Legal notice | Quartier Barcelona',
      description:
        'Identifying details of the operator of quartierbarcelona.com, the purpose of the site, intellectual property, liability and governing law.',
      ogImageAlt: 'Quartier Barcelona, a club in Pedralbes',
    },
  },

  fr: {
    home: {
      title: 'Quartier Barcelona | Club à Pedralbes',
      description:
        'Quartier Barcelona, club premium à Pedralbes. Musique, ambiance et une nouvelle façon de vivre la nuit barcelonaise. Billets et tables VIP.',
      ogImageAlt: 'Intérieur du Quartier Barcelona, club à Pedralbes',
    },
    about: {
      title: 'À propos | Quartier Barcelona',
      description:
        'Une nouvelle étape de la nuit barcelonaise. L’histoire du lieu, l’identité qui la poursuit et le club entièrement rénové de Pedralbes.',
      ogImageAlt: 'Une nuit au Quartier Barcelona, club à Pedralbes',
    },
    vip: {
      title: 'VIP Experience | Tables et carrés VIP | Quartier Barcelona',
      description:
        'Réservez votre table VIP au Quartier Barcelona. Service dédié, bouteilles en table et le plus bel angle de la salle. Tables limitées à Pedralbes.',
      ogImageAlt: 'Table VIP au Quartier Barcelona',
    },
    events: {
      title: 'Événements privés à Barcelone | Quartier Pedralbes',
      description:
        'Organisez votre événement privé, professionnel ou votre célébration au Quartier Barcelona. Un lieu singulier à Pedralbes, à votre mesure.',
      ogImageAlt: 'Espace pour événements privés au Quartier Barcelona',
    },
    privacy: {
      title: 'Politique de confidentialité | Quartier Barcelona',
      description:
        'Le traitement des données personnelles sur quartierbarcelona.com : responsable, finalités, base juridique, conservation et exercice des droits.',
      ogImageAlt: 'Quartier Barcelona, club à Pedralbes',
    },
    legal: {
      title: 'Mentions légales | Quartier Barcelona',
      description:
        'Identification de l’éditeur de quartierbarcelona.com, objet du site, propriété intellectuelle, responsabilité et droit applicable.',
      ogImageAlt: 'Quartier Barcelona, club à Pedralbes',
    },
  },

  de: {
    home: {
      title: 'Quartier Barcelona | Club in Pedralbes',
      description:
        'Quartier Barcelona, Premium-Club in Pedralbes. Musik, Atmosphäre und eine neue Art, das Nachtleben Barcelonas zu erleben. Tickets und VIP-Tische.',
      ogImageAlt: 'Innenraum des Quartier Barcelona, Club in Pedralbes',
    },
    about: {
      title: 'Über uns | Quartier Barcelona',
      description:
        'Ein neues Kapitel im Nachtleben Barcelonas. Die Geschichte des Ortes, die Identität, die sie fortschreibt, und der erneuerte Club in Pedralbes.',
      ogImageAlt: 'Eine Nacht im Quartier Barcelona, Club in Pedralbes',
    },
    vip: {
      title: 'VIP Experience | Tische und Lounges | Quartier Barcelona',
      description:
        'Reservieren Sie Ihren VIP-Tisch im Quartier Barcelona. Eigener Service, Flaschenservice und der beste Blick über den Saal. Begrenzte Tischanzahl.',
      ogImageAlt: 'VIP-Tisch im Quartier Barcelona',
    },
    events: {
      title: 'Private Events in Barcelona | Quartier Pedralbes',
      description:
        'Feiern Sie Ihr privates Event, Ihre Firmenfeier oder Ihren Anlass im Quartier Barcelona. Ein besonderer Ort in Pedralbes, ganz nach Ihnen.',
      ogImageAlt: 'Raum für private Events im Quartier Barcelona',
    },
    privacy: {
      title: 'Datenschutzerklärung | Quartier Barcelona',
      description:
        'Verarbeitung personenbezogener Daten auf quartierbarcelona.com: Verantwortlicher, Zwecke, Rechtsgrundlage, Speicherdauer und Ihre Rechte.',
      ogImageAlt: 'Quartier Barcelona, Club in Pedralbes',
    },
    legal: {
      title: 'Impressum | Quartier Barcelona',
      description:
        'Angaben zum Anbieter von quartierbarcelona.com, Gegenstand der Website, Urheberrecht, Haftung und anwendbares Recht.',
      ogImageAlt: 'Quartier Barcelona, Club in Pedralbes',
    },
  },
}

export function seoFor(code, routeId = 'home') {
  const byLang = SEO[code] || SEO.es
  return byLang[routeId] || byLang.home
}
