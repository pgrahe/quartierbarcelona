import { whatsappUrl } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import './PrivateEvents.css'

/**
 * Private events.
 *
 * Same editorial split as Location: a stone type panel locked to a full-bleed
 * photograph of the room. Copy is unchanged — only the composition moves so
 * this block reads with About / Location rather than as a generic dark promo.
 *
 * The CTA opens WhatsApp with the enquiry pre-written. Outline on stone, so it
 * never competes with the solid Tickets button.
 *
 * `title` is overridable because on /private-events the page header above
 * already says PRIVATE EVENTS, and a heading should never repeat the line
 * directly above it.
 */
export default function PrivateEvents({ title }) {
  const { t } = useLanguage()
  const pe = t.privateEvents

  return (
    <section id="eventos-privados" className="pev" aria-labelledby="pev-title">
      <div className="pev__grid">
        <figure className="pev__figure" data-reveal="mask">
          <img
            src="/img/private-events-1400.jpg"
            srcSet="/img/private-events-900.jpg 900w, /img/private-events-1400.jpg 1400w, /img/private-events-1900.jpg 1900w"
            sizes="(max-width: 900px) 100vw, 58vw"
            alt={pe.imageAlt}
            width="1400"
            height="788"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="pev__panel on-stone">
          <div className="pev__panel-inner">
            <h2 className="pev__title" id="pev-title" data-reveal>
              {title || pe.eyebrow}
            </h2>

            <p className="pev__subtitle" data-reveal style={{ '--reveal-delay': '80ms' }}>
              {pe.title}
            </p>

            <div className="pev__copy" data-reveal style={{ '--reveal-delay': '160ms' }}>
              <hr className="rule" />
              <p className="pev__body">{pe.body}</p>
              {/* One continuous line. Spaces inside a sentence are made
                  non-breaking, so where the line is too narrow to hold it — a
                  phone always is — it can only break after a full stop, never as
                  "Un espacio. Una / experiencia.". Works for all four languages
                  without hardcoding the breaks. */}
              <p className="pev__tagline">{pe.tagline.replace(/(?<!\.)\s+/g, ' ')}</p>
            </div>

            <div className="pev__cta-row" data-reveal style={{ '--reveal-delay': '240ms' }}>
              <a
                className="cta cta--outline cta--md pev__cta"
                href={whatsappUrl(pe.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cta__label">{pe.cta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
