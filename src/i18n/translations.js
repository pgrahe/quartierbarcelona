/* -------------------------------------------------------------------------
 * Translations — ES / EN / FR / DE
 *
 * Every visible string on the site comes from here. To change copy, edit the
 * value in all four languages; nothing else needs touching.
 *
 * ⚠️ `about.body` is PLACEHOLDER copy. See the comment above it.
 * ---------------------------------------------------------------------- */

export const LANGUAGES = [
  { code: 'es', label: 'ES', name: 'Español', htmlLang: 'es' },
  { code: 'en', label: 'EN', name: 'English', htmlLang: 'en' },
  { code: 'fr', label: 'FR', name: 'Français', htmlLang: 'fr' },
  { code: 'de', label: 'DE', name: 'Deutsch', htmlLang: 'de' },
]

export const DEFAULT_LANGUAGE = 'es'

/** Never translated — the slogan is brand, not copy. */
export const SLOGAN = 'MORE THAN A CLUB'

/**
 * Hero rotations. Same cadence as a Sutton-style lockup: "MORE THAN" holds,
 * the second line cycles. Never translated.
 */
export const SLOGAN_ROTATIONS = [
  { id: 'night', lines: ['MORE THAN', 'A NIGHT.'], label: 'MORE THAN A NIGHT.' },
  { id: 'moment', lines: ['MORE THAN', 'A MOMENT.'], label: 'MORE THAN A MOMENT.' },
  { id: 'club', lines: ['MORE THAN', 'A CLUB.'], label: 'MORE THAN A CLUB.' },
]

