import { useLanguage } from '../i18n/LanguageContext'
import { navOffset, scrollToSection } from '../lib/scrollTo'
import LanguageSelector from './LanguageSelector'
import TicketsCta from './TicketsCta'
import './Navbar.css'

/**
 * Desktop navigation.
 *
 * Floats transparently over the hero, then settles into a near-solid bar with
 * a hairline rule once the hero is behind us. On mobile it carries only the
 * hamburger, and only after the hero — the hero itself keeps its own minimal
 * logo + CTA pair (see Hero).
 */
export default function Navbar({ solid, menuOpen, onToggleMenu }) {
  const { t } = useLanguage()

  const links = [
    { id: 'inicio', label: t.nav.home },
    { id: 'sobre-nosotros', label: t.nav.about },
    { id: 'vip-experience', label: t.nav.vipExperienceShort },
    // Short label here only: the full one overflows the bar around 900–1024px.
    { id: 'eventos-privados', label: t.nav.privateEventsShort },
    { id: 'contacto', label: t.nav.contact },
  ]

  const go = (e, id) => {
    e.preventDefault()
    scrollToSection(id, { offset: navOffset() })
  }

  return (
    <header className="nav" data-solid={solid} data-menu-open={menuOpen}>
      <div className="nav__inner">
        <a
          href="#inicio"
          className="nav__logo"
          onClick={(e) => go(e, 'inicio')}
          aria-label="Quartier Barcelona"
        >
          <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
        </a>

        <nav className="nav__links" aria-label={t.nav.menu}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="nav__link" onClick={(e) => go(e, l.id)}>
              {l.label}
            </a>
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
