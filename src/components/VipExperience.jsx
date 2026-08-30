import { useLanguage } from '../i18n/LanguageContext'
import TicketsCta from './TicketsCta'
import './VipExperience.css'

/**
 * VIP experience.
 *
 * On desktop: type on one side, the night photograph on the other.
 * On mobile: full-bleed plate first, then title + pitch left-aligned under it.
 *
 * `eyebrow` is overridable because on /vip-experience the page header above
 * already says VIP EXPERIENCE, and a label should never repeat the line
 * directly above it.
 */
export default function VipExperience({ eyebrow }) {
  const { t } = useLanguage()
  const vip = t.vipExperience

  return (
    <section id="vip-experience" className="vip section" aria-labelledby="vip-title">
      {/* Dark plaster ground — see `.tex` in styles/base.css. */}
      <div className="tex" aria-hidden="true" />

      <div className="shell vip__layout">
        <div className="vip__head">
          <p className="eyebrow vip__eyebrow" data-reveal>
            {eyebrow || vip.eyebrow}
          </p>

          <h2 className="vip__title" id="vip-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            {vip.title}
          </h2>
        </div>

        <figure className="vip__plate" data-reveal="mask">
          <img
            src="/img/vip-table-1100.jpg"
            srcSet="/img/vip-table-700.jpg 700w, /img/vip-table-1100.jpg 1100w, /img/vip-table-1500.jpg 1500w"
            sizes="(max-width: 900px) 100vw, 38vw"
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
