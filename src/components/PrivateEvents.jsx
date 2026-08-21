import { whatsappUrl } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import './PrivateEvents.css'

/**
 * Private events.
 *
 * Sits between the brand moment and Contact: it is a commercial ask, so it
 * only works once the brand has done its job, and it hands straight over to
 * Contact afterwards.
 *
 * Composition is deliberately the mirror of About — image left, type right —
 * so the two editorial sections do not read as the same template twice. The
 * photograph is the venue itself, landscape, which is why this section is
 * image-led rather than portrait-led.
 *
 * The CTA opens WhatsApp with the enquiry pre-written. It is styled as a
 * secondary action: it must never compete with TICKETS Y MESAS VIP, which is
 * a different audience and a different funnel.
 */
export default function PrivateEvents() {
  const { t } = useLanguage()
  const pe = t.privateEvents

  return (
    <section id="eventos-privados" className="pev section velvet" aria-labelledby="pev-title">
      <div className="shell pev__grid">
        <figure className="pev__figure" data-reveal="mask">
          <img
            src="/img/private-events-1400.jpg"
            srcSet="/img/private-events-900.jpg 900w, /img/private-events-1400.jpg 1400w, /img/private-events-1900.jpg 1900w"
            sizes="(max-width: 900px) 100vw, 56vw"
            alt={pe.imageAlt}
            width="1400"
            height="788"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="pev__text">
          <h2 className="pev__title" id="pev-title" data-reveal>
            {pe.eyebrow}
          </h2>

          <p className="pev__subtitle" data-reveal style={{ '--reveal-delay': '80ms' }}>
            {pe.title}
          </p>

          <p className="pev__body" data-reveal style={{ '--reveal-delay': '160ms' }}>
            {pe.body}
          </p>

          {/* One continuous line. Spaces inside a sentence are made
              non-breaking, so where the line is too narrow to hold it — a
              phone always is — it can only break after a full stop, never as
              "Un espacio. Una / experiencia.". Works for all four languages
              without hardcoding the breaks. */}
          <p className="pev__tagline" data-reveal style={{ '--reveal-delay': '220ms' }}>
            {pe.tagline.replace(/(?<!\.)\s+/g, ' ')}
          </p>

          <div className="pev__cta-row" data-reveal style={{ '--reveal-delay': '300ms' }}>
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
    </section>
  )
}
