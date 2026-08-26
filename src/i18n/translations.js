/* -------------------------------------------------------------------------
 * Translations — ES / EN / FR / DE
 *
 * Every visible string on the site comes from here. To change copy, edit the
 * value in all four languages; nothing else needs touching.
 *
 * Headlines that are brand rather than copy — the hero slogan, "A NEW
 * CHAPTER", "OWN THE NIGHT", "VIP EXPERIENCE", "PRIVATE EVENTS", "Make it
 * yours." — stay in English in every language, deliberately.
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
      vipExperience: 'VIP EXPERIENCE',
      // Navbar only — five full labels overflow the bar on a narrow laptop.
      vipExperienceShort: 'VIP',
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
      breadcrumb: 'Estás aquí',
    },
    hero: {
      videoLabel: 'Vídeo ambiente de Quartier Barcelona',
      scroll: 'DESLIZA',
    },
    /* Headers of the three inner pages. `name` is the page's H1, `lead` the
       line under it, `sectionEyebrow` / `sectionTitle` the label the reused
       section below takes so it never repeats the H1 word for word. */
    pages: {
      eyebrow: 'QUARTIER BARCELONA',
      about: {
        name: 'SOBRE NOSOTROS',
        lead: 'Una nueva etapa de la noche de Barcelona.',
        sectionEyebrow: 'NUESTRA HISTORIA',
        imageAlt: 'Noche en la pista de Quartier Barcelona',
      },
      vip: {
        name: 'VIP EXPERIENCE',
        lead: 'La noche desde el mejor ángulo de la sala.',
        sectionEyebrow: 'MESAS Y RESERVADOS',
        imageAlt: 'Mesa VIP con botellas en Quartier Barcelona',
      },
      events: {
        name: 'PRIVATE EVENTS',
        lead: 'Un espacio único para celebrarlo a tu manera.',
        sectionTitle: 'TU EVENTO EN QUARTIER',
        imageAlt: 'Sala preparada para un evento privado en Quartier Barcelona',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The first entry is set as a lead; `closing` is the pull quote and
      // `coda` the paragraphs that follow it.
      body: [
        'Hay lugares a los que vas una noche. Y hay lugares que se convierten en parte de ella.',
        'Durante décadas, este lugar ha formado parte de la noche de Barcelona. Hoy, esa historia continúa bajo una nueva identidad.',
        'Quartier nace para llevar ese legado al presente: un espacio completamente renovado, un nuevo diseño y una nueva forma de vivir la noche. Un punto de encuentro donde la música, el diseño, la gente y la energía se unen para crear algo único.',
      ],
      closing: 'Una nueva etapa. Una nueva identidad. Una nueva generación.',
      coda: [
        'Aquí la música es solo el inicio. Cada noche está pensada para convertirse en una experiencia: desde quienes están detrás de la cabina hasta cada detalle del espacio y cada persona que lo hace posible.',
      ],
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Retrato en blanco y negro de una noche en Quartier Barcelona',
    },
    brand: {
      caption: 'LA NOCHE, A NUESTRA MANERA',
      imageAlt: 'Ambiente nocturno en la pista de Quartier Barcelona',
      imageAlt2: 'Grupo de amigos en una noche en Quartier Barcelona',
      imageAlt3: 'Invitada celebrando en Quartier Barcelona',
    },
    agenda: {
      eyebrow: 'AGENDA',
      title: 'PRÓXIMOS EVENTOS',
      lead: 'Las próximas noches en Quartier.',
      note: 'Aforo limitado. Acceso sujeto a admisión.',
      cta: 'VER TODA LA AGENDA',
      cardCta: 'TICKETS Y MESAS VIP',
      cardLabel: 'Tickets y mesas VIP',
    },
    explore: {
      eyebrow: 'DESCUBRE',
      title: 'EXPLORA QUARTIER',
      titleAlt: 'SIGUE EXPLORANDO',
      more: 'VER MÁS',
      about: 'La historia del espacio y la identidad que la continúa.',
      vip: 'Mesas, reservados y servicio dedicado.',
      events: 'Eventos privados, corporativos y celebraciones.',
      aboutImageAlt: 'Retrato de una noche en Quartier Barcelona',
      vipImageAlt: 'Botellas servidas en una mesa VIP de Quartier Barcelona',
      eventsImageAlt: 'Reservado de Quartier Barcelona',
    },
    vipExperience: {
      eyebrow: 'VIP EXPERIENCE',
      // English headline, like the hero slogan and the About / Private Events
      // titles — brand voice, not copy to translate.
      title: 'OWN THE NIGHT',
      body:
        'Reserva tu mesa en la mejor zona de la sala y vive la noche desde dentro. Servicio dedicado, botella en mesa y el mejor ángulo de Quartier.',
      note: 'Mesas limitadas y sujetas a disponibilidad.',
      imageAlt: 'Grupo de amigos celebrando en una mesa VIP de Quartier Barcelona',
      imageAlt2: 'Botellas con luces de bengala servidas en la pista de Quartier Barcelona',
      // Only rendered on /vip-experience — the detail list under the pitch.
      detailsTitle: 'QUÉ INCLUYE',
      details: [
        { title: 'MESA EN ZONA PREFERENTE', body: 'Tu espacio reservado en la mejor zona de la sala, con vista directa a la pista y a la cabina.' },
        { title: 'SERVICIO DEDICADO', body: 'Un equipo pendiente de tu mesa toda la noche, para que no tengas que moverte de ella.' },
        { title: 'BOTELLA EN MESA', body: 'Carta de destilados y champagne servida en mesa, con la presentación que la noche merece.' },
        { title: 'ACCESO PRIORITARIO', body: 'Entrada directa para tu grupo, sin cola, a la hora que hayas reservado.' },
      ],
    },
    nightStack: {
      caption: 'LA NOCHE EN QUARTIER',
      imageAlt: 'Amigos sonriendo en una noche en Quartier Barcelona',
      imageAlt2: 'Grupo celebrando juntos en Quartier Barcelona',
      imageAlt3: 'Invitadas en la pista de Quartier Barcelona',
    },
    photoMarquee: {
      caption: 'AMBIENTE QUARTIER',
      imageAlt: 'Ambiente de fiesta en Quartier Barcelona',
      imageAlt2: 'Invitados en una noche en Quartier Barcelona',
      imageAlt3: 'Pista y público en Quartier Barcelona',
      imageAlt4: 'Celebración en Quartier Barcelona',
      imageAlt5: 'Noche en la sala de Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      // Headline stays English in every language, like the hero slogan and the
      // About title — it is brand, not copy.
      title: 'Make it yours.',
      body:
        'Un espacio único para eventos privados, corporativos y celebraciones en Pedralbes.',
      tagline: 'Un espacio. Una experiencia. A tu medida.',
      cta: 'SOLICITAR INFORMACIÓN',
      whatsappMessage: 'Hola, me gustaría recibir información sobre eventos privados en Quartier Barcelona.',
      imageAlt: 'Reservado de Quartier Barcelona',
      // Only rendered on /private-events.
      formatsTitle: 'FORMATOS',
      formats: [
        { title: 'EVENTOS CORPORATIVOS', body: 'Presentaciones, cenas de empresa y fiestas de fin de año en un espacio que no parece una sala de eventos.' },
        { title: 'CELEBRACIONES PRIVADAS', body: 'Cumpleaños, aniversarios y fiestas privadas con la sala entera o la zona que necesites.' },
        { title: 'LANZAMIENTOS Y MARCAS', body: 'Presentaciones de producto y activaciones de marca, con la iluminación y el sonido del club.' },
      ],
      infoTitle: 'CÓMO FUNCIONA',
      info: [
        { label: 'AFORO', value: 'Sala completa o por zonas, según el formato.' },
        { label: 'HORARIOS', value: 'Tarde y noche, entre semana y fines de semana.' },
        { label: 'PRODUCCIÓN', value: 'Sonido, iluminación y equipo del club incluidos.' },
        { label: 'RESERVA', value: 'Escríbenos y preparamos una propuesta a medida.' },
      ],
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
      partners: 'PARTNERS',
      instagram: 'Instagram de Quartier Barcelona',
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
      vipExperience: 'VIP EXPERIENCE',
      vipExperienceShort: 'VIP',
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
      breadcrumb: 'You are here',
    },
    hero: {
      videoLabel: 'Quartier Barcelona atmosphere video',
      scroll: 'SCROLL',
    },
    pages: {
      eyebrow: 'QUARTIER BARCELONA',
      about: {
        name: 'ABOUT US',
        lead: 'A new chapter in the nights of Barcelona.',
        sectionEyebrow: 'OUR STORY',
        imageAlt: 'Night on the Quartier Barcelona dancefloor',
      },
      vip: {
        name: 'VIP EXPERIENCE',
        lead: 'The night from the best angle in the room.',
        sectionEyebrow: 'TABLES & BOOTHS',
        imageAlt: 'VIP table with bottle service at Quartier Barcelona',
      },
      events: {
        name: 'PRIVATE EVENTS',
        lead: 'A singular space to celebrate your way.',
        sectionTitle: 'YOUR EVENT AT QUARTIER',
        imageAlt: 'The room set up for a private event at Quartier Barcelona',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        'There are places you go to for a night. And there are places that become part of it.',
        'For decades, this place has been part of the nights of Barcelona. Today that story continues under a new identity.',
        'Quartier exists to carry that legacy into the present: a completely renovated space, a new design and a new way of living the night. A meeting point where music, design, people and energy come together to create something singular.',
      ],
      closing: 'A new chapter. A new identity. A new generation.',
      coda: [
        'Here the music is only the beginning. Every night is built to become an experience: from whoever is behind the booth to every detail of the space and every person who makes it possible.',
      ],
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Black and white portrait of a night at Quartier Barcelona',
    },
    brand: {
      caption: 'THE NIGHT, OUR WAY',
      imageAlt: 'Night atmosphere on the Quartier Barcelona dancefloor',
      imageAlt2: 'Friends together on a night at Quartier Barcelona',
      imageAlt3: 'Guest celebrating at Quartier Barcelona',
    },
    agenda: {
      eyebrow: 'WHAT’S ON',
      title: 'UPCOMING EVENTS',
      lead: 'The next nights at Quartier.',
      note: 'Limited capacity. Admission at the door’s discretion.',
      cta: 'SEE THE FULL CALENDAR',
      cardCta: 'TICKETS & VIP TABLES',
      cardLabel: 'Tickets and VIP tables',
    },
    explore: {
      eyebrow: 'DISCOVER',
      title: 'EXPLORE QUARTIER',
      titleAlt: 'KEEP EXPLORING',
      more: 'SEE MORE',
      about: 'The story of the space and the identity that carries it on.',
      vip: 'Tables, booths and dedicated service.',
      events: 'Private events, corporate occasions and celebrations.',
      aboutImageAlt: 'Portrait of a night at Quartier Barcelona',
      vipImageAlt: 'Bottle service at a VIP table at Quartier Barcelona',
      eventsImageAlt: 'Private booth at Quartier Barcelona',
    },
    vipExperience: {
      eyebrow: 'VIP EXPERIENCE',
      title: 'OWN THE NIGHT',
      body:
        'Book your table in the best part of the room and take the night from the inside. Dedicated service, bottle service and the best view of Quartier.',
      note: 'Tables are limited and subject to availability.',
      imageAlt: 'Friends celebrating at a VIP table at Quartier Barcelona',
      imageAlt2: 'Bottle service with sparklers on the Quartier Barcelona dancefloor',
      detailsTitle: 'WHAT IS INCLUDED',
      details: [
        { title: 'TABLE IN THE BEST AREA', body: 'Your own reserved space in the best part of the room, facing the dancefloor and the booth.' },
        { title: 'DEDICATED SERVICE', body: 'A team looking after your table all night, so you never have to leave it.' },
        { title: 'BOTTLE SERVICE', body: 'A spirits and champagne list served at the table, presented the way the night deserves.' },
        { title: 'PRIORITY ACCESS', body: 'Straight in for your group, no queue, at the time you booked.' },
      ],
    },
    nightStack: {
      caption: 'THE NIGHT AT QUARTIER',
      imageAlt: 'Friends smiling on a night at Quartier Barcelona',
      imageAlt2: 'Group celebrating together at Quartier Barcelona',
      imageAlt3: 'Guests on the Quartier Barcelona dancefloor',
    },
    photoMarquee: {
      caption: 'QUARTIER ATMOSPHERE',
      imageAlt: 'Party atmosphere at Quartier Barcelona',
      imageAlt2: 'Guests on a night at Quartier Barcelona',
      imageAlt3: 'Dancefloor and crowd at Quartier Barcelona',
      imageAlt4: 'Celebration at Quartier Barcelona',
      imageAlt5: 'Night in the Quartier Barcelona room',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'A singular space for private events, corporate occasions and celebrations in Pedralbes.',
      tagline: 'One space. One experience. Made yours.',
      cta: 'REQUEST INFORMATION',
      whatsappMessage: 'Hello, I would like information about private events at Quartier Barcelona.',
      imageAlt: 'Private booth at Quartier Barcelona',
      formatsTitle: 'FORMATS',
      formats: [
        { title: 'CORPORATE EVENTS', body: 'Presentations, company dinners and end-of-year parties in a space that looks nothing like a function room.' },
        { title: 'PRIVATE CELEBRATIONS', body: 'Birthdays, anniversaries and private parties, in the whole room or the area you need.' },
        { title: 'LAUNCHES & BRANDS', body: 'Product presentations and brand activations, with the club’s own lighting and sound.' },
      ],
      infoTitle: 'HOW IT WORKS',
      info: [
        { label: 'CAPACITY', value: 'The full room or by area, depending on the format.' },
        { label: 'TIMES', value: 'Evening and night, weekdays and weekends.' },
        { label: 'PRODUCTION', value: 'Sound, lighting and the club’s own team included.' },
        { label: 'BOOKING', value: 'Write to us and we will put together a tailored proposal.' },
      ],
    },
    contact: {
      eyebrow: 'LET’S TALK',
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
      partners: 'PARTNERS',
      instagram: 'Quartier Barcelona on Instagram',
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
      vipExperience: 'VIP EXPERIENCE',
      vipExperienceShort: 'VIP',
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
      breadcrumb: 'Vous êtes ici',
    },
    hero: {
      videoLabel: 'Vidéo d’ambiance de Quartier Barcelona',
      scroll: 'FAITES DÉFILER',
    },
    pages: {
      eyebrow: 'QUARTIER BARCELONA',
      about: {
        name: 'À PROPOS',
        lead: 'Une nouvelle étape des nuits de Barcelone.',
        sectionEyebrow: 'NOTRE HISTOIRE',
        imageAlt: 'Nuit sur la piste du Quartier Barcelona',
      },
      vip: {
        name: 'VIP EXPERIENCE',
        lead: 'La nuit depuis le plus bel angle de la salle.',
        sectionEyebrow: 'TABLES ET CARRÉS VIP',
        imageAlt: 'Table VIP avec service de bouteilles au Quartier Barcelona',
      },
      events: {
        name: 'PRIVATE EVENTS',
        lead: 'Un lieu singulier pour célébrer à votre façon.',
        sectionTitle: 'VOTRE ÉVÉNEMENT AU QUARTIER',
        imageAlt: 'Salle préparée pour un événement privé au Quartier Barcelona',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        'Il y a des lieux où l’on va le temps d’une nuit. Et il y a des lieux qui en deviennent une partie.',
        'Pendant des décennies, ce lieu a fait partie des nuits de Barcelone. Aujourd’hui, cette histoire se poursuit sous une nouvelle identité.',
        'Quartier naît pour amener cet héritage jusqu’au présent : un espace entièrement rénové, un nouveau design et une nouvelle façon de vivre la nuit. Un point de rencontre où la musique, le design, les gens et l’énergie se réunissent pour créer quelque chose d’unique.',
      ],
      closing: 'Une nouvelle étape. Une nouvelle identité. Une nouvelle génération.',
      coda: [
        'Ici, la musique n’est qu’un début. Chaque nuit est pensée pour devenir une expérience : de celles et ceux qui sont derrière la cabine jusqu’au moindre détail du lieu et à chaque personne qui le rend possible.',
      ],
      caption: 'PEDRALBES · BARCELONE',
      imageAlt: 'Portrait en noir et blanc d’une nuit au Quartier Barcelona',
    },
    brand: {
      caption: 'LA NUIT, À NOTRE FAÇON',
      imageAlt: 'Ambiance nocturne sur la piste du Quartier Barcelona',
      imageAlt2: 'Groupe d’amis lors d’une nuit au Quartier Barcelona',
      imageAlt3: 'Invitée célébrant au Quartier Barcelona',
    },
    agenda: {
      eyebrow: 'AGENDA',
      title: 'PROCHAINS ÉVÉNEMENTS',
      lead: 'Les prochaines nuits au Quartier.',
      note: 'Capacité limitée. Accès soumis à l’admission.',
      cta: 'VOIR TOUT L’AGENDA',
      cardCta: 'TICKETS ET TABLES VIP',
      cardLabel: 'Tickets et tables VIP',
    },
    explore: {
      eyebrow: 'DÉCOUVRIR',
      title: 'EXPLOREZ QUARTIER',
      titleAlt: 'CONTINUEZ À EXPLORER',
      more: 'VOIR PLUS',
      about: 'L’histoire du lieu et l’identité qui la poursuit.',
      vip: 'Tables, carrés VIP et service dédié.',
      events: 'Événements privés, professionnels et célébrations.',
      aboutImageAlt: 'Portrait d’une nuit au Quartier Barcelona',
      vipImageAlt: 'Service de bouteilles à une table VIP du Quartier Barcelona',
      eventsImageAlt: 'Espace privatif du Quartier Barcelona',
    },
    vipExperience: {
      eyebrow: 'VIP EXPERIENCE',
      title: 'OWN THE NIGHT',
      body:
        'Réservez votre table dans le meilleur coin de la salle et vivez la nuit de l’intérieur. Service dédié, bouteilles en table et le plus bel angle du Quartier.',
      note: 'Tables en nombre limité, selon disponibilité.',
      imageAlt: 'Des amis qui font la fête à une table VIP du Quartier Barcelona',
      imageAlt2: 'Service de bouteilles avec cierges magiques sur la piste du Quartier Barcelona',
      detailsTitle: 'CE QUI EST INCLUS',
      details: [
        { title: 'TABLE EN ZONE PRIVILÉGIÉE', body: 'Votre espace réservé dans le meilleur coin de la salle, face à la piste et à la cabine.' },
        { title: 'SERVICE DÉDIÉ', body: 'Une équipe attentive à votre table toute la nuit, pour ne jamais avoir à la quitter.' },
        { title: 'BOUTEILLES EN TABLE', body: 'Une carte de spiritueux et de champagnes servie en table, avec la présentation que la nuit mérite.' },
        { title: 'ACCÈS PRIORITAIRE', body: 'Entrée directe pour votre groupe, sans file, à l’heure réservée.' },
      ],
    },
    nightStack: {
      caption: 'LA NUIT AU QUARTIER',
      imageAlt: 'Des amis qui sourient lors d’une nuit au Quartier Barcelona',
      imageAlt2: 'Groupe qui célèbre ensemble au Quartier Barcelona',
      imageAlt3: 'Invitées sur la piste du Quartier Barcelona',
    },
    photoMarquee: {
      caption: 'AMBIANCE QUARTIER',
      imageAlt: 'Ambiance de fête au Quartier Barcelona',
      imageAlt2: 'Invités lors d’une nuit au Quartier Barcelona',
      imageAlt3: 'Piste et public au Quartier Barcelona',
      imageAlt4: 'Célébration au Quartier Barcelona',
      imageAlt5: 'Nuit dans la salle du Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'Un lieu singulier pour vos événements privés, vos rendez-vous d’entreprise et vos célébrations à Pedralbes.',
      tagline: 'Un lieu. Une expérience. À votre mesure.',
      cta: 'DEMANDER DES INFORMATIONS',
      whatsappMessage: 'Bonjour, je souhaiterais des informations sur les événements privés au Quartier Barcelona.',
      imageAlt: 'Espace privatif du Quartier Barcelona',
      formatsTitle: 'FORMATS',
      formats: [
        { title: 'ÉVÉNEMENTS D’ENTREPRISE', body: 'Présentations, dîners d’entreprise et fêtes de fin d’année dans un lieu qui ne ressemble en rien à une salle de séminaire.' },
        { title: 'CÉLÉBRATIONS PRIVÉES', body: 'Anniversaires et fêtes privées, dans la salle entière ou dans l’espace dont vous avez besoin.' },
        { title: 'LANCEMENTS ET MARQUES', body: 'Présentations de produit et activations de marque, avec la lumière et le son du club.' },
      ],
      infoTitle: 'COMMENT ÇA MARCHE',
      info: [
        { label: 'CAPACITÉ', value: 'Salle entière ou par zones, selon le format.' },
        { label: 'HORAIRES', value: 'Soirée et nuit, en semaine comme le week-end.' },
        { label: 'PRODUCTION', value: 'Son, lumière et équipe du club inclus.' },
        { label: 'RÉSERVATION', value: 'Écrivez-nous et nous préparons une proposition sur mesure.' },
      ],
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
      partners: 'PARTENAIRES',
      instagram: 'Quartier Barcelona sur Instagram',
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
      vipExperience: 'VIP EXPERIENCE',
      vipExperienceShort: 'VIP',
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
      breadcrumb: 'Sie sind hier',
    },
    hero: {
      videoLabel: 'Atmosphäre-Video von Quartier Barcelona',
      scroll: 'SCROLLEN',
    },
    pages: {
      eyebrow: 'QUARTIER BARCELONA',
      about: {
        name: 'ÜBER UNS',
        lead: 'Ein neues Kapitel der Nächte Barcelonas.',
        sectionEyebrow: 'UNSERE GESCHICHTE',
        imageAlt: 'Nacht auf der Tanzfläche des Quartier Barcelona',
      },
      vip: {
        name: 'VIP EXPERIENCE',
        lead: 'Die Nacht vom besten Platz im Saal aus.',
        sectionEyebrow: 'TISCHE UND LOUNGES',
        imageAlt: 'VIP-Tisch mit Flaschenservice im Quartier Barcelona',
      },
      events: {
        name: 'PRIVATE EVENTS',
        lead: 'Ein besonderer Ort, um auf Ihre Art zu feiern.',
        sectionTitle: 'IHR EVENT IM QUARTIER',
        imageAlt: 'Für ein privates Event vorbereiteter Saal im Quartier Barcelona',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      body: [
        'Es gibt Orte, an die man für eine Nacht geht. Und es gibt Orte, die zu einem Teil von ihr werden.',
        'Jahrzehntelang war dieser Ort Teil der Nächte Barcelonas. Heute wird diese Geschichte unter einer neuen Identität fortgeschrieben.',
        'Quartier bringt dieses Erbe in die Gegenwart: ein vollständig erneuerter Raum, ein neues Design und eine neue Art, die Nacht zu erleben. Ein Treffpunkt, an dem Musik, Design, Menschen und Energie zusammenkommen und etwas Einzigartiges entsteht.',
      ],
      closing: 'Ein neues Kapitel. Eine neue Identität. Eine neue Generation.',
      coda: [
        'Hier ist die Musik nur der Anfang. Jede Nacht ist darauf angelegt, ein Erlebnis zu werden: von allen hinter dem Pult bis zu jedem Detail des Raums und jeder Person, die ihn möglich macht.',
      ],
      caption: 'PEDRALBES · BARCELONA',
      imageAlt: 'Schwarzweiß-Porträt einer Nacht im Quartier Barcelona',
    },
    brand: {
      caption: 'DIE NACHT, AUF UNSERE ART',
      imageAlt: 'Nachtatmosphäre auf der Tanzfläche des Quartier Barcelona',
      imageAlt2: 'Freundesgruppe an einem Abend im Quartier Barcelona',
      imageAlt3: 'Gast feiert im Quartier Barcelona',
    },
    agenda: {
      eyebrow: 'PROGRAMM',
      title: 'KOMMENDE EVENTS',
      lead: 'Die nächsten Nächte im Quartier.',
      note: 'Begrenzte Kapazität. Einlass nach Ermessen.',
      cta: 'GESAMTES PROGRAMM ANSEHEN',
      cardCta: 'TICKETS UND VIP-TISCHE',
      cardLabel: 'Tickets und VIP-Tische',
    },
    explore: {
      eyebrow: 'ENTDECKEN',
      title: 'QUARTIER ENTDECKEN',
      titleAlt: 'WEITER ENTDECKEN',
      more: 'MEHR SEHEN',
      about: 'Die Geschichte des Ortes und die Identität, die sie fortschreibt.',
      vip: 'Tische, Lounges und eigener Service.',
      events: 'Private Events, Firmenfeiern und Feierlichkeiten.',
      aboutImageAlt: 'Porträt einer Nacht im Quartier Barcelona',
      vipImageAlt: 'Flaschenservice an einem VIP-Tisch im Quartier Barcelona',
      eventsImageAlt: 'Privater Bereich im Quartier Barcelona',
    },
    vipExperience: {
      eyebrow: 'VIP EXPERIENCE',
      title: 'OWN THE NIGHT',
      body:
        'Reservieren Sie Ihren Tisch im besten Bereich des Clubs und erleben Sie die Nacht von innen. Eigener Service, Flaschenservice und der beste Blick über Quartier.',
      note: 'Begrenzte Tischanzahl, nach Verfügbarkeit.',
      imageAlt: 'Freunde feiern an einem VIP-Tisch im Quartier Barcelona',
      imageAlt2: 'Flaschenservice mit Wunderkerzen auf der Tanzfläche des Quartier Barcelona',
      detailsTitle: 'WAS ENTHALTEN IST',
      details: [
        { title: 'TISCH IM BESTEN BEREICH', body: 'Ihr reservierter Platz im besten Bereich des Saals, mit direktem Blick auf Tanzfläche und Pult.' },
        { title: 'EIGENER SERVICE', body: 'Ein Team, das sich die ganze Nacht um Ihren Tisch kümmert, damit Sie ihn nie verlassen müssen.' },
        { title: 'FLASCHENSERVICE', body: 'Spirituosen- und Champagnerkarte am Tisch serviert, mit der Präsentation, die die Nacht verdient.' },
        { title: 'BEVORZUGTER EINLASS', body: 'Direkter Eintritt für Ihre Gruppe, ohne Schlange, zur reservierten Zeit.' },
      ],
    },
    nightStack: {
      caption: 'DIE NACHT IM QUARTIER',
      imageAlt: 'Freunde lächeln an einem Abend im Quartier Barcelona',
      imageAlt2: 'Gruppe feiert gemeinsam im Quartier Barcelona',
      imageAlt3: 'Gäste auf der Tanzfläche des Quartier Barcelona',
    },
    photoMarquee: {
      caption: 'QUARTIER ATMOSPHÄRE',
      imageAlt: 'Partyatmosphäre im Quartier Barcelona',
      imageAlt2: 'Gäste an einem Abend im Quartier Barcelona',
      imageAlt3: 'Tanzfläche und Publikum im Quartier Barcelona',
      imageAlt4: 'Feier im Quartier Barcelona',
      imageAlt5: 'Nacht im Saal des Quartier Barcelona',
    },
    privateEvents: {
      eyebrow: 'PRIVATE EVENTS',
      title: 'Make it yours.',
      body:
        'Ein besonderer Ort für private Feiern, Firmenevents und Feierlichkeiten in Pedralbes.',
      tagline: 'Ein Raum. Ein Erlebnis. Ganz nach Ihnen.',
      cta: 'INFORMATIONEN ANFRAGEN',
      whatsappMessage: 'Hallo, ich hätte gerne Informationen zu privaten Events im Quartier Barcelona.',
      imageAlt: 'Privater Bereich im Quartier Barcelona',
      formatsTitle: 'FORMATE',
      formats: [
        { title: 'FIRMENEVENTS', body: 'Präsentationen, Firmenessen und Jahresabschlussfeiern in einem Raum, der nach allem aussieht, nur nicht nach Veranstaltungssaal.' },
        { title: 'PRIVATE FEIERN', body: 'Geburtstage, Jubiläen und private Partys — im ganzen Saal oder in dem Bereich, den Sie brauchen.' },
        { title: 'LAUNCHES UND MARKEN', body: 'Produktpräsentationen und Markenaktivierungen, mit Licht und Sound des Clubs.' },
      ],
      infoTitle: 'SO FUNKTIONIERT ES',
      info: [
        { label: 'KAPAZITÄT', value: 'Ganzer Saal oder nach Bereichen, je nach Format.' },
        { label: 'ZEITEN', value: 'Abend und Nacht, unter der Woche und am Wochenende.' },
        { label: 'PRODUKTION', value: 'Sound, Licht und das Team des Clubs inklusive.' },
        { label: 'BUCHUNG', value: 'Schreiben Sie uns und wir erstellen ein maßgeschneidertes Angebot.' },
      ],
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
      partners: 'PARTNER',
      instagram: 'Quartier Barcelona auf Instagram',
    },
  },
}
