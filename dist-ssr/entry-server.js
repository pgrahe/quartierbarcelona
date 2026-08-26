import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef, useLayoutEffect, lazy, Suspense } from "react";
const LANGUAGES = [
  { code: "es", label: "ES", name: "Español", htmlLang: "es" },
  { code: "en", label: "EN", name: "English", htmlLang: "en" },
  { code: "fr", label: "FR", name: "Français", htmlLang: "fr" },
  { code: "de", label: "DE", name: "Deutsch", htmlLang: "de" }
];
const DEFAULT_LANGUAGE = "es";
const SLOGAN = "MORE THAN A CLUB";
const SLOGAN_LEAD = "MORE THAN";
const SLOGAN_ARTICLE = "A";
const SLOGAN_ROTATIONS = [
  { id: "night", word: "NIGHT.", label: "MORE THAN A NIGHT." },
  { id: "moment", word: "MOMENT.", label: "MORE THAN A MOMENT." },
  { id: "club", word: "CLUB.", label: "MORE THAN A CLUB." }
];
const translations = {
  es: {
    meta: {
      description: "Quartier Barcelona. Un destino de ocio nocturno en Pedralbes, Barcelona. More Than A Club."
    },
    nav: {
      home: "INICIO",
      about: "SOBRE NOSOTROS",
      contact: "CONTACTO",
      vipExperience: "VIP EXPERIENCE",
      // Navbar only — five full labels overflow the bar on a narrow laptop.
      vipExperienceShort: "VIP",
      privateEvents: "EVENTOS PRIVADOS",
      // Navbar only — the full label overflows the bar on narrow laptops.
      privateEventsShort: "EVENTOS",
      tickets: "TICKETS Y MESAS VIP",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      menu: "Menú",
      language: "Idioma",
      skipToContent: "Saltar al contenido",
      closeTickets: "Cerrar entradas",
      ticketsExternal: "Abrir en Fourvenues"
    },
    hero: {
      videoLabel: "Vídeo ambiente de Quartier Barcelona"
    },
    about: {
      eyebrow: "QUARTIER BARCELONA",
      title: "A NEW\nCHAPTER",
      // The first entry is set as a lead, the last as a closing line.
      body: [
        "Hay lugares a los que vas una noche. Y hay lugares que se convierten en parte de ella.",
        "Durante décadas, este espacio ha formado parte de la noche de Barcelona. Hoy, esa historia evoluciona con Quartier. Un espacio completamente renovado, un nuevo diseño y una nueva identidad para una nueva generación.",
        "Música, ambiente y una experiencia cuidada hasta el último detalle se unen para crear una nueva forma de vivir la noche."
      ],
      closing: "Porque salir es solo el principio.",
      caption: "PEDRALBES · BARCELONA",
      imageAlt: "Retrato en blanco y negro de una noche en Quartier Barcelona"
    },
    brand: {
      caption: "LA NOCHE, A NUESTRA MANERA",
      imageAlt: "Ambiente nocturno en la pista de Quartier Barcelona",
      imageAlt2: "Grupo de amigos en una noche en Quartier Barcelona",
      imageAlt3: "Invitada celebrando en Quartier Barcelona"
    },
    vipExperience: {
      eyebrow: "VIP EXPERIENCE",
      // English headline, like the hero slogan and the About / Private Events
      // titles — brand voice, not copy to translate.
      title: "Own the night.",
      body: "Reserva tu mesa en la mejor zona de la sala y vive la noche desde dentro. Servicio dedicado, botella en mesa y el mejor ángulo de Quartier.",
      note: "Mesas limitadas y sujetas a disponibilidad.",
      imageAlt: "Grupo de amigos celebrando en una mesa VIP de Quartier Barcelona",
      imageAlt2: "Botellas con luces de bengala servidas en la pista de Quartier Barcelona"
    },
    privateEvents: {
      eyebrow: "PRIVATE EVENTS",
      // Headline stays English in every language, like the hero slogan and the
      // About title — it is brand, not copy.
      title: "Make it yours.",
      body: "Un espacio único para eventos privados, corporativos y celebraciones en Pedralbes.",
      tagline: "Un espacio. Una experiencia. A tu medida.",
      cta: "SOLICITAR INFORMACIÓN",
      whatsappMessage: "Hola, me gustaría recibir información sobre eventos privados en Quartier Barcelona.",
      imageAlt: "Reservado de Quartier Barcelona"
    },
    contact: {
      eyebrow: "HABLEMOS",
      title: "CONTACTO",
      emailLabel: "EMAIL",
      phoneLabel: "TELÉFONO",
      ticketsLine: "Reservas de mesa y entradas"
    },
    location: {
      eyebrow: "DÓNDE ESTAMOS",
      title: "PEDRALBES,\nBARCELONA.",
      directions: "CÓMO LLEGAR",
      mapLabel: "Mapa con la ubicación de Quartier Barcelona"
    },
    footer: {
      legalPrivacy: "PRIVACIDAD",
      legalNotice: "AVISO LEGAL",
      navTitle: "NAVEGACIÓN",
      contactTitle: "CONTACTO",
      rights: "QUARTIER BARCELONA",
      partners: "PARTNERS"
    }
  },
  en: {
    meta: {
      description: "Quartier Barcelona. A nightlife destination in Pedralbes, Barcelona. More Than A Club."
    },
    nav: {
      home: "HOME",
      about: "ABOUT",
      contact: "CONTACT",
      vipExperience: "VIP EXPERIENCE",
      vipExperienceShort: "VIP",
      privateEvents: "PRIVATE EVENTS",
      privateEventsShort: "EVENTS",
      tickets: "TICKETS & VIP TABLES",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      language: "Language",
      skipToContent: "Skip to content",
      closeTickets: "Close tickets",
      ticketsExternal: "Open on Fourvenues"
    },
    hero: {
      videoLabel: "Quartier Barcelona atmosphere video"
    },
    about: {
      eyebrow: "QUARTIER BARCELONA",
      title: "A NEW\nCHAPTER",
      body: [
        "There are places you go to for a night. And places that become part of it.",
        "For decades, this space has been part of Barcelona's nights. Today that story moves on as Quartier. A completely renovated space, a new design and a new identity for a new generation.",
        "Music, atmosphere and an experience considered down to the last detail come together to create a new way of living the night."
      ],
      closing: "Because going out is only the beginning.",
      caption: "PEDRALBES · BARCELONA",
      imageAlt: "Black and white portrait of a night at Quartier Barcelona"
    },
    brand: {
      caption: "THE NIGHT, OUR WAY",
      imageAlt: "Night atmosphere on the Quartier Barcelona dancefloor",
      imageAlt2: "Friends together on a night at Quartier Barcelona",
      imageAlt3: "Guest celebrating at Quartier Barcelona"
    },
    vipExperience: {
      eyebrow: "VIP EXPERIENCE",
      title: "Own the night.",
      body: "Book your table in the best part of the room and take the night from the inside. Dedicated service, bottle service and the best view of Quartier.",
      note: "Tables are limited and subject to availability.",
      imageAlt: "Friends celebrating at a VIP table at Quartier Barcelona",
      imageAlt2: "Bottle service with sparklers on the Quartier Barcelona dancefloor"
    },
    privateEvents: {
      eyebrow: "PRIVATE EVENTS",
      title: "Make it yours.",
      body: "A singular space for private events, corporate occasions and celebrations in Pedralbes.",
      tagline: "One space. One experience. Made yours.",
      cta: "REQUEST INFORMATION",
      whatsappMessage: "Hello, I would like information about private events at Quartier Barcelona.",
      imageAlt: "Private booth at Quartier Barcelona"
    },
    contact: {
      eyebrow: "LET'S TALK",
      title: "CONTACT",
      emailLabel: "EMAIL",
      phoneLabel: "PHONE",
      ticketsLine: "Table bookings and tickets"
    },
    location: {
      eyebrow: "WHERE WE ARE",
      title: "PEDRALBES,\nBARCELONA.",
      directions: "GET DIRECTIONS",
      mapLabel: "Map showing the location of Quartier Barcelona"
    },
    footer: {
      legalPrivacy: "PRIVACY",
      legalNotice: "LEGAL NOTICE",
      navTitle: "NAVIGATION",
      contactTitle: "CONTACT",
      rights: "QUARTIER BARCELONA",
      partners: "PARTNERS"
    }
  },
  fr: {
    meta: {
      description: "Quartier Barcelona. Une destination nocturne à Pedralbes, Barcelone. More Than A Club."
    },
    nav: {
      home: "ACCUEIL",
      about: "À PROPOS",
      contact: "CONTACT",
      vipExperience: "VIP EXPERIENCE",
      vipExperienceShort: "VIP",
      privateEvents: "ÉVÉNEMENTS PRIVÉS",
      privateEventsShort: "ÉVÉNEMENTS",
      tickets: "TICKETS ET TABLES VIP",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      menu: "Menu",
      language: "Langue",
      skipToContent: "Aller au contenu",
      closeTickets: "Fermer les billets",
      ticketsExternal: "Ouvrir sur Fourvenues"
    },
    hero: {
      videoLabel: "Vidéo d'ambiance de Quartier Barcelona"
    },
    about: {
      eyebrow: "QUARTIER BARCELONA",
      title: "A NEW\nCHAPTER",
      body: [
        "Il y a des lieux où l'on va le temps d'une nuit. Et des lieux qui en deviennent une partie.",
        "Pendant des décennies, ce lieu a fait partie des nuits de Barcelone. Aujourd'hui, cette histoire évolue avec Quartier. Un espace entièrement rénové, un nouveau design et une nouvelle identité pour une nouvelle génération.",
        "La musique, l'ambiance et une expérience soignée jusque dans le moindre détail se rejoignent pour créer une nouvelle façon de vivre la nuit."
      ],
      closing: "Parce que sortir n'est que le commencement.",
      caption: "PEDRALBES · BARCELONE",
      imageAlt: "Portrait en noir et blanc d’une nuit au Quartier Barcelona"
    },
    brand: {
      caption: "LA NUIT, À NOTRE FAÇON",
      imageAlt: "Ambiance nocturne sur la piste du Quartier Barcelona",
      imageAlt2: "Groupe d’amis lors d’une nuit au Quartier Barcelona",
      imageAlt3: "Invitée célébrant au Quartier Barcelona"
    },
    vipExperience: {
      eyebrow: "VIP EXPERIENCE",
      title: "Own the night.",
      body: "Réservez votre table dans le meilleur coin de la salle et vivez la nuit de l’intérieur. Service dédié, bouteilles en table et le plus bel angle du Quartier.",
      note: "Tables en nombre limité, selon disponibilité.",
      imageAlt: "Des amis qui font la fête à une table VIP du Quartier Barcelona",
      imageAlt2: "Service de bouteilles avec cierges magiques sur la piste du Quartier Barcelona"
    },
    privateEvents: {
      eyebrow: "PRIVATE EVENTS",
      title: "Make it yours.",
      body: "Un lieu singulier pour vos événements privés, vos rendez-vous d’entreprise et vos célébrations à Pedralbes.",
      tagline: "Un lieu. Une expérience. À votre mesure.",
      cta: "DEMANDER DES INFORMATIONS",
      whatsappMessage: "Bonjour, je souhaiterais des informations sur les événements privés au Quartier Barcelona.",
      imageAlt: "Espace privatif du Quartier Barcelona"
    },
    contact: {
      eyebrow: "PARLONS-EN",
      title: "CONTACT",
      emailLabel: "EMAIL",
      phoneLabel: "TÉLÉPHONE",
      ticketsLine: "Réservations de table et billets"
    },
    location: {
      eyebrow: "OÙ NOUS TROUVER",
      title: "PEDRALBES,\nBARCELONE.",
      directions: "S’Y RENDRE",
      mapLabel: "Carte indiquant l’emplacement de Quartier Barcelona"
    },
    footer: {
      legalPrivacy: "CONFIDENTIALITÉ",
      legalNotice: "MENTIONS LÉGALES",
      navTitle: "NAVIGATION",
      contactTitle: "CONTACT",
      rights: "QUARTIER BARCELONA",
      partners: "PARTENAIRES"
    }
  },
  de: {
    meta: {
      description: "Quartier Barcelona. Ein Nachtleben-Ziel in Pedralbes, Barcelona. More Than A Club."
    },
    nav: {
      home: "START",
      about: "ÜBER UNS",
      contact: "KONTAKT",
      vipExperience: "VIP EXPERIENCE",
      vipExperienceShort: "VIP",
      privateEvents: "PRIVATE EVENTS",
      privateEventsShort: "EVENTS",
      tickets: "TICKETS UND VIP-TISCHE",
      openMenu: "Menü öffnen",
      closeMenu: "Menü schließen",
      menu: "Menü",
      language: "Sprache",
      skipToContent: "Zum Inhalt springen",
      closeTickets: "Tickets schließen",
      ticketsExternal: "Auf Fourvenues öffnen"
    },
    hero: {
      videoLabel: "Atmosphäre-Video von Quartier Barcelona"
    },
    about: {
      eyebrow: "QUARTIER BARCELONA",
      title: "A NEW\nCHAPTER",
      body: [
        "Es gibt Orte, an die man für eine Nacht geht. Und Orte, die zu einem Teil von ihr werden.",
        "Jahrzehntelang war dieser Ort Teil der Nächte Barcelonas. Heute entwickelt sich diese Geschichte als Quartier weiter. Ein vollständig erneuerter Raum, ein neues Design und eine neue Identität für eine neue Generation.",
        "Musik, Atmosphäre und ein bis ins letzte Detail durchdachtes Erlebnis verbinden sich zu einer neuen Art, die Nacht zu erleben."
      ],
      closing: "Denn Ausgehen ist erst der Anfang.",
      caption: "PEDRALBES · BARCELONA",
      imageAlt: "Schwarzweiß-Porträt einer Nacht im Quartier Barcelona"
    },
    brand: {
      caption: "DIE NACHT, AUF UNSERE ART",
      imageAlt: "Nachtatmosphäre auf der Tanzfläche des Quartier Barcelona",
      imageAlt2: "Freundesgruppe an einem Abend im Quartier Barcelona",
      imageAlt3: "Gast feiert im Quartier Barcelona"
    },
    vipExperience: {
      eyebrow: "VIP EXPERIENCE",
      title: "Own the night.",
      body: "Reservieren Sie Ihren Tisch im besten Bereich des Clubs und erleben Sie die Nacht von innen. Eigener Service, Flaschenservice und der beste Blick über Quartier.",
      note: "Begrenzte Tischanzahl, nach Verfügbarkeit.",
      imageAlt: "Freunde feiern an einem VIP-Tisch im Quartier Barcelona",
      imageAlt2: "Flaschenservice mit Wunderkerzen auf der Tanzfläche des Quartier Barcelona"
    },
    privateEvents: {
      eyebrow: "PRIVATE EVENTS",
      title: "Make it yours.",
      body: "Ein besonderer Ort für private Feiern, Firmenevents und Feierlichkeiten in Pedralbes.",
      tagline: "Ein Raum. Ein Erlebnis. Ganz nach Ihnen.",
      cta: "INFORMATIONEN ANFRAGEN",
      whatsappMessage: "Hallo, ich hätte gerne Informationen zu privaten Events im Quartier Barcelona.",
      imageAlt: "Privater Bereich im Quartier Barcelona"
    },
    contact: {
      eyebrow: "SPRECHEN WIR",
      title: "KONTAKT",
      emailLabel: "E-MAIL",
      phoneLabel: "TELEFON",
      ticketsLine: "Tischreservierungen und Tickets"
    },
    location: {
      eyebrow: "WO WIR SIND",
      title: "PEDRALBES,\nBARCELONA.",
      directions: "ANFAHRT",
      mapLabel: "Karte mit dem Standort von Quartier Barcelona"
    },
    footer: {
      legalPrivacy: "DATENSCHUTZ",
      legalNotice: "IMPRESSUM",
      navTitle: "NAVIGATION",
      contactTitle: "KONTAKT",
      rights: "QUARTIER BARCELONA",
      partners: "PARTNER"
    }
  }
};
const SITE_URL = "https://quartierbarcelona.com";
const LOCALES = [
  { code: "es", path: "/", hreflang: "es", ogLocale: "es_ES", isDefault: true },
  { code: "en", path: "/en/", hreflang: "en", ogLocale: "en_GB" },
  { code: "fr", path: "/fr/", hreflang: "fr", ogLocale: "fr_FR" },
  { code: "de", path: "/de/", hreflang: "de", ogLocale: "de_DE" }
];
function localeFor(code) {
  return LOCALES.find((l) => l.code === code) || LOCALES[0];
}
function absoluteUrl(path = "/") {
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}
const SOCIAL = [];
const GSC_VERIFICATION = "";
const OG_IMAGE = "/img/og-quartier-barcelona.jpg";
const FOURVENUES_SLUG = "quartier-club";
const FOURVENUES_EMBED_SRC = `https://www.fourvenues.com/assets/iframe/${FOURVENUES_SLUG}/calendar@`;
const TICKETS_VIP_URL = `https://site.fourvenues.com/es/${FOURVENUES_SLUG}`;
const CONTACT = {
  email: "info@quartierbarcelona.com",
  // Displayed as written; the tel: href uses the international form.
  phoneDisplay: "+34 625 266 105",
  phoneHref: "+34625266105"
};
const WHATSAPP_NUMBER = CONTACT.phoneHref.replace(/\D/g, "");
function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
const LOCATION = {
  street: "Carrer de Santa Caterina de Siena, 28",
  district: "Pedralbes",
  city: "Barcelona",
  postalCode: "08034",
  country: "España",
  // OpenStreetMap / Nominatim pin for this street number.
  lat: 41.3900488,
  lng: 2.1105701,
  zoom: 16
};
function formattedAddress() {
  return [LOCATION.street, LOCATION.district, [LOCATION.postalCode, LOCATION.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
}
function addressLines() {
  return [LOCATION.street, `${LOCATION.postalCode} ${LOCATION.city}`.trim()].filter(Boolean);
}
function mapQuery() {
  return ["Quartier Barcelona", formattedAddress(), LOCATION.country].filter(Boolean).join(", ");
}
function mapDirectionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery())}`;
}
const SEO = {
  es: {
    title: "Quartier Barcelona | Club en Pedralbes",
    description: "Quartier Barcelona, club premium en Pedralbes. Música, ambiente y una nueva forma de vivir la noche. Reserva tickets y mesas VIP.",
    ogImageAlt: "Interior de Quartier Barcelona, club en Pedralbes",
    h1: "Quartier Barcelona — More Than A Club"
  },
  en: {
    title: "Quartier Barcelona | Club in Pedralbes",
    description: "Quartier Barcelona, a premium club in Pedralbes. Music, atmosphere and a new way to experience Barcelona nightlife. Tickets and VIP tables.",
    ogImageAlt: "Interior of Quartier Barcelona, a club in Pedralbes",
    h1: "Quartier Barcelona — More Than A Club"
  },
  fr: {
    title: "Quartier Barcelona | Club à Pedralbes",
    description: "Quartier Barcelona, club premium à Pedralbes. Musique, ambiance et une nouvelle façon de vivre la nuit barcelonaise. Billets et tables VIP.",
    ogImageAlt: "Intérieur du Quartier Barcelona, club à Pedralbes",
    h1: "Quartier Barcelona — More Than A Club"
  },
  de: {
    title: "Quartier Barcelona | Club in Pedralbes",
    description: "Quartier Barcelona, Premium-Club in Pedralbes. Musik, Atmosphäre und eine neue Art, das Nachtleben Barcelonas zu erleben. Tickets und VIP-Tische.",
    ogImageAlt: "Innenraum des Quartier Barcelona, Club in Pedralbes",
    h1: "Quartier Barcelona — More Than A Club"
  }
};
function seoFor(code) {
  return SEO[code] || SEO.es;
}
const STORAGE_KEY = "quartier.lang";
const CODES = LANGUAGES.map((l) => l.code);
const LanguageContext = createContext(null);
function languageFromPath(pathname = "/") {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg && CODES.includes(seg) ? seg : null;
}
function resolveInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  return languageFromPath(window.location.pathname) || DEFAULT_LANGUAGE;
}
function LanguageProvider({ children, initialLanguage }) {
  const [lang, setLangState] = useState(initialLanguage || resolveInitialLanguage);
  const setLang = useCallback((code) => {
    if (!CODES.includes(code)) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
    }
    const { path } = localeFor(code);
    if (window.location.pathname !== path) {
      window.history.pushState({ lang: code }, "", path + window.location.hash);
    }
  }, []);
  useEffect(() => {
    const onPop = () => {
      const fromPath = languageFromPath(window.location.pathname);
      if (fromPath) setLangState(fromPath);
      else setLangState(DEFAULT_LANGUAGE);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    const meta = LANGUAGES.find((l) => l.code === lang);
    const locale = localeFor(lang);
    const seo = seoFor(lang);
    document.documentElement.lang = meta ? meta.htmlLang : lang;
    document.title = seo.title;
    const set = (selector, attr, value2) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value2);
    };
    set('meta[name="description"]', "content", seo.description);
    set('meta[property="og:title"]', "content", seo.title);
    set('meta[property="og:description"]', "content", seo.description);
    set('meta[property="og:locale"]', "content", locale.ogLocale);
    set('meta[name="twitter:title"]', "content", seo.title);
    set('meta[name="twitter:description"]', "content", seo.description);
    set('link[rel="canonical"]', "href", `${window.location.origin}${locale.path}`);
    set('meta[property="og:url"]', "content", `${window.location.origin}${locale.path}`);
  }, [lang]);
  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang], locales: LOCALES }),
    [lang, setLang]
  );
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value, children });
}
function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
const TicketsContext = createContext(null);
function TicketsProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openTickets = useCallback(() => setOpen(true), []);
  const closeTickets = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openTickets, closeTickets }), [open, openTickets, closeTickets]);
  return /* @__PURE__ */ jsx(TicketsContext.Provider, { value, children });
}
function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used inside <TicketsProvider>");
  return ctx;
}
function useHeroPassed(heroId = "inicio", ratio = 0.72) {
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    Object.assign(sentinel.style, {
      position: "absolute",
      top: `${ratio * 100}%`,
      left: "0",
      width: "1px",
      height: "1px",
      pointerEvents: "none"
    });
    hero.appendChild(sentinel);
    const io = new IntersectionObserver(
      ([entry]) => setPassed(entry.boundingClientRect.top < 0 && !entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, [heroId, ratio]);
  return passed;
}
function useReveal(rootRef, { threshold = 0, rootMargin = "0px 0px -12% 0px" } = {}) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }
    let remaining = targets.length;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "true");
          io.unobserve(entry.target);
          if (--remaining === 0) io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, threshold, rootMargin]);
}
function scrollToSection(id, { offset = 0 } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}
function LanguageSelector({ size = "sm", className = "" }) {
  const { lang, setLang, t } = useLanguage();
  return /* @__PURE__ */ jsx("div", { className: `langs langs--${size} ${className}`.trim(), role: "group", "aria-label": t.nav.language, children: LANGUAGES.map((l, i) => /* @__PURE__ */ jsxs("span", { className: "langs__item", children: [
    i > 0 && /* @__PURE__ */ jsx("span", { className: "langs__sep", "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "langs__btn",
        lang: l.htmlLang,
        "aria-current": l.code === lang ? "true" : void 0,
        "data-active": l.code === lang,
        onClick: () => setLang(l.code),
        children: [
          /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: l.name }),
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: l.label })
        ]
      }
    )
  ] }, l.code)) });
}
function TicketsCta({ variant = "solid", size = "sm", className = "", onClick }) {
  const { t } = useLanguage();
  const { openTickets } = useTickets();
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onClick == null ? void 0 : onClick(e);
    openTickets();
  };
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: TICKETS_VIP_URL,
      onClick: handleClick,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `cta cta--${variant} cta--${size} ${className}`.trim(),
      children: /* @__PURE__ */ jsx("span", { className: "cta__label", children: t.nav.tickets })
    }
  );
}
function Navbar({ solid, menuOpen, onToggleMenu }) {
  const { t } = useLanguage();
  const links = [
    { id: "inicio", label: t.nav.home },
    { id: "sobre-nosotros", label: t.nav.about },
    { id: "vip-experience", label: t.nav.vipExperienceShort },
    // Short label here only: the full one overflows the bar around 900–1024px.
    { id: "eventos-privados", label: t.nav.privateEventsShort },
    { id: "contacto", label: t.nav.contact }
  ];
  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id, { offset: navOffset() });
  };
  return /* @__PURE__ */ jsx("header", { className: "nav", "data-solid": solid, "data-menu-open": menuOpen, children: /* @__PURE__ */ jsxs("div", { className: "nav__inner", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "#inicio",
        className: "nav__logo",
        onClick: (e) => go(e, "inicio"),
        "aria-label": "Quartier Barcelona",
        children: /* @__PURE__ */ jsx("img", { src: "/brand/quartier-beige.png", alt: "", width: "1600", height: "381" })
      }
    ),
    /* @__PURE__ */ jsx("nav", { className: "nav__links", "aria-label": t.nav.menu, children: links.map((l) => /* @__PURE__ */ jsx("a", { href: `#${l.id}`, className: "nav__link", onClick: (e) => go(e, l.id), children: l.label }, l.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "nav__end", children: [
      /* @__PURE__ */ jsx(LanguageSelector, { className: "nav__langs" }),
      /* @__PURE__ */ jsx(TicketsCta, { className: "nav__cta" })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "nav__burger",
        "aria-label": menuOpen ? t.nav.closeMenu : t.nav.openMenu,
        "aria-expanded": menuOpen,
        "aria-controls": "mobile-menu",
        onClick: onToggleMenu,
        children: /* @__PURE__ */ jsxs("span", { className: "nav__burger-bars", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {})
        ] })
      }
    )
  ] }) });
}
function MobileMenu({ open, onClose }) {
  const { t } = useLanguage();
  const panelRef = useRef(null);
  const wasOpenRef = useRef(false);
  const links = [
    { id: "inicio", label: t.nav.home },
    { id: "sobre-nosotros", label: t.nav.about },
    { id: "vip-experience", label: t.nav.vipExperience },
    { id: "eventos-privados", label: t.nav.privateEvents },
    { id: "contacto", label: t.nav.contact }
  ];
  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      var _a;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = (_a = panelRef.current) == null ? void 0 : _a.querySelectorAll(
        "a[href], button:not([disabled])"
      );
      if (!(focusable == null ? void 0 : focusable.length)) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      var _a;
      (_a = panelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (!wasOpenRef.current) return;
    window.setTimeout(() => {
      var _a;
      (_a = document.querySelector(".nav__burger")) == null ? void 0 : _a.focus({ preventScroll: true });
    }, 0);
  }, [open]);
  const go = (e, id) => {
    e.preventDefault();
    onClose();
    window.setTimeout(() => scrollToSection(id, { offset: navOffset() }), 260);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "mobile-menu",
      className: "mmenu",
      "data-open": open,
      "aria-hidden": !open,
      tabIndex: -1,
      ...open ? { role: "dialog", "aria-modal": "true", "aria-label": t.nav.menu } : {},
      ...open ? {} : { inert: "" },
      ref: panelRef,
      children: /* @__PURE__ */ jsxs("div", { className: "mmenu__inner", children: [
        /* @__PURE__ */ jsx("nav", { className: "mmenu__links", "aria-label": t.nav.menu, children: links.map((l, i) => /* @__PURE__ */ jsx(
          "a",
          {
            href: `#${l.id}`,
            className: "mmenu__link",
            style: { "--i": i },
            onClick: (e) => go(e, l.id),
            children: l.label
          },
          l.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "mmenu__foot", children: [
          /* @__PURE__ */ jsx(TicketsCta, { variant: "outline", size: "md", className: "mmenu__cta", onClick: onClose }),
          /* @__PURE__ */ jsx("hr", { className: "rule mmenu__rule" }),
          /* @__PURE__ */ jsx(LanguageSelector, { size: "md", className: "mmenu__langs" })
        ] })
      ] })
    }
  );
}
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const ROTATION_MS = 4600;
const ENTER_DELAY_MS = 550;
const LOGO_HOLD_MS = 2e3;
const LOGO_FADE_MS = 900;
const HERO_DESKTOP = "/video/hero-1080.mp4?v=6";
const HERO_MOBILE = "/video/hero-vertical.mp4?v=6";
const POSTER_DESKTOP = "/video/hero-poster.jpg?v=6";
const POSTER_MOBILE = "/video/hero-poster-vertical.jpg?v=6";
function isMobileHero() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;
}
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function heroSrc() {
  return isMobileHero() ? HERO_MOBILE : HERO_DESKTOP;
}
function heroPoster() {
  return isMobileHero() ? POSTER_MOBILE : POSTER_DESKTOP;
}
function initialIntro() {
  if (typeof window === "undefined") return "done";
  if (prefersReducedMotion() || !isMobileHero()) return "done";
  return "hold";
}
function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(heroSrc);
  const [poster, setPoster] = useState(heroPoster);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [intro, setIntro] = useState(initialIntro);
  const clubIndex = SLOGAN_ROTATIONS.findIndex((s) => s.id === "club");
  const rotatorRef = useRef(null);
  const wordRefs = useRef([]);
  const [widths, setWidths] = useState([]);
  const measure = useCallback(() => {
    const next = wordRefs.current.map((el) => el ? el.getBoundingClientRect().width : 0);
    setWidths(
      (prev) => prev.length === next.length && prev.every((w, i) => Math.abs(w - next[i]) < 0.5) ? prev : next
    );
  }, []);
  useIsomorphicLayoutEffect(() => {
    var _a, _b;
    measure();
    const ro = new ResizeObserver(measure);
    if (rotatorRef.current) ro.observe(rotatorRef.current);
    window.addEventListener("resize", measure);
    (_b = (_a = document.fonts) == null ? void 0 : _a.ready) == null ? void 0 : _b.then(measure).catch(() => {
    });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setSrc(heroSrc());
      setPoster(heroPoster());
      if (!mq.matches && intro !== "done") {
        setIntro("done");
        setEntered(true);
      }
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [intro]);
  useEffect(() => {
    if (intro === "hold") {
      const hold = window.setTimeout(() => setIntro("fade"), LOGO_HOLD_MS);
      return () => window.clearTimeout(hold);
    }
    if (intro === "fade") {
      const fade = window.setTimeout(() => setIntro("done"), LOGO_FADE_MS);
      return () => window.clearTimeout(fade);
    }
  }, [intro]);
  useEffect(() => {
    if (intro !== "done") return;
    const reduced = prefersReducedMotion();
    if (reduced) {
      setActive(clubIndex >= 0 ? clubIndex : 0);
      setEntered(true);
      return;
    }
    const enterDelay = isMobileHero() ? 40 : ENTER_DELAY_MS;
    const enter = window.setTimeout(() => setEntered(true), enterDelay);
    const tick = window.setInterval(() => {
      setActive((i) => (i + 1) % SLOGAN_ROTATIONS.length);
    }, ROTATION_MS);
    return () => {
      window.clearTimeout(enter);
      window.clearInterval(tick);
    };
  }, [intro, clubIndex]);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const onPlaying = () => setPlaying(true);
    v.addEventListener("playing", onPlaying);
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const attempt = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {
      });
    };
    const onVisible = () => {
      if (!document.hidden && v.paused) attempt();
    };
    attempt();
    v.addEventListener("canplay", attempt, { once: true });
    document.addEventListener("visibilitychange", onVisible);
    document.addEventListener("pointerdown", attempt, { once: true, passive: true });
    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisible);
      document.removeEventListener("pointerdown", attempt);
    };
  }, [src]);
  const showCentreBrand = intro === "hold" || intro === "fade";
  return /* @__PURE__ */ jsxs("section", { id: "inicio", className: "hero", "data-intro": intro, "aria-label": "Quartier Barcelona", children: [
    /* @__PURE__ */ jsxs("div", { className: "hero__media", "data-playing": playing, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "hero__poster",
          src: poster,
          alt: "",
          width: poster.includes("vertical") ? 1080 : 1920,
          height: poster.includes("vertical") ? 1920 : 1080
        }
      ),
      /* @__PURE__ */ jsx(
        "video",
        {
          ref: videoRef,
          className: "hero__video",
          src,
          poster,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: "auto",
          disablePictureInPicture: true,
          "aria-label": t.hero.videoLabel,
          tabIndex: -1
        },
        src
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hero__scrim", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "hero__bar", children: [
      /* @__PURE__ */ jsx("a", { href: "#inicio", className: "hero__logo", "aria-label": "Quartier Barcelona", children: /* @__PURE__ */ jsx("img", { src: "/brand/quartier-beige.png", alt: "", width: "1600", height: "381" }) }),
      /* @__PURE__ */ jsx(TicketsCta, { className: "hero__cta" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hero__body", children: [
      showCentreBrand && /* @__PURE__ */ jsx("div", { className: "hero__brand", "aria-hidden": "true", children: /* @__PURE__ */ jsx("img", { src: "/brand/quartier-beige.png", alt: "", width: "1600", height: "381" }) }),
      /* @__PURE__ */ jsxs("h1", { className: "hero__slogan", "data-entered": entered, "data-ready": intro === "done", children: [
        /* @__PURE__ */ jsxs("span", { className: "visually-hidden", children: [
          "Quartier Barcelona — ",
          SLOGAN
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hero__slogan-lead", "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { children: SLOGAN_LEAD }) }),
        /* @__PURE__ */ jsxs("span", { className: "hero__slogan-tail", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("span", { className: "hero__slogan-article", children: /* @__PURE__ */ jsx("span", { children: SLOGAN_ARTICLE }) }),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: "hero__slogan-rotator",
              ref: rotatorRef,
              style: widths[active] ? { width: `${widths[active]}px` } : void 0,
              children: [
                /* @__PURE__ */ jsx("span", { className: "hero__slogan-strut", "aria-hidden": "true", children: "​" }),
                SLOGAN_ROTATIONS.map((slogan, i) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "hero__slogan-wrap",
                    "data-active": i === active && entered,
                    children: /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "hero__slogan-word",
                        ref: (el) => {
                          wordRefs.current[i] = el;
                        },
                        children: slogan.word
                      }
                    )
                  },
                  slogan.id
                ))
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function About() {
  const { t } = useLanguage();
  const [line1, line2] = t.about.title.split("\n");
  return /* @__PURE__ */ jsx("section", { id: "sobre-nosotros", className: "about section velvet on-stone", children: /* @__PURE__ */ jsxs("div", { className: "shell about__grid", children: [
    /* @__PURE__ */ jsxs("div", { className: "about__text", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow about__eyebrow", "data-reveal": true, children: t.about.eyebrow }),
      /* @__PURE__ */ jsxs("h2", { className: "about__title", "data-reveal": true, style: { "--reveal-delay": "80ms" }, children: [
        /* @__PURE__ */ jsx("span", { children: line1 }),
        line2 && /* @__PURE__ */ jsx("span", { children: line2 })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "about__body", children: t.about.body.map((para, i) => /* @__PURE__ */ jsx(
        "p",
        {
          className: i === 0 ? "about__lead" : void 0,
          "data-reveal": true,
          style: { "--reveal-delay": `${160 + i * 60}ms` },
          children: para
        },
        i
      )) }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "about__closing",
          "data-reveal": true,
          style: { "--reveal-delay": `${160 + t.about.body.length * 60}ms` },
          children: t.about.closing
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "about__meta", "data-reveal": true, style: { "--reveal-delay": "240ms" }, children: [
        /* @__PURE__ */ jsx("hr", { className: "rule about__rule" }),
        /* @__PURE__ */ jsx("p", { className: "eyebrow about__caption", children: t.about.caption })
      ] })
    ] }),
    /* @__PURE__ */ jsx("figure", { className: "about__figure", "data-reveal": "mask", style: { "--reveal-delay": "120ms" }, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/img/about-portrait-1200.jpg",
        srcSet: "/img/about-portrait-800.jpg 800w, /img/about-portrait-1200.jpg 1200w, /img/about-portrait-1600.jpg 1600w",
        sizes: "(max-width: 900px) 100vw, 38vw",
        alt: t.about.imageAlt,
        width: "1200",
        height: "1800",
        loading: "lazy",
        decoding: "async"
      }
    ) })
  ] }) });
}
const LAYERS = [
  { id: "back", ampY: 24, ampX: -7 },
  { id: "mid", ampY: 52, ampX: 4 },
  { id: "front", ampY: 86, ampX: -5 }
];
const FRAMES = [
  {
    src: "/img/brand-moment-1000.jpg?v=2",
    srcSet: "/img/brand-moment-1000.jpg?v=2 1000w, /img/brand-moment-1600.jpg?v=2 1600w"
  },
  {
    src: "/img/brand-moment-2-1000.jpg",
    srcSet: "/img/brand-moment-2-1000.jpg 1000w, /img/brand-moment-2-1600.jpg 1600w"
  },
  {
    src: "/img/brand-moment-3-1000.jpg",
    srcSet: "/img/brand-moment-3-1000.jpg 1000w, /img/brand-moment-3-1600.jpg 1600w"
  }
];
const EASE = 0.085;
function BrandMoment() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const layerRefs = useRef([]);
  useEffect(() => {
    const section = sectionRef.current;
    const layers = layerRefs.current.filter(Boolean);
    if (!section || !layers.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let running = false;
    const current = layers.map(() => 0);
    let target = 0;
    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      target = Math.max(-1, Math.min(1, raw));
    };
    const tick = () => {
      let moving = false;
      layers.forEach((el, i) => {
        const { ampY, ampX } = LAYERS[i];
        current[i] += (target - current[i]) * EASE;
        if (Math.abs(target - current[i]) > 5e-4) moving = true;
        const y = (current[i] * ampY).toFixed(2);
        const x = (current[i] * ampX).toFixed(2);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      frame = running || moving ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      readTarget();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      readTarget();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) start();
      },
      { rootMargin: "25% 0px" }
    );
    io.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    readTarget();
    current.forEach((_, i) => current[i] = target);
    start();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      layers.forEach((el) => el.style.transform = "");
    };
  }, []);
  const alts = [t.brand.imageAlt, t.brand.imageAlt2, t.brand.imageAlt3];
  return /* @__PURE__ */ jsx("section", { className: "moment section", ref: sectionRef, "aria-label": t.brand.caption, children: /* @__PURE__ */ jsxs("div", { className: "shell", children: [
    /* @__PURE__ */ jsx("div", { className: "moment__collage", children: FRAMES.map((item, i) => /* @__PURE__ */ jsx(
      "figure",
      {
        className: "moment__layer",
        "data-layer": LAYERS[i].id,
        ref: (el) => {
          layerRefs.current[i] = el;
        },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "moment__img",
            src: item.src,
            srcSet: item.srcSet,
            sizes: "(max-width: 900px) 70vw, 34vw",
            alt: alts[i],
            width: "1600",
            height: "2223",
            loading: "lazy",
            decoding: "async"
          }
        )
      },
      LAYERS[i].id
    )) }),
    /* @__PURE__ */ jsx("p", { className: "eyebrow moment__caption", children: t.brand.caption })
  ] }) });
}
function VipExperience() {
  const { t } = useLanguage();
  const vip = t.vipExperience;
  return /* @__PURE__ */ jsx("section", { id: "vip-experience", className: "vip section on-stone", "aria-labelledby": "vip-title", children: /* @__PURE__ */ jsxs("div", { className: "shell vip__grid", children: [
    /* @__PURE__ */ jsxs("div", { className: "vip__text", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow vip__eyebrow", "data-reveal": true, children: vip.eyebrow }),
      /* @__PURE__ */ jsx("h2", { className: "vip__title", id: "vip-title", "data-reveal": true, style: { "--reveal-delay": "80ms" }, children: vip.title }),
      /* @__PURE__ */ jsx("p", { className: "vip__body", "data-reveal": true, style: { "--reveal-delay": "160ms" }, children: vip.body }),
      /* @__PURE__ */ jsxs("div", { className: "vip__cta-row", "data-reveal": true, style: { "--reveal-delay": "240ms" }, children: [
        /* @__PURE__ */ jsx(TicketsCta, { variant: "outline", size: "md", className: "vip__cta" }),
        /* @__PURE__ */ jsx("p", { className: "vip__note", children: vip.note })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vip__plates", children: [
      /* @__PURE__ */ jsx("figure", { className: "vip__plate", "data-plate": "a", "data-reveal": "mask", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/img/vip-table-1100.jpg",
          srcSet: "/img/vip-table-700.jpg 700w, /img/vip-table-1100.jpg 1100w, /img/vip-table-1500.jpg 1500w",
          sizes: "(max-width: 900px) 46vw, 26vw",
          alt: vip.imageAlt,
          width: "1100",
          height: "1650",
          loading: "lazy",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "figure",
        {
          className: "vip__plate",
          "data-plate": "b",
          "data-reveal": "mask",
          style: { "--reveal-delay": "140ms" },
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/img/vip-bottles-1100.jpg",
              srcSet: "/img/vip-bottles-700.jpg 700w, /img/vip-bottles-1100.jpg 1100w, /img/vip-bottles-1500.jpg 1500w",
              sizes: "(max-width: 900px) 46vw, 26vw",
              alt: vip.imageAlt2,
              width: "1100",
              height: "1527",
              loading: "lazy",
              decoding: "async"
            }
          )
        }
      )
    ] })
  ] }) });
}
function PrivateEvents() {
  const { t } = useLanguage();
  const pe = t.privateEvents;
  return /* @__PURE__ */ jsx("section", { id: "eventos-privados", className: "pev", "aria-labelledby": "pev-title", children: /* @__PURE__ */ jsxs("div", { className: "pev__grid", children: [
    /* @__PURE__ */ jsx("figure", { className: "pev__figure", "data-reveal": "mask", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/img/private-events-1400.jpg",
        srcSet: "/img/private-events-900.jpg 900w, /img/private-events-1400.jpg 1400w, /img/private-events-1900.jpg 1900w",
        sizes: "(max-width: 900px) 100vw, 58vw",
        alt: pe.imageAlt,
        width: "1400",
        height: "788",
        loading: "lazy",
        decoding: "async"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "pev__panel on-stone", children: /* @__PURE__ */ jsxs("div", { className: "pev__panel-inner", children: [
      /* @__PURE__ */ jsx("h2", { className: "pev__title", id: "pev-title", "data-reveal": true, children: pe.eyebrow }),
      /* @__PURE__ */ jsx("p", { className: "pev__subtitle", "data-reveal": true, style: { "--reveal-delay": "80ms" }, children: pe.title }),
      /* @__PURE__ */ jsxs("div", { className: "pev__copy", "data-reveal": true, style: { "--reveal-delay": "160ms" }, children: [
        /* @__PURE__ */ jsx("hr", { className: "rule" }),
        /* @__PURE__ */ jsx("p", { className: "pev__body", children: pe.body }),
        /* @__PURE__ */ jsx("p", { className: "pev__tagline", children: pe.tagline.replace(new RegExp("(?<!\\.)\\s+", "g"), " ") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pev__cta-row", "data-reveal": true, style: { "--reveal-delay": "240ms" }, children: /* @__PURE__ */ jsx(
        "a",
        {
          className: "cta cta--outline cta--md pev__cta",
          href: whatsappUrl(pe.whatsappMessage),
          target: "_blank",
          rel: "noopener noreferrer",
          children: /* @__PURE__ */ jsx("span", { className: "cta__label", children: pe.cta })
        }
      ) })
    ] }) })
  ] }) });
}
function Contact() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { id: "contacto", className: "contact section velvet", children: /* @__PURE__ */ jsxs("div", { className: "shell", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow contact__eyebrow", "data-reveal": true, children: t.contact.eyebrow }),
    /* @__PURE__ */ jsx("h2", { className: "contact__title", "data-reveal": true, style: { "--reveal-delay": "80ms" }, children: t.contact.title }),
    /* @__PURE__ */ jsxs("dl", { className: "contact__list", children: [
      /* @__PURE__ */ jsxs("div", { className: "contact__row", "data-reveal": true, style: { "--reveal-delay": "160ms" }, children: [
        /* @__PURE__ */ jsx("dt", { className: "eyebrow contact__label", children: t.contact.emailLabel }),
        /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx("a", { className: "contact__value", href: `mailto:${CONTACT.email}`, children: CONTACT.email }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "contact__row", "data-reveal": true, style: { "--reveal-delay": "220ms" }, children: [
        /* @__PURE__ */ jsx("dt", { className: "eyebrow contact__label", children: t.contact.phoneLabel }),
        /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx("a", { className: "contact__value", href: `tel:${CONTACT.phoneHref}`, children: CONTACT.phoneDisplay }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "contact__cta", "data-reveal": true, style: { "--reveal-delay": "300ms" }, children: [
      /* @__PURE__ */ jsx(TicketsCta, { variant: "outline", size: "md" }),
      /* @__PURE__ */ jsx("p", { className: "contact__cta-note", children: t.contact.ticketsLine })
    ] })
  ] }) });
}
function Footer() {
  const { t } = useLanguage();
  const { openTickets } = useTickets();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const links = [
    { id: "inicio", label: t.nav.home },
    { id: "sobre-nosotros", label: t.nav.about },
    { id: "vip-experience", label: t.nav.vipExperience },
    { id: "eventos-privados", label: t.nav.privateEvents },
    { id: "contacto", label: t.nav.contact }
  ];
  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id, { offset: navOffset() });
  };
  return /* @__PURE__ */ jsx("footer", { className: "foot", children: /* @__PURE__ */ jsxs("div", { className: "shell", children: [
    /* @__PURE__ */ jsxs("div", { className: "foot__top", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#inicio",
          className: "foot__logo",
          onClick: (e) => go(e, "inicio"),
          "aria-label": "Quartier Barcelona",
          children: /* @__PURE__ */ jsx("img", { src: "/brand/quartier-beige.png", alt: "", width: "1600", height: "381" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "foot__cols", children: [
        /* @__PURE__ */ jsxs("nav", { className: "foot__col", "aria-label": t.footer.navTitle, children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow foot__col-title", children: t.footer.navTitle }),
          links.map((l) => /* @__PURE__ */ jsx("a", { href: `#${l.id}`, className: "foot__link", onClick: (e) => go(e, l.id), children: l.label }, l.id)),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: TICKETS_VIP_URL,
              className: "foot__link foot__link--accent",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: (e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                openTickets();
              },
              children: t.nav.tickets
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "foot__col", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow foot__col-title", children: t.footer.contactTitle }),
          /* @__PURE__ */ jsx("a", { className: "foot__link", href: `mailto:${CONTACT.email}`, children: CONTACT.email }),
          /* @__PURE__ */ jsx("a", { className: "foot__link", href: `tel:${CONTACT.phoneHref}`, children: CONTACT.phoneDisplay })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "rule foot__rule" }),
    /* @__PURE__ */ jsxs("div", { className: "foot__partners", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow foot__partners-label", children: t.footer.partners }),
      /* @__PURE__ */ jsxs("ul", { className: "foot__partners-list", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/brand/partners/schweppes.png",
            alt: "Schweppes",
            width: "640",
            height: "213",
            loading: "lazy",
            decoding: "async"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/brand/partners/grey-goose.png",
            alt: "Grey Goose",
            width: "640",
            height: "426",
            loading: "lazy",
            decoding: "async"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/brand/partners/pepsi.png",
            alt: "Pepsi",
            width: "640",
            height: "629",
            loading: "lazy",
            decoding: "async"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "foot__bottom", children: [
      /* @__PURE__ */ jsxs("p", { className: "foot__copy", children: [
        "© ",
        year,
        " ",
        t.footer.rights
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "foot__legal", children: [
        /* @__PURE__ */ jsx("span", { className: "foot__legal-link foot__legal-link--pending", children: t.footer.legalPrivacy }),
        /* @__PURE__ */ jsx("span", { className: "foot__legal-sep", "aria-hidden": "true", children: "·" }),
        /* @__PURE__ */ jsx("span", { className: "foot__legal-link foot__legal-link--pending", children: t.footer.legalNotice })
      ] }),
      /* @__PURE__ */ jsx(LanguageSelector, { className: "foot__langs" })
    ] })
  ] }) });
}
function TicketsOverlay() {
  const { open, closeTickets } = useTickets();
  const { t } = useLanguage();
  const panelRef = useRef(null);
  const mountRef = useRef(null);
  const loadedRef = useRef(false);
  useEffect(() => {
    if (!open || loadedRef.current || !mountRef.current) return;
    loadedRef.current = true;
    const script = document.createElement("script");
    script.src = FOURVENUES_EMBED_SRC;
    script.async = true;
    mountRef.current.appendChild(script);
  }, [open]);
  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      var _a;
      if (e.key === "Escape") {
        closeTickets();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = (_a = panelRef.current) == null ? void 0 : _a.querySelectorAll("a[href], button:not([disabled])");
      if (!(focusable == null ? void 0 : focusable.length)) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => {
      var _a, _b;
      return (_b = (_a = panelRef.current) == null ? void 0 : _a.querySelector("button")) == null ? void 0 : _b.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open, closeTickets]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "tickets",
      "data-open": open,
      "aria-hidden": !open,
      ...open ? { role: "dialog", "aria-modal": "true", "aria-label": t.nav.tickets } : { inert: "" },
      ref: panelRef,
      children: [
        /* @__PURE__ */ jsxs("header", { className: "tickets__bar", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "tickets__logo",
              src: "/brand/quartier-beige.png",
              alt: "Quartier Barcelona",
              width: "1600",
              height: "381"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "eyebrow tickets__title", children: t.nav.tickets }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "tickets__close",
              onClick: closeTickets,
              "aria-label": t.nav.closeTickets,
              children: /* @__PURE__ */ jsxs("span", { className: "tickets__close-x", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx("i", {}),
                /* @__PURE__ */ jsx("i", {})
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "tickets__scroll", children: [
          /* @__PURE__ */ jsx("div", { className: "tickets__sheet", ref: mountRef, children: /* @__PURE__ */ jsx("div", { id: "fourvenues-iframe" }) }),
          /* @__PURE__ */ jsx("p", { className: "tickets__fallback", children: /* @__PURE__ */ jsx("a", { href: TICKETS_VIP_URL, target: "_blank", rel: "noopener noreferrer", children: t.nav.ticketsExternal }) })
        ] })
      ]
    }
  );
}
const LocationMap = lazy(() => import("./assets/LocationMap-CCUiIq3b.js"));
function App() {
  const { t } = useLanguage();
  const mainRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroPassed = useHeroPassed("inicio");
  useReveal(mainRef);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("a", { className: "skip-link", href: "#sobre-nosotros", children: t.nav.skipToContent }),
    /* @__PURE__ */ jsx(Navbar, { solid: heroPassed, menuOpen, onToggleMenu: toggleMenu }),
    /* @__PURE__ */ jsx(MobileMenu, { open: menuOpen, onClose: closeMenu }),
    /* @__PURE__ */ jsxs("main", { id: "main", ref: mainRef, children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(BrandMoment, {}),
      /* @__PURE__ */ jsx(VipExperience, {}),
      /* @__PURE__ */ jsx(PrivateEvents, {}),
      /* @__PURE__ */ jsx(Contact, {}),
      /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(LocationMap, {}) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(TicketsOverlay, {})
  ] });
}
function buildJsonLd(code) {
  const locale = localeFor(code);
  const seo = seoFor(code);
  const url = absoluteUrl(locale.path);
  const hasStreet = Boolean(LOCATION.street);
  const hasGeo = Number.isFinite(LOCATION.lat) && Number.isFinite(LOCATION.lng);
  const venue = {
    "@type": "NightClub",
    "@id": `${SITE_URL}/#venue`,
    name: "Quartier Barcelona",
    alternateName: "Quartier Pedralbes",
    description: seo.description,
    url,
    telephone: CONTACT.phoneHref,
    email: CONTACT.email,
    image: absoluteUrl(OG_IMAGE),
    logo: absoluteUrl("/brand/quartier-beige.png"),
    address: {
      "@type": "PostalAddress",
      ...hasStreet ? { streetAddress: LOCATION.street } : {},
      addressLocality: LOCATION.city,
      ...{ addressRegion: LOCATION.district },
      ...{ postalCode: LOCATION.postalCode },
      addressCountry: "ES"
    },
    ...hasGeo ? { geo: { "@type": "GeoCoordinates", latitude: LOCATION.lat, longitude: LOCATION.lng } } : {},
    ...SOCIAL.length ? { sameAs: SOCIAL } : {},
    // The ticketing platform is a genuine action available on the site.
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: TICKETS_VIP_URL },
      name: "Tickets & VIP tables"
    }
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Quartier Barcelona",
    inLanguage: locale.hreflang,
    publisher: { "@id": `${SITE_URL}/#venue` }
  };
  return { "@context": "https://schema.org", "@graph": [venue, website] };
}
function render(lang) {
  return renderToString(
    /* @__PURE__ */ jsx(LanguageProvider, { initialLanguage: lang, children: /* @__PURE__ */ jsx(TicketsProvider, { children: /* @__PURE__ */ jsx(App, {}) }) })
  );
}
export {
  GSC_VERIFICATION,
  LOCATION as L,
  LOCALES,
  OG_IMAGE,
  SITE_URL,
  addressLines as a,
  absoluteUrl,
  buildJsonLd,
  mapDirectionsUrl as m,
  render,
  seoFor,
  useLanguage as u
};