export const translations = {
  es: {
    meta: {
      description:
        'Quartier Barcelona. Un destino de ocio nocturno en Pedralbes, Barcelona. More Than A Club.',
    },
    nav: {
      home: 'INICIO',
      about: 'SOBRE NOSOTROS',
      contact: 'CONTACTO',
      tickets: 'TICKETS Y MESAS VIP',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menu: 'Menú',
      language: 'Idioma',
      skipToContent: 'Saltar al contenido',
      closeTickets: 'Cerrar entradas',
      ticketsExternal: 'Abrir en Fourvenues',
    },
    hero: {
      videoLabel: 'Vídeo ambiente de Quartier Barcelona',
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The first entry is set as a lead, the last as a closing line.
      body: [
        'Hay lugares a los que vas una noche. Y hay lugares que se convierten en parte de ella.',
        'Durante décadas, este espacio ha formado parte de la noche de Barcelona. Hoy, esa historia evoluciona con Quartier. Un espacio completamente renovado, un nuevo diseño y una nueva identidad para una nueva generación.',
        'Música, ambiente y una experiencia cuidada hasta el último detalle se unen para crear una nueva forma de vivir la noche.',
      ],
      closing: 'Porque salir es solo el principio.',
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Retrato en blanco y negro de una noche en Quartier Barcelona',
    },
    brand: {
      caption: 'LA NOCHE, A NUESTRA MANERA',
      imageAlt: 'Ambiente nocturno en la pista de Quartier Barcelona',
    },
    contact: {
      eyebrow: 'HABLEMOS',
      title: 'CONTACTO',
      emailLabel: 'EMAIL',
      phoneLabel: 'TELÉFONO',
      ticketsLine: 'Reservas de mesa y entradas',
    },
    location: {
      eyebrow: 'DÓNDE ESTAMOS',
      title: 'PEDRALBES,\nBARCELONA.',
      directions: 'CÓMO LLEGAR',
      mapLabel: 'Mapa con la ubicación de Quartier Barcelona',
    },
    footer: {
      legalPrivacy: 'PRIVACIDAD',
      legalNotice: 'AVISO LEGAL',
      navTitle: 'NAVEGACIÓN',
      contactTitle: 'CONTACTO',
      rights: 'QUARTIER BARCELONA',
    },
  },

  en: {
    meta: {
      description:
        'Quartier Barcelona. A nightlife destination in Pedralbes, Barcelona. More Than A Club.',
    },
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      contact: 'CONTACT',
      tickets: 'TICKETS & VIP TABLES',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menu: 'Menu',
      language: 'Language',
      skipToContent: 'Skip to content',
      closeTickets: 'Close tickets',
      ticketsExternal: 'Open on Fourvenues',
    },
    hero: {
      videoLabel: 'Quartier Barcelona atmosphere video',
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        'There are places you go to for a night. And places that become part of it.',
        "For decades, this space has been part of Barcelona's nights. Today that story moves on as Quartier. A completely renovated space, a new design and a new identity for a new generation.",
        'Music, atmosphere and an experience considered down to the last detail come together to create a new way of living the night.',
      ],
      closing: 'Because going out is only the beginning.',
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Black and white portrait of a night at Quartier Barcelona',
    },
    brand: {
      caption: 'THE NIGHT, OUR WAY',
      imageAlt: 'Night atmosphere on the Quartier Barcelona dancefloor',
    },
    contact: {
      eyebrow: "LET'S TALK",
      title: 'CONTACT',
      emailLabel: 'EMAIL',
      phoneLabel: 'PHONE',
      ticketsLine: 'Table bookings and tickets',
    },
    location: {
      eyebrow: 'WHERE WE ARE',
      title: 'PEDRALBES,\nBARCELONA.',
      directions: 'GET DIRECTIONS',
      mapLabel: 'Map showing the location of Quartier Barcelona',
    },
    footer: {
      legalPrivacy: 'PRIVACY',
      legalNotice: 'LEGAL NOTICE',
      navTitle: 'NAVIGATION',
      contactTitle: 'CONTACT',
      rights: 'QUARTIER BARCELONA',
    },
  },

  fr: {
    meta: {
      description:
        'Quartier Barcelona. Une destination nocturne à Pedralbes, Barcelone. More Than A Club.',
    },
    nav: {
      home: 'ACCUEIL',
      about: 'À PROPOS',
      contact: 'CONTACT',
      tickets: 'TICKETS ET TABLES VIP',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      menu: 'Menu',
      language: 'Langue',
      skipToContent: 'Aller au contenu',
      closeTickets: 'Fermer les billets',
      ticketsExternal: 'Ouvrir sur Fourvenues',
    },
    hero: {
      videoLabel: "Vidéo d'ambiance de Quartier Barcelona",
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        "Il y a des lieux où l'on va le temps d'une nuit. Et des lieux qui en deviennent une partie.",
        "Pendant des décennies, ce lieu a fait partie des nuits de Barcelone. Aujourd'hui, cette histoire évolue avec Quartier. Un espace entièrement rénové, un nouveau design et une nouvelle identité pour une nouvelle génération.",
        "La musique, l'ambiance et une expérience soignée jusque dans le moindre détail se rejoignent pour créer une nouvelle façon de vivre la nuit.",
      ],
      closing: "Parce que sortir n'est que le commencement.",
      caption: 'PEDRALBES · BARCELONE',
      imageAlt: 'Portrait en noir et blanc d’une nuit au Quartier Barcelona',
    },
    brand: {
      caption: 'LA NUIT, À NOTRE FAÇON',
      imageAlt: 'Ambiance nocturne sur la piste du Quartier Barcelona',
    },
    contact: {
      eyebrow: 'PARLONS-EN',
      title: 'CONTACT',
      emailLabel: 'EMAIL',
      phoneLabel: 'TÉLÉPHONE',
      ticketsLine: 'Réservations de table et billets',
    },
    location: {
      eyebrow: 'OÙ NOUS TROUVER',
      title: 'PEDRALBES,\nBARCELONE.',
      directions: 'S’Y RENDRE',
      mapLabel: 'Carte indiquant l’emplacement de Quartier Barcelona',
    },
    footer: {
      legalPrivacy: 'CONFIDENTIALITÉ',
      legalNotice: 'MENTIONS LÉGALES',
      navTitle: 'NAVIGATION',
      contactTitle: 'CONTACT',
      rights: 'QUARTIER BARCELONA',
    },
  },

  de: {
    meta: {
      description:
        'Quartier Barcelona. Ein Nachtleben-Ziel in Pedralbes, Barcelona. More Than A Club.',
    },
    nav: {
      home: 'START',
      about: 'ÜBER UNS',
      contact: 'KONTAKT',
      tickets: 'TICKETS UND VIP-TISCHE',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      menu: 'Menü',
      language: 'Sprache',
      skipToContent: 'Zum Inhalt springen',
      closeTickets: 'Tickets schließen',
      ticketsExternal: 'Auf Fourvenues öffnen',
    },
    hero: {
      videoLabel: 'Atmosphäre-Video von Quartier Barcelona',
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        'Es gibt Orte, an die man für eine Nacht geht. Und Orte, die zu einem Teil von ihr werden.',
        'Jahrzehntelang war dieser Ort Teil der Nächte Barcelonas. Heute entwickelt sich diese Geschichte als Quartier weiter. Ein vollständig erneuerter Raum, ein neues Design und eine neue Identität für eine neue Generation.',
        'Musik, Atmosphäre und ein bis ins letzte Detail durchdachtes Erlebnis verbinden sich zu einer neuen Art, die Nacht zu erleben.',
      ],
      closing: 'Denn Ausgehen ist erst der Anfang.',
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Schwarzweiß-Porträt einer Nacht im Quartier Barcelona',
    },
    brand: {
      caption: 'DIE NACHT, AUF UNSERE ART',
      imageAlt: 'Nachtatmosphäre auf der Tanzfläche des Quartier Barcelona',
    },
    contact: {
      eyebrow: 'SPRECHEN WIR',
      title: 'KONTAKT',
      emailLabel: 'E-MAIL',
      phoneLabel: 'TELEFON',
      ticketsLine: 'Tischreservierungen und Tickets',
    },
    location: {
      eyebrow: 'WO WIR SIND',
      title: 'PEDRALBES,\nBARCELONA.',
      directions: 'ANFAHRT',
      mapLabel: 'Karte mit dem Standort von Quartier Barcelona',
    },
    footer: {
      legalPrivacy: 'DATENSCHUTZ',
      legalNotice: 'IMPRESSUM',
      navTitle: 'NAVIGATION',
      contactTitle: 'KONTAKT',
      rights: 'QUARTIER BARCELONA',
    },
  },
}
