import { CONTACT, INSTAGRAM_URL, LEGAL, TICKETS_VIP_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink } from '../router/RouteContext'
import { useTickets } from '../tickets/TicketsContext'
import LanguageSelector from './LanguageSelector'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const { openTickets } = useTickets()
  const year = new Date().getFullYear()

  const links = [
    { key: 'home', to: 'home', label: t.nav.home },
    { key: 'about', to: 'about', label: t.nav.about },
    { key: 'vip', to: 'vip', label: t.nav.vipExperience },
    { key: 'events', to: 'events', label: t.nav.privateEvents },
    { key: 'contact', to: 'home', hash: 'contacto', label: t.nav.contact },
  ]

  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <RouteLink to="home" className="foot__logo" aria-label="Quartier Barcelona">
            <img src="/brand/quartier-beige.png" alt="" width="1600" height="381" />
          </RouteLink>

          <div className="foot__cols">
            <nav className="foot__col" aria-label={t.footer.navTitle}>
              <p className="eyebrow foot__col-title">{t.footer.navTitle}</p>
              {links.map((l) => (
                <RouteLink key={l.key} to={l.to} hash={l.hash} className="foot__link">
                  {l.label}
                </RouteLink>
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
              <a
                className="foot__social"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.footer.instagram}
              >
                <svg
                  className="foot__social-icon"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect
                    x="2.75"
                    y="2.75"
                    width="18.5"
                    height="18.5"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="rule foot__rule" />

        <div className="foot__partners">
          <p className="eyebrow foot__partners-label">{t.footer.partners}</p>
          <ul className="foot__partners-list">
            <li>
              <img
                src="/brand/partners/schweppes.png"
                alt="Schweppes"
                width="640"
                height="213"
                loading="lazy"
                decoding="async"
              />
            </li>
            <li>
              <img
                src="/brand/partners/grey-goose.png"
                alt="Grey Goose"
                width="640"
                height="426"
                loading="lazy"
                decoding="async"
              />
            </li>
            <li>
              <img
                src="/brand/partners/pepsi.png"
                alt="Pepsi"
                width="640"
                height="629"
                loading="lazy"
                decoding="async"
              />
            </li>
          </ul>
        </div>

        <div className="foot__bottom">
          <p className="foot__copy">
            © {year} {t.footer.rights}
          </p>

          <div className="foot__legal">
            {/* The legal pages do not exist yet. Rendering them as dead
                `href="#"` anchors would give crawlers links that go nowhere
                and invite indexing of a phantom URL, so until LEGAL holds real
                paths they render as plain text. Set the paths in
                src/config/site.js and they become links automatically. */}
            {LEGAL.privacy && LEGAL.privacy !== '#' ? (
              <a href={LEGAL.privacy} className="foot__legal-link">
                {t.footer.legalPrivacy}
              </a>
            ) : (
              <span className="foot__legal-link foot__legal-link--pending">
                {t.footer.legalPrivacy}
              </span>
            )}
            <span className="foot__legal-sep" aria-hidden="true">
              ·
            </span>
            {LEGAL.notice && LEGAL.notice !== '#' ? (
              <a href={LEGAL.notice} className="foot__legal-link">
                {t.footer.legalNotice}
              </a>
            ) : (
              <span className="foot__legal-link foot__legal-link--pending">
                {t.footer.legalNotice}
              </span>
            )}
          </div>

          <LanguageSelector className="foot__langs" />
        </div>
      </div>
    </footer>
  )
}
