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
      privacy: {
        name: 'POLÍTICA DE PRIVACIDAD',
        lead: 'Cómo se tratan los datos personales en este sitio web.',
      },
      legal: {
        name: 'AVISO LEGAL',
        lead: 'Titularidad, condiciones de uso y responsabilidad de este sitio web.',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The short cut of `body`, for the Intro block on the home page.
      intro:
        'Durante décadas, este lugar ha formado parte de la noche de Barcelona. Hoy esa historia continúa bajo una nueva identidad: un espacio completamente renovado donde la música, el diseño y la gente se encuentran para crear algo único.',
      // The first entry is set as a lead; `closing` is the pull quote and
      // `coda` the paragraphs that follow it.
      body: [
        'Hay lugares a los que vas una noche. Y hay lugares que se convierten en parte de ella.',
        'Durante décadas, este lugar ha formado parte de la noche de Barcelona. Hoy, esa historia continúa bajo una nueva identidad.',
        'Quartier nace para llevar ese legado al presente: un espacio completamente renovado, un nuevo diseño y una nueva forma de vivir la noche. Un punto de encuentro donde la música, el diseño, la gente y la energía se unen para crear algo único.',
      ],
      closing: 'Porque salir es solo el principio.',
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
    /* -------------------------------------------------------------------
     * The two legal documents.
     *
     * `blocks` is the entire document model: a string is a paragraph, an
     * array of strings is a bullet list. That is enough for both texts and
     * keeps the copy readable here rather than buried in JSX.
     *
     * Nothing about the company is written in this file. {company}, {nif},
     * {address}, {email} and {phone} are filled in from src/config/site.js
     * when the page renders, so four languages can never end up disagreeing
     * about a tax number.
     * ---------------------------------------------------------------- */
    legal: {
      updatedLabel: 'ÚLTIMA ACTUALIZACIÓN',
      holderLabel: 'TITULAR',
      nifLabel: 'NIF / CIF',
      addressLabel: 'DOMICILIO',
      emailLabel: 'CONTACTO',
      indexLabel: 'CONTENIDO',
      privacy: {
        intro:
          'La presente Política de Privacidad regula el tratamiento de los datos personales realizado a través de este sitio web, de conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (Reglamento General de Protección de Datos — RGPD), la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), y la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
        sections: [
          {
            title: 'Responsable del tratamiento',
            blocks: [
              'El responsable del tratamiento de los datos personales recogidos a través de este sitio web es {company}, con NIF/CIF {nif} y domicilio en {address}.',
              'Para cualquier cuestión relacionada con la protección de datos puede escribir a {email}.',
            ],
          },
          {
            title: 'Finalidad del tratamiento',
            blocks: [
              'Este sitio web tiene como finalidad:',
              [
                'Informar sobre los eventos organizados por el titular.',
                'Facilitar el acceso a la plataforma de venta de entradas.',
                'Atender las consultas realizadas por los usuarios mediante correo electrónico, teléfono o WhatsApp.',
                'Obtener estadísticas agregadas sobre el uso del sitio web para mejorar la experiencia de navegación.',
              ],
            ],
          },
          {
            title: 'Datos tratados',
            blocks: [
              'El titular no solicita el registro de usuarios ni recoge datos personales mediante formularios propios.',
              'Cuando un usuario contacta mediante correo electrónico, teléfono o WhatsApp, los datos facilitados se utilizan únicamente para responder a su consulta.',
              'Asimismo, durante la navegación pueden recopilarse determinados datos técnicos y estadísticos necesarios para el funcionamiento y el análisis del sitio web.',
            ],
          },
          {
            title: 'Base jurídica',
            blocks: [
              'Las bases legales del tratamiento son:',
              [
                'El interés legítimo del responsable para mantener la seguridad y el funcionamiento del sitio web y conocer su uso mediante estadísticas agregadas.',
                'El consentimiento del usuario al contactar voluntariamente mediante correo electrónico, teléfono o WhatsApp.',
                'La ejecución de la relación contractual entre el usuario y Fourvenues cuando éste accede al proceso de compra de entradas.',
              ],
            ],
          },
          {
            title: 'Venta de entradas',
            blocks: [
              'La compra de entradas se realiza mediante la plataforma Fourvenues.',
              'Cuando el usuario inicia el proceso de compra, los datos personales son tratados directamente por dicha plataforma conforme a sus propias condiciones legales y políticas de privacidad.',
              'El titular del presente sitio web no interviene en el tratamiento de los datos personales necesarios para la compra de entradas, salvo aquellos que puedan serle comunicados posteriormente en el marco de la organización del evento.',
            ],
          },
          {
            title: 'Analítica y servicios de terceros',
            blocks: [
              'Este sitio utiliza Vercel Analytics con la finalidad de obtener estadísticas de uso, mejorar el rendimiento del sitio web y conocer de forma agregada la interacción de los usuarios. Este servicio no emplea cookies publicitarias ni identifica individualmente a los visitantes.',
              'Además, al cargar determinadas partes del sitio se realizan peticiones a los siguientes proveedores, que pueden registrar la dirección IP del visitante como parte del funcionamiento normal de sus servicios:',
              [
                'Vercel, como proveedor de alojamiento y de la analítica agregada.',
                'Fourvenues, cuando se abre la venta de entradas integrada en el sitio.',
                'OpenStreetMap y CARTO, que suministran las imágenes del mapa de la ubicación.',
              ],
            ],
          },
          {
            title: 'Conservación de los datos',
            blocks: [
              'Los datos recibidos mediante correo electrónico, teléfono o WhatsApp se conservan únicamente durante el tiempo necesario para atender la consulta o cumplir con las obligaciones legales que resulten aplicables.',
            ],
          },
          {
            title: 'Destinatarios',
            blocks: [
              'No se comunicarán datos personales a terceros salvo obligación legal o cuando resulte necesario para la prestación de los servicios solicitados por el usuario.',
            ],
          },
          {
            title: 'Derechos',
            blocks: [
              'Los usuarios pueden ejercer sus derechos de:',
              [
                'Acceso.',
                'Rectificación.',
                'Supresión.',
                'Oposición.',
                'Limitación del tratamiento.',
                'Portabilidad.',
              ],
              'Para ello podrán enviar una solicitud a {email}, indicando el derecho que desean ejercer.',
              'Asimismo, tienen derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si consideran que el tratamiento de sus datos no se ajusta a la normativa vigente.',
            ],
          },
          {
            title: 'Fotografías de eventos',
            blocks: [
              'En esta web pueden publicarse fotografías y vídeos correspondientes a eventos organizados por el titular.',
              'La asistencia a dichos eventos puede implicar la captación y utilización de imágenes con fines promocionales, informativos y publicitarios, conforme a las condiciones aceptadas por los asistentes durante la adquisición de entradas.',
              'Las personas que aparezcan en alguna imagen y consideren que la publicación afecta a sus derechos podrán solicitar su revisión o retirada escribiendo a {email}.',
            ],
          },
          {
            title: 'Modificaciones',
            blocks: [
              'El titular podrá modificar la presente Política de Privacidad para adaptarla a cambios legislativos o técnicos.',
              'La versión publicada en el sitio web será siempre la vigente.',
            ],
          },
        ],
      },
      notice: {
        intro:
          'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web y de las condiciones que rigen su uso.',
        sections: [
          {
            title: 'Titular del sitio web',
            blocks: [
              'El presente sitio web es titularidad de {company}, con NIF/CIF {nif} y domicilio en {address}.',
              'Correo electrónico de contacto: {email}. Teléfono: {phone}.',
            ],
          },
          {
            title: 'Objeto',
            blocks: [
              'El presente sitio web tiene como finalidad ofrecer información sobre los eventos organizados por el titular, facilitar la consulta de información relacionada con dichos eventos y permitir el acceso a la plataforma externa de venta de entradas.',
            ],
          },
          {
            title: 'Venta de entradas',
            blocks: [
              'La adquisición de entradas se realiza a través de la plataforma Fourvenues, integrada mediante enlaces o iframe.',
              'El proceso de compra, el tratamiento de los datos personales y las condiciones de contratación correspondientes son responsabilidad de Fourvenues, siendo de aplicación sus propias condiciones de uso y política de privacidad.',
            ],
          },
          {
            title: 'Propiedad intelectual',
            blocks: [
              'Todos los contenidos del sitio web, incluyendo textos, fotografías, vídeos, logotipos, diseño gráfico y demás elementos, son propiedad del titular o se utilizan con la correspondiente autorización.',
              'Queda prohibida su reproducción, distribución o utilización sin autorización previa, salvo en los casos permitidos por la legislación vigente.',
            ],
          },
          {
            title: 'Fotografías y material audiovisual',
            blocks: [
              'Las imágenes y vídeos publicados en esta web corresponden a eventos organizados por el titular.',
              'La asistencia a dichos eventos puede implicar la captación y utilización de imágenes con fines informativos, promocionales y publicitarios, de acuerdo con las condiciones aceptadas por los asistentes durante el proceso de adquisición de entradas y con la normativa vigente.',
              'Cualquier persona que considere que una imagen publicada afecta a sus derechos podrá solicitar su revisión o retirada escribiendo a {email}.',
            ],
          },
          {
            title: 'Responsabilidad',
            blocks: [
              'El titular no garantiza la ausencia de errores en los contenidos publicados, aunque adoptará las medidas razonables para corregirlos cuando sean detectados.',
              'Tampoco será responsable de la disponibilidad, funcionamiento o contenido de los servicios prestados por terceros a los que pueda accederse mediante enlaces o integraciones presentes en este sitio web.',
            ],
          },
          {
            title: 'Legislación aplicable',
            blocks: [
              'El presente Aviso Legal se rige por la legislación española.',
              'Para cualquier controversia derivada del uso del sitio web serán competentes los Juzgados y Tribunales que correspondan conforme a la normativa aplicable.',
            ],
          },
        ],
      },
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
      privacy: {
        name: 'PRIVACY POLICY',
        lead: 'How personal data is handled on this website.',
      },
      legal: {
        name: 'LEGAL NOTICE',
        lead: 'Ownership, terms of use and liability for this website.',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The short cut of `body`, for the Intro block on the home page.
      intro:
        'For decades, this place has been part of the nights of Barcelona. Today that story continues under a new identity: a completely renovated space where music, design and people come together to create something singular.',
      body: [
        'There are places you go to for a night. And there are places that become part of it.',
        'For decades, this place has been part of the nights of Barcelona. Today that story continues under a new identity.',
        'Quartier exists to carry that legacy into the present: a completely renovated space, a new design and a new way of living the night. A meeting point where music, design, people and energy come together to create something singular.',
      ],
      closing: 'Because going out is only the beginning.',
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
    legal: {
      updatedLabel: 'LAST UPDATED',
      holderLabel: 'OPERATOR',
      nifLabel: 'TAX ID',
      addressLabel: 'REGISTERED OFFICE',
      emailLabel: 'CONTACT',
      indexLabel: 'CONTENTS',
      /* The company is Spanish and the binding text is the Spanish one. Every
         translation says so rather than pretending to be the original. */
      prevail:
        'This is a translation provided for convenience. In the event of any discrepancy, the Spanish version of this text prevails.',
      privacy: {
        intro:
          'This Privacy Policy governs the processing of personal data carried out through this website, in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (General Data Protection Regulation — GDPR), Spanish Organic Law 3/2018 of 5 December on the Protection of Personal Data and the guarantee of digital rights (LOPDGDD), and Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE).',
        sections: [
          {
            title: 'Data controller',
            blocks: [
              'The controller of the personal data collected through this website is {company}, tax ID {nif}, with registered office at {address}.',
              'For any question relating to data protection you can write to {email}.',
            ],
          },
          {
            title: 'Purpose of the processing',
            blocks: [
              'The purpose of this website is to:',
              [
                'Provide information about the events organised by the operator.',
                'Give access to the ticketing platform.',
                'Answer enquiries sent by users via email, telephone or WhatsApp.',
                'Obtain aggregated statistics on the use of the website in order to improve the browsing experience.',
              ],
            ],
          },
          {
            title: 'Data processed',
            blocks: [
              'The operator does not ask users to register and does not collect personal data through forms of its own.',
              'When a user gets in touch by email, telephone or WhatsApp, the data provided is used solely to answer that enquiry.',
              'In addition, certain technical and statistical data required for the operation and analysis of the website may be collected while browsing.',
            ],
          },
          {
            title: 'Legal basis',
            blocks: [
              'The legal bases for the processing are:',
              [
                'The legitimate interest of the controller in maintaining the security and operation of the website and understanding its use through aggregated statistics.',
                'The consent of the user when voluntarily getting in touch by email, telephone or WhatsApp.',
                'The performance of the contractual relationship between the user and Fourvenues when the user enters the ticket purchase process.',
              ],
            ],
          },
          {
            title: 'Ticket sales',
            blocks: [
              'Tickets are purchased through the Fourvenues platform.',
              'Once the user starts the purchase process, personal data is processed directly by that platform under its own terms and privacy policy.',
              'The operator of this website does not take part in the processing of the personal data required to buy a ticket, other than any data subsequently passed on to it in the course of organising the event.',
            ],
          },
          {
            title: 'Analytics and third-party services',
            blocks: [
              'This site uses Vercel Analytics to obtain usage statistics, improve the performance of the website and understand visitor interaction in aggregate. The service does not use advertising cookies and does not identify individual visitors.',
              'Loading certain parts of the site also makes requests to the following providers, which may log the visitor’s IP address as part of the normal operation of their services:',
              [
                'Vercel, as hosting provider and provider of the aggregated analytics.',
                'Fourvenues, when the ticketing embedded in the site is opened.',
                'OpenStreetMap and CARTO, which supply the imagery for the location map.',
              ],
            ],
          },
          {
            title: 'Data retention',
            blocks: [
              'Data received by email, telephone or WhatsApp is kept only for as long as is necessary to deal with the enquiry or to comply with any applicable legal obligation.',
            ],
          },
          {
            title: 'Recipients',
            blocks: [
              'Personal data will not be disclosed to third parties except where required by law or where necessary to provide the services requested by the user.',
            ],
          },
          {
            title: 'Your rights',
            blocks: [
              'Users may exercise their rights of:',
              [
                'Access.',
                'Rectification.',
                'Erasure.',
                'Objection.',
                'Restriction of processing.',
                'Portability.',
              ],
              'To do so, send a request to {email} stating which right you wish to exercise.',
              'Users also have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es) if they believe that the processing of their data does not comply with the applicable regulations.',
            ],
          },
          {
            title: 'Event photography',
            blocks: [
              'Photographs and videos of events organised by the operator may be published on this website.',
              'Attending those events may involve images being captured and used for promotional, informational and advertising purposes, in accordance with the conditions accepted by attendees when purchasing tickets.',
              'Anyone appearing in an image who believes its publication affects their rights may request that it be reviewed or removed by writing to {email}.',
            ],
          },
          {
            title: 'Changes',
            blocks: [
              'The operator may amend this Privacy Policy to reflect legislative or technical changes.',
              'The version published on the website is always the version in force.',
            ],
          },
        ],
      },
      notice: {
        intro:
          'In compliance with Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the identifying details of the operator of this website and the terms governing its use are set out below.',
        sections: [
          {
            title: 'Website operator',
            blocks: [
              'This website is owned by {company}, tax ID {nif}, with registered office at {address}.',
              'Contact email: {email}. Telephone: {phone}.',
            ],
          },
          {
            title: 'Purpose',
            blocks: [
              'The purpose of this website is to provide information about the events organised by the operator, to make information related to those events available, and to give access to the external ticketing platform.',
            ],
          },
          {
            title: 'Ticket sales',
            blocks: [
              'Tickets are purchased through the Fourvenues platform, integrated by means of links or an iframe.',
              'The purchase process, the processing of personal data and the corresponding contractual terms are the responsibility of Fourvenues, and its own terms of use and privacy policy apply.',
            ],
          },
          {
            title: 'Intellectual property',
            blocks: [
              'All content on the website — including text, photographs, videos, logos, graphic design and any other element — belongs to the operator or is used under the corresponding licence.',
              'Reproduction, distribution or use without prior authorisation is prohibited, except in the cases permitted by the applicable legislation.',
            ],
          },
          {
            title: 'Photographs and audiovisual material',
            blocks: [
              'The images and videos published on this website relate to events organised by the operator.',
              'Attending those events may involve images being captured and used for informational, promotional and advertising purposes, in accordance with the conditions accepted by attendees during the ticket purchase process and with the applicable regulations.',
              'Anyone who believes that a published image affects their rights may request that it be reviewed or removed by writing to {email}.',
            ],
          },
          {
            title: 'Liability',
            blocks: [
              'The operator does not guarantee that the published content is free of errors, but will take reasonable steps to correct them once detected.',
              'Nor is the operator responsible for the availability, operation or content of services provided by third parties that may be reached through links or integrations present on this website.',
            ],
          },
          {
            title: 'Governing law',
            blocks: [
              'This Legal Notice is governed by Spanish law.',
              'Any dispute arising from the use of the website shall be settled by the courts and tribunals designated under the applicable regulations.',
            ],
          },
        ],
      },
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
      privacy: {
        name: 'POLITIQUE DE CONFIDENTIALITÉ',
        lead: 'Comment les données personnelles sont traitées sur ce site.',
      },
      legal: {
        name: 'MENTIONS LÉGALES',
        lead: 'Éditeur, conditions d’utilisation et responsabilité de ce site.',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The short cut of `body`, for the Intro block on the home page.
      intro:
        'Pendant des décennies, ce lieu a fait partie des nuits de Barcelone. Aujourd’hui, cette histoire se poursuit sous une nouvelle identité : un espace entièrement rénové où la musique, le design et les gens se réunissent pour créer quelque chose d’unique.',
      body: [
        'Il y a des lieux où l’on va le temps d’une nuit. Et il y a des lieux qui en deviennent une partie.',
        'Pendant des décennies, ce lieu a fait partie des nuits de Barcelone. Aujourd’hui, cette histoire se poursuit sous une nouvelle identité.',
        'Quartier naît pour amener cet héritage jusqu’au présent : un espace entièrement rénové, un nouveau design et une nouvelle façon de vivre la nuit. Un point de rencontre où la musique, le design, les gens et l’énergie se réunissent pour créer quelque chose d’unique.',
      ],
      closing: "Parce que sortir n'est que le commencement.",
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
    legal: {
      updatedLabel: 'DERNIÈRE MISE À JOUR',
      holderLabel: 'ÉDITEUR',
      nifLabel: 'NIF / CIF',
      addressLabel: 'SIÈGE SOCIAL',
      emailLabel: 'CONTACT',
      indexLabel: 'SOMMAIRE',
      prevail:
        'Traduction fournie à titre indicatif. En cas de divergence, la version espagnole de ce texte prévaut.',
      privacy: {
        intro:
          'La présente Politique de Confidentialité régit le traitement des données personnelles effectué via ce site web, conformément au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (Règlement général sur la protection des données — RGPD), à la Loi organique espagnole 3/2018 du 5 décembre relative à la protection des données personnelles et à la garantie des droits numériques (LOPDGDD) et à la Loi espagnole 34/2002 du 11 juillet relative aux services de la société de l’information et au commerce électronique (LSSI-CE).',
        sections: [
          {
            title: 'Responsable du traitement',
            blocks: [
              'Le responsable du traitement des données personnelles collectées via ce site web est {company}, NIF/CIF {nif}, dont le siège social est situé {address}.',
              'Pour toute question relative à la protection des données, vous pouvez écrire à {email}.',
            ],
          },
          {
            title: 'Finalité du traitement',
            blocks: [
              'Ce site web a pour finalité de :',
              [
                'Informer sur les événements organisés par l’éditeur.',
                'Faciliter l’accès à la plateforme de billetterie.',
                'Répondre aux demandes des utilisateurs par e-mail, téléphone ou WhatsApp.',
                'Obtenir des statistiques agrégées sur l’utilisation du site afin d’améliorer l’expérience de navigation.',
              ],
            ],
          },
          {
            title: 'Données traitées',
            blocks: [
              'L’éditeur ne demande pas la création de comptes et ne collecte pas de données personnelles au moyen de formulaires propres.',
              'Lorsqu’un utilisateur prend contact par e-mail, téléphone ou WhatsApp, les données communiquées sont utilisées uniquement pour répondre à sa demande.',
              'Par ailleurs, certaines données techniques et statistiques nécessaires au fonctionnement et à l’analyse du site peuvent être collectées pendant la navigation.',
            ],
          },
          {
            title: 'Base juridique',
            blocks: [
              'Les bases légales du traitement sont :',
              [
                'L’intérêt légitime du responsable à assurer la sécurité et le fonctionnement du site et à en connaître l’usage au moyen de statistiques agrégées.',
                'Le consentement de l’utilisateur lorsqu’il prend volontairement contact par e-mail, téléphone ou WhatsApp.',
                'L’exécution de la relation contractuelle entre l’utilisateur et Fourvenues lorsque celui-ci accède au processus d’achat de billets.',
              ],
            ],
          },
          {
            title: 'Billetterie',
            blocks: [
              'L’achat de billets s’effectue via la plateforme Fourvenues.',
              'Dès que l’utilisateur engage le processus d’achat, les données personnelles sont traitées directement par cette plateforme, selon ses propres conditions et sa politique de confidentialité.',
              'L’éditeur du présent site n’intervient pas dans le traitement des données personnelles nécessaires à l’achat de billets, à l’exception de celles qui peuvent lui être communiquées ensuite dans le cadre de l’organisation de l’événement.',
            ],
          },
          {
            title: 'Analyse d’audience et services tiers',
            blocks: [
              'Ce site utilise Vercel Analytics afin d’obtenir des statistiques d’utilisation, d’améliorer les performances du site et de connaître de manière agrégée l’interaction des visiteurs. Ce service n’utilise pas de cookies publicitaires et n’identifie pas individuellement les visiteurs.',
              'Le chargement de certaines parties du site entraîne également des requêtes vers les prestataires suivants, susceptibles d’enregistrer l’adresse IP du visiteur dans le cadre du fonctionnement normal de leurs services :',
              [
                'Vercel, hébergeur du site et fournisseur de l’analyse agrégée.',
                'Fourvenues, lorsque la billetterie intégrée au site est ouverte.',
                'OpenStreetMap et CARTO, qui fournissent les images de la carte de localisation.',
              ],
            ],
          },
          {
            title: 'Conservation des données',
            blocks: [
              'Les données reçues par e-mail, téléphone ou WhatsApp sont conservées uniquement pendant la durée nécessaire au traitement de la demande ou au respect des obligations légales applicables.',
            ],
          },
          {
            title: 'Destinataires',
            blocks: [
              'Aucune donnée personnelle n’est communiquée à des tiers, sauf obligation légale ou lorsque cela est nécessaire à la fourniture des services demandés par l’utilisateur.',
            ],
          },
          {
            title: 'Droits',
            blocks: [
              'Les utilisateurs peuvent exercer leurs droits :',
              [
                'D’accès.',
                'De rectification.',
                'D’effacement.',
                'D’opposition.',
                'À la limitation du traitement.',
                'À la portabilité.',
              ],
              'Pour ce faire, ils peuvent adresser une demande à {email} en indiquant le droit qu’ils souhaitent exercer.',
              'Ils disposent également du droit d’introduire une réclamation auprès de l’Agence espagnole de protection des données (www.aepd.es) s’ils estiment que le traitement de leurs données n’est pas conforme à la réglementation en vigueur.',
            ],
          },
          {
            title: 'Photographies d’événements',
            blocks: [
              'Des photographies et des vidéos correspondant à des événements organisés par l’éditeur peuvent être publiées sur ce site.',
              'La participation à ces événements peut impliquer la captation et l’utilisation d’images à des fins promotionnelles, informatives et publicitaires, conformément aux conditions acceptées par les participants lors de l’achat des billets.',
              'Toute personne apparaissant sur une image et estimant que sa publication porte atteinte à ses droits peut en demander la révision ou le retrait en écrivant à {email}.',
            ],
          },
          {
            title: 'Modifications',
            blocks: [
              'L’éditeur peut modifier la présente Politique de Confidentialité afin de l’adapter à des évolutions législatives ou techniques.',
              'La version publiée sur le site est toujours celle en vigueur.',
            ],
          },
        ],
      },
      notice: {
        intro:
          'Conformément à la Loi espagnole 34/2002 du 11 juillet relative aux services de la société de l’information et au commerce électronique (LSSI-CE), les informations d’identification de l’éditeur de ce site et les conditions régissant son utilisation sont indiquées ci-dessous.',
        sections: [
          {
            title: 'Éditeur du site',
            blocks: [
              'Le présent site web est édité par {company}, NIF/CIF {nif}, dont le siège social est situé {address}.',
              'Adresse e-mail de contact : {email}. Téléphone : {phone}.',
            ],
          },
          {
            title: 'Objet',
            blocks: [
              'Le présent site a pour objet de présenter les événements organisés par l’éditeur, de permettre la consultation des informations qui s’y rapportent et de donner accès à la plateforme externe de billetterie.',
            ],
          },
          {
            title: 'Billetterie',
            blocks: [
              'L’achat de billets s’effectue via la plateforme Fourvenues, intégrée au moyen de liens ou d’un iframe.',
              'Le processus d’achat, le traitement des données personnelles et les conditions contractuelles correspondantes relèvent de la responsabilité de Fourvenues, dont les propres conditions d’utilisation et politique de confidentialité s’appliquent.',
            ],
          },
          {
            title: 'Propriété intellectuelle',
            blocks: [
              'L’ensemble des contenus du site — textes, photographies, vidéos, logotypes, création graphique et tout autre élément — appartient à l’éditeur ou est utilisé avec l’autorisation correspondante.',
              'Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite, sauf dans les cas permis par la législation en vigueur.',
            ],
          },
          {
            title: 'Photographies et matériel audiovisuel',
            blocks: [
              'Les images et vidéos publiées sur ce site correspondent à des événements organisés par l’éditeur.',
              'La participation à ces événements peut impliquer la captation et l’utilisation d’images à des fins informatives, promotionnelles et publicitaires, conformément aux conditions acceptées par les participants lors de l’achat des billets et à la réglementation en vigueur.',
              'Toute personne estimant qu’une image publiée porte atteinte à ses droits peut en demander la révision ou le retrait en écrivant à {email}.',
            ],
          },
          {
            title: 'Responsabilité',
            blocks: [
              'L’éditeur ne garantit pas l’absence d’erreurs dans les contenus publiés, mais prendra les mesures raisonnables pour les corriger dès qu’elles seront détectées.',
              'Il n’est pas davantage responsable de la disponibilité, du fonctionnement ou du contenu des services fournis par des tiers accessibles via des liens ou des intégrations présents sur ce site.',
            ],
          },
          {
            title: 'Droit applicable',
            blocks: [
              'Les présentes Mentions Légales sont régies par le droit espagnol.',
              'Tout litige découlant de l’utilisation du site relèvera des juridictions compétentes en vertu de la réglementation applicable.',
            ],
          },
        ],
      },
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
      privacy: {
        name: 'DATENSCHUTZERKLÄRUNG',
        lead: 'Wie personenbezogene Daten auf dieser Website verarbeitet werden.',
      },
      legal: {
        name: 'IMPRESSUM',
        lead: 'Anbieter, Nutzungsbedingungen und Haftung dieser Website.',
      },
    },
    about: {
      eyebrow: 'QUARTIER BARCELONA',
      title: 'A NEW\nCHAPTER',
      // The short cut of `body`, for the Intro block on the home page.
      intro:
        'Jahrzehntelang war dieser Ort Teil der Nächte Barcelonas. Heute wird diese Geschichte unter einer neuen Identität fortgeschrieben: ein vollständig erneuerter Raum, in dem Musik, Design und Menschen zusammenkommen und etwas Einzigartiges entsteht.',
      body: [
        'Es gibt Orte, an die man für eine Nacht geht. Und es gibt Orte, die zu einem Teil von ihr werden.',
        'Jahrzehntelang war dieser Ort Teil der Nächte Barcelonas. Heute wird diese Geschichte unter einer neuen Identität fortgeschrieben.',
        'Quartier bringt dieses Erbe in die Gegenwart: ein vollständig erneuerter Raum, ein neues Design und eine neue Art, die Nacht zu erleben. Ein Treffpunkt, an dem Musik, Design, Menschen und Energie zusammenkommen und etwas Einzigartiges entsteht.',
      ],
      closing: 'Denn Ausgehen ist erst der Anfang.',
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
    legal: {
      updatedLabel: 'LETZTE AKTUALISIERUNG',
      holderLabel: 'ANBIETER',
      nifLabel: 'STEUERNUMMER',
      addressLabel: 'SITZ',
      emailLabel: 'KONTAKT',
      indexLabel: 'INHALT',
      prevail:
        'Diese Übersetzung dient der besseren Verständlichkeit. Im Falle von Abweichungen ist die spanische Fassung dieses Textes maßgeblich.',
      privacy: {
        intro:
          'Diese Datenschutzerklärung regelt die Verarbeitung personenbezogener Daten über diese Website gemäß der Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates vom 27. April 2016 (Datenschutz-Grundverordnung — DSGVO), dem spanischen Organgesetz 3/2018 vom 5. Dezember über den Schutz personenbezogener Daten und die Gewährleistung digitaler Rechte (LOPDGDD) sowie dem spanischen Gesetz 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr (LSSI-CE).',
        sections: [
          {
            title: 'Verantwortlicher',
            blocks: [
              'Verantwortlich für die Verarbeitung der über diese Website erhobenen personenbezogenen Daten ist {company}, Steuernummer {nif}, mit Sitz in {address}.',
              'Bei Fragen zum Datenschutz können Sie sich an {email} wenden.',
            ],
          },
          {
            title: 'Zweck der Verarbeitung',
            blocks: [
              'Diese Website dient dazu:',
              [
                'Über die vom Anbieter organisierten Veranstaltungen zu informieren.',
                'Den Zugang zur Ticketplattform zu ermöglichen.',
                'Anfragen der Nutzer per E-Mail, Telefon oder WhatsApp zu beantworten.',
                'Aggregierte Statistiken über die Nutzung der Website zu erhalten, um das Nutzungserlebnis zu verbessern.',
              ],
            ],
          },
          {
            title: 'Verarbeitete Daten',
            blocks: [
              'Der Anbieter verlangt keine Registrierung und erhebt keine personenbezogenen Daten über eigene Formulare.',
              'Wenn ein Nutzer per E-Mail, Telefon oder WhatsApp Kontakt aufnimmt, werden die übermittelten Daten ausschließlich zur Beantwortung dieser Anfrage verwendet.',
              'Darüber hinaus können während des Besuchs bestimmte technische und statistische Daten erhoben werden, die für den Betrieb und die Auswertung der Website erforderlich sind.',
            ],
          },
          {
            title: 'Rechtsgrundlage',
            blocks: [
              'Die Rechtsgrundlagen der Verarbeitung sind:',
              [
                'Das berechtigte Interesse des Verantwortlichen an der Sicherheit und dem Betrieb der Website sowie an der Kenntnis ihrer Nutzung anhand aggregierter Statistiken.',
                'Die Einwilligung des Nutzers, wenn er freiwillig per E-Mail, Telefon oder WhatsApp Kontakt aufnimmt.',
                'Die Erfüllung des Vertragsverhältnisses zwischen dem Nutzer und Fourvenues, sobald dieser den Ticketkauf startet.',
              ],
            ],
          },
          {
            title: 'Ticketverkauf',
            blocks: [
              'Der Ticketkauf erfolgt über die Plattform Fourvenues.',
              'Sobald der Nutzer den Kaufvorgang beginnt, werden die personenbezogenen Daten unmittelbar von dieser Plattform nach deren eigenen Bedingungen und Datenschutzbestimmungen verarbeitet.',
              'Der Anbieter dieser Website ist an der Verarbeitung der für den Ticketkauf erforderlichen personenbezogenen Daten nicht beteiligt, mit Ausnahme jener Daten, die ihm im Rahmen der Veranstaltungsorganisation nachträglich übermittelt werden.',
            ],
          },
          {
            title: 'Analyse und Dienste Dritter',
            blocks: [
              'Diese Website nutzt Vercel Analytics, um Nutzungsstatistiken zu erhalten, die Leistung der Website zu verbessern und die Interaktion der Besucher in aggregierter Form zu verstehen. Der Dienst verwendet keine Werbe-Cookies und identifiziert keine einzelnen Besucher.',
              'Beim Laden bestimmter Teile der Website werden zudem Anfragen an die folgenden Anbieter gestellt, die im Rahmen des normalen Betriebs ihrer Dienste die IP-Adresse des Besuchers protokollieren können:',
              [
                'Vercel als Hosting-Anbieter und Anbieter der aggregierten Analyse.',
                'Fourvenues, sobald der in die Website eingebundene Ticketverkauf geöffnet wird.',
                'OpenStreetMap und CARTO, die das Kartenmaterial für den Standort bereitstellen.',
              ],
            ],
          },
          {
            title: 'Speicherdauer',
            blocks: [
              'Per E-Mail, Telefon oder WhatsApp erhaltene Daten werden nur so lange gespeichert, wie es zur Bearbeitung der Anfrage oder zur Erfüllung geltender gesetzlicher Pflichten erforderlich ist.',
            ],
          },
          {
            title: 'Empfänger',
            blocks: [
              'Personenbezogene Daten werden nicht an Dritte weitergegeben, außer aufgrund einer gesetzlichen Verpflichtung oder soweit dies für die vom Nutzer angeforderten Leistungen erforderlich ist.',
            ],
          },
          {
            title: 'Rechte',
            blocks: [
              'Nutzer können folgende Rechte geltend machen:',
              [
                'Auskunft.',
                'Berichtigung.',
                'Löschung.',
                'Widerspruch.',
                'Einschränkung der Verarbeitung.',
                'Datenübertragbarkeit.',
              ],
              'Dazu genügt eine Anfrage an {email} unter Angabe des Rechts, das ausgeübt werden soll.',
              'Darüber hinaus besteht das Recht, bei der spanischen Datenschutzbehörde (www.aepd.es) Beschwerde einzulegen, wenn die Verarbeitung der Daten aus Sicht des Nutzers nicht den geltenden Vorschriften entspricht.',
            ],
          },
          {
            title: 'Veranstaltungsfotos',
            blocks: [
              'Auf dieser Website können Fotos und Videos von Veranstaltungen des Anbieters veröffentlicht werden.',
              'Die Teilnahme an diesen Veranstaltungen kann die Aufnahme und Verwendung von Bildern zu Werbe-, Informations- und Publizitätszwecken umfassen, entsprechend den beim Ticketkauf akzeptierten Bedingungen.',
              'Wer auf einer Aufnahme zu sehen ist und der Auffassung ist, dass die Veröffentlichung seine Rechte berührt, kann deren Überprüfung oder Entfernung unter {email} verlangen.',
            ],
          },
          {
            title: 'Änderungen',
            blocks: [
              'Der Anbieter kann diese Datenschutzerklärung ändern, um sie an gesetzliche oder technische Entwicklungen anzupassen.',
              'Maßgeblich ist stets die auf der Website veröffentlichte Fassung.',
            ],
          },
        ],
      },
      notice: {
        intro:
          'In Erfüllung des spanischen Gesetzes 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr (LSSI-CE) werden nachstehend die Angaben zum Anbieter dieser Website sowie die Bedingungen ihrer Nutzung mitgeteilt.',
        sections: [
          {
            title: 'Anbieter der Website',
            blocks: [
              'Diese Website wird betrieben von {company}, Steuernummer {nif}, mit Sitz in {address}.',
              'Kontakt-E-Mail: {email}. Telefon: {phone}.',
            ],
          },
          {
            title: 'Gegenstand',
            blocks: [
              'Diese Website dient dazu, über die vom Anbieter organisierten Veranstaltungen zu informieren, zugehörige Informationen abrufbar zu machen und den Zugang zur externen Ticketplattform zu ermöglichen.',
            ],
          },
          {
            title: 'Ticketverkauf',
            blocks: [
              'Der Erwerb von Tickets erfolgt über die Plattform Fourvenues, die per Link oder iframe eingebunden ist.',
              'Der Kaufvorgang, die Verarbeitung der personenbezogenen Daten und die entsprechenden Vertragsbedingungen liegen in der Verantwortung von Fourvenues; es gelten deren eigene Nutzungsbedingungen und Datenschutzerklärung.',
            ],
          },
          {
            title: 'Urheberrecht',
            blocks: [
              'Sämtliche Inhalte der Website — Texte, Fotos, Videos, Logos, grafische Gestaltung und alle weiteren Elemente — sind Eigentum des Anbieters oder werden mit entsprechender Genehmigung genutzt.',
              'Ihre Vervielfältigung, Verbreitung oder Nutzung ohne vorherige Genehmigung ist untersagt, außer in den gesetzlich zulässigen Fällen.',
            ],
          },
          {
            title: 'Fotos und audiovisuelles Material',
            blocks: [
              'Die auf dieser Website veröffentlichten Bilder und Videos stammen von Veranstaltungen des Anbieters.',
              'Die Teilnahme an diesen Veranstaltungen kann die Aufnahme und Verwendung von Bildern zu Informations-, Werbe- und Publizitätszwecken umfassen, entsprechend den beim Ticketkauf akzeptierten Bedingungen und den geltenden Vorschriften.',
              'Wer der Auffassung ist, dass ein veröffentlichtes Bild seine Rechte berührt, kann dessen Überprüfung oder Entfernung unter {email} verlangen.',
            ],
          },
          {
            title: 'Haftung',
            blocks: [
              'Der Anbieter übernimmt keine Gewähr für die Fehlerfreiheit der veröffentlichten Inhalte, wird jedoch angemessene Maßnahmen ergreifen, um erkannte Fehler zu beheben.',
              'Ebenso wenig haftet der Anbieter für Verfügbarkeit, Funktion oder Inhalt der Dienste Dritter, die über Links oder Einbindungen auf dieser Website erreichbar sind.',
            ],
          },
          {
            title: 'Anwendbares Recht',
            blocks: [
              'Dieses Impressum unterliegt spanischem Recht.',
              'Für Streitigkeiten aus der Nutzung der Website sind die nach den anwendbaren Vorschriften zuständigen Gerichte berufen.',
            ],
          },
        ],
      },
    },
  },
}
