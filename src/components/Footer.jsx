import { CONTACT, LEGAL, TICKETS_VIP_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { navOffset, scrollToSection } from '../lib/scrollTo'
import { useTickets } from '../tickets/TicketsContext'
import LanguageSelector from './LanguageSelector'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const { openTickets } = useTickets()
  const year = new Date().getFullYear()

  const links = [
    { id: 'inicio', label: t.nav.home },
    { id: 'sobre-nosotros', label: t.nav.about },
    { id: 'eventos-privados', label: t.nav.privateEvents },
    { id: 'contacto', label: t.nav.contact },
  ]

  const go = (e, id) => {
    e.preventDefault()
    scrollToSection(id, { offset: navOffset() })
  }

  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <a
            href="#inicio"
            className="foot__logo"
            onClick={(e) => go(e, 'inicio')}
            aria-label="Quartier Barcelona"
          >
            <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
          </a>

          <div className="foot__cols">
            <nav className="foot__col" aria-label={t.footer.navTitle}>
              <p className="eyebrow foot__col-title">{t.footer.navTitle}</p>
              {links.map((l) => (
                <a key={l.id} href={`#${l.id}`} className="foot__link" onClick={(e) => go(e, l.id)}>
                  {l.label}
                </a>
              ))}
              <a
                href={TICKETS_VIP_URL}
                className="foot__link foot__link--accent"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                  e.preventDefault()
                  openTickets()
                }}
              >
                {t.nav.tickets}
              </a>
            </nav>

            <div className="foot__col">
              <p className="eyebrow foot__col-title">{t.footer.contactTitle}</p>
              <a className="foot__link" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              <a className="foot__link" href={`tel:${CONTACT.phoneHref}`}>
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <hr className="rule foot__rule" />

        <div className="foot__bottom">
          <p className="foot__copy">
            © {year} {t.footer.rights}
          </p>

          <div className="foot__legal">
            {/* Legal pages are not built yet — see LEGAL in src/config/site.js */}
            <a href={LEGAL.privacy} className="foot__legal-link">
              {t.footer.legalPrivacy}
            </a>
            <span className="foot__legal-sep" aria-hidden="true">
              ·
            </span>
            <a href={LEGAL.notice} className="foot__legal-link">
              {t.footer.legalNotice}
            </a>
          </div>

          <LanguageSelector className="foot__langs" />
        </div>
      </div>
    </footer>
  )
}
