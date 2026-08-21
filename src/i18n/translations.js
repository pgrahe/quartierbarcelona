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
 * Hero rotation. "MORE THAN" and "A" hold; only NIGHT / MOMENT / CLUB cycle.
 * Never translated — brand English, rendered uppercase in the hero.
 */
export const SLOGAN_LEAD = 'MORE THAN'
export const SLOGAN_ARTICLE = 'A'

export const SLOGAN_ROTATIONS = [
  { id: 'night', word: 'NIGHT.', label: 'MORE THAN A NIGHT.' },
  { id: 'moment', word: 'MOMENT.', label: 'MORE THAN A MOMENT.' },
  { id: 'club', word: 'CLUB.', label: 'MORE THAN A CLUB.' },
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
      privateEvents: 'EVENTOS PRIVADOS',
      // Navbar only — the full label overflows the bar on narrow laptops.
      privateEventsShort: 'EVENTOS',
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
      imageAlt2: 'Grupo de amigos en una noche en Quartier Barcelona',
      imageAlt3: 'Invitada celebrando en Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      // Headline stays English in every language, like the hero slogan and the
      // About title — it is brand, not copy.
      title: 'Make it yours.',
      body:
        'Quartier también es un espacio único para celebrar eventos privados, corporativos y ocasiones especiales en Pedralbes.',
      tagline: 'Un espacio. Una experiencia. A tu medida.',
      cta: 'SOLICITAR INFORMACIÓN',
      whatsappMessage: 'Hola, me gustaría recibir información sobre eventos privados en Quartier Barcelona.',
      imageAlt: 'Reservado de Quartier Barcelona',
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
      privateEvents: 'PRIVATE EVENTS',
      privateEventsShort: 'EVENTS',
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
      imageAlt2: 'Friends together on a night at Quartier Barcelona',
      imageAlt3: 'Guest celebrating at Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'Quartier is also a singular space for private events, corporate occasions and celebrations in Pedralbes.',
      tagline: 'One space. One experience. Made yours.',
      cta: 'REQUEST INFORMATION',
      whatsappMessage: 'Hello, I would like information about private events at Quartier Barcelona.',
      imageAlt: 'Private booth at Quartier Barcelona',
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
      privateEvents: 'ÉVÉNEMENTS PRIVÉS',
      privateEventsShort: 'ÉVÉNEMENTS',
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
      imageAlt2: 'Groupe d’amis lors d’une nuit au Quartier Barcelona',
      imageAlt3: 'Invitée célébrant au Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'Quartier est aussi un lieu singulier pour vos événements privés, vos rendez-vous d’entreprise et vos grandes occasions à Pedralbes.',
      tagline: 'Un lieu. Une expérience. À votre mesure.',
      cta: 'DEMANDER DES INFORMATIONS',
      whatsappMessage: 'Bonjour, je souhaiterais des informations sur les événements privés au Quartier Barcelona.',
      imageAlt: 'Espace privatif du Quartier Barcelona',
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
      privateEvents: 'PRIVATE EVENTS',
      privateEventsShort: 'EVENTS',
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
      imageAlt2: 'Freundesgruppe an einem Abend im Quartier Barcelona',
      imageAlt3: 'Gast feiert im Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'Quartier ist auch ein besonderer Ort für private Feiern, Firmenevents und grosse Anlässe in Pedralbes.',
      tagline: 'Ein Raum. Ein Erlebnis. Ganz nach Ihnen.',
      cta: 'INFORMATIONEN ANFRAGEN',
      whatsappMessage: 'Hallo, ich hätte gerne Informationen zu privaten Events im Quartier Barcelona.',
      imageAlt: 'Privater Bereich im Quartier Barcelona',
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
