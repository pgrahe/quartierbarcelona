import { CONTACT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './Contact.css'

/**
 * Contact. Two facts, set large, and the CTA. No form, no hours, no social —
 * nothing that isn't confirmed by the project material.
 */
export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contacto" className="contact section velvet">
      <div className="shell">
        <p className="eyebrow contact__eyebrow" data-reveal>
          {t.contact.eyebrow}
        </p>

        <h2 className="contact__title" data-reveal style={{ '--reveal-delay': '80ms' }}>
          {t.contact.title}
        </h2>

        <dl className="contact__list">
          <div className="contact__row" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <dt className="eyebrow contact__label">{t.contact.emailLabel}</dt>
            <dd>
              <a className="contact__value" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </dd>
          </div>

          <div className="contact__row" data-reveal style={{ '--reveal-delay': '220ms' }}>
            <dt className="eyebrow contact__label">{t.contact.phoneLabel}</dt>
            <dd>
              <a className="contact__value" href={`tel:${CONTACT.phoneHref}`}>
                {CONTACT.phoneDisplay}
              </a>
            </dd>
          </div>
        </dl>

        <div className="contact__cta" data-reveal style={{ '--reveal-delay': '300ms' }}>
          <TicketsCta variant="outline" size="md" />
          <p className="contact__cta-note">{t.contact.ticketsLine}</p>
        </div>
      </div>
    </section>
  )
}
