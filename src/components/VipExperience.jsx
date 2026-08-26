import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './VipExperience.css'

/**
 * VIP experience — sits between the brand moment and Private Events.
 *
 * Title, one night photograph, then the pitch. On stone rather than black so
 * the sections that follow (all dark) get a break — and a night photograph
 * lands hardest against beige.
 *
 * The CTA is the site's primary one: this section is the argument for exactly
 * the action TICKETS Y MESAS VIP performs, so it reuses it rather than
 * inventing a second, competing button.
 */
export default function VipExperience() {
  const { t } = useLanguage()
  const vip = t.vipExperience

  return (
    <section id="vip-experience" className="vip section on-stone" aria-labelledby="vip-title">
      <div className="shell vip__layout">
        <div className="vip__head">
          <p className="eyebrow vip__eyebrow" data-reveal>
            {vip.eyebrow}
          </p>

          <h2 className="vip__title" id="vip-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            {vip.title}
          </h2>
        </div>

        <figure className="vip__plate" data-reveal="mask">
          <img
            src="/img/vip-table-1100.jpg"
            srcSet="/img/vip-table-700.jpg 700w, /img/vip-table-1100.jpg 1100w, /img/vip-table-1500.jpg 1500w"
            sizes="(max-width: 900px) 88vw, 32rem"
            alt={vip.imageAlt}
            width="1100"
            height="1650"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="vip__copy">
          <p className="vip__body" data-reveal>
            {vip.body}
          </p>

          <div className="vip__cta-row" data-reveal style={{ '--reveal-delay': '80ms' }}>
            <TicketsCta variant="outline" size="md" className="vip__cta" />
            <p className="vip__note">{vip.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
