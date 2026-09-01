import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink, useRoute } from '../router/RouteContext'
import LanguageSelector from './LanguageSelector'
import TicketsCta from './TicketsCta'
import './Navbar.css'

/**
 * Desktop navigation.
 *
 * Floats transparent over the page. Logo, links and hamburger use
 * `mix-blend-mode: difference` so they read black on light grounds and white
 * on dark ones — no solid bar. On mobile the chrome only appears once the
 * hero has scrolled past (`solid`); the hero keeps its own logo + CTA until then.
 *
 * Every link is a real URL. Home and Contact point at the home page, Contact
 * with a hash, so it scrolls when you are already there and navigates first
 * when you are not.
 */
export default function Navbar({ solid, menuOpen, onToggleMenu }) {
  const { t } = useLanguage()
  const { routeId } = useRoute()

  const links = [
    { key: 'home', to: 'home', label: t.nav.home },
    { key: 'about', to: 'about', label: t.nav.about },
    { key: 'vip', to: 'vip', label: t.nav.vipExperienceShort },
    // Short label here only: the full one overflows the bar around 900–1024px.
    { key: 'events', to: 'events', label: t.nav.privateEventsShort },
    { key: 'contact', to: 'home', hash: 'contacto', label: t.nav.contact },
  ]

  return (
    <header className="nav" data-solid={solid} data-menu-open={menuOpen}>
      <div className="nav__inner">
        <RouteLink to="home" className="nav__logo" aria-label="Quartier Barcelona">
          <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
        </RouteLink>

        <nav className="nav__links" aria-label={t.nav.menu}>
          {links.map((l) => (
            <RouteLink
              key={l.key}
              to={l.to}
              hash={l.hash}
              className="nav__link"
              data-active={!l.hash && l.to === routeId}
            >
              {l.label}
            </RouteLink>
          ))}
        </nav>

        <div className="nav__end">
          <LanguageSelector className="nav__langs" />
          <TicketsCta className="nav__cta" />
        </div>

        {/* Mobile only, and only once the hero is behind us. */}
        <button
          type="button"
          className="nav__burger"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          <span className="nav__burger-bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
    </header>
  )
}
