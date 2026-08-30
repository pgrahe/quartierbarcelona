import { useLanguage } from '../i18n/LanguageContext'
import './About.css'

/**
 * Editorial "Sobre nosotros" — the beige block that breaks the page open.
 *
 * Asymmetric on desktop: type on the left across seven columns, a tall
 * portrait on the right that runs past the section's bottom padding and
 * overlaps the next section, so the two never read as stacked boxes.
 *
 * `eyebrow` is overridable — on /sobre-nosotros the page opens on this block
 * with `NUESTRA HISTORIA`, so the default about eyebrow can be replaced.
 */
export default function About({ eyebrow }) {
  const { t } = useLanguage()
  const [line1, line2] = t.about.title.split('\n')
  const coda = t.about.coda || []

  // The stagger runs straight down the column: lead, body, pull quote, coda,
  // caption. Each block picks up where the one above it left off.
  const closingDelay = 160 + t.about.body.length * 60
  const codaDelay = closingDelay + 60

  return (
    <section id="sobre-nosotros" className="about section">
      {/* Dark plaster ground — see `.tex` in styles/base.css. */}
      <div className="tex" aria-hidden="true" />

      <div className="shell about__grid">
        <div className="about__text">
          <p className="eyebrow about__eyebrow" data-reveal>
            {eyebrow || t.about.eyebrow}
          </p>

          <h2 className="about__title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            <span>{line1}</span>
            {line2 && <span>{line2}</span>}
          </h2>

          {/* Copy lives in src/i18n/translations.js → about.body / about.closing
              / about.coda. First paragraph reads as a lead, the closing line as
              a pull quote, and the coda picks the thread back up after it. */}
          <div className="about__body">
            {t.about.body.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? 'about__lead' : undefined}
                data-reveal
                style={{ '--reveal-delay': `${160 + i * 60}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          <p
            className="about__closing"
            data-reveal
            style={{ '--reveal-delay': `${closingDelay}ms` }}
          >
            {t.about.closing}
          </p>

          {coda.length > 0 && (
            <div className="about__coda">
              {coda.map((para, i) => (
                <p key={i} data-reveal style={{ '--reveal-delay': `${codaDelay + i * 60}ms` }}>
                  {para}
                </p>
              ))}
            </div>
          )}

          <div
            className="about__meta"
            data-reveal
            style={{ '--reveal-delay': `${codaDelay + coda.length * 60}ms` }}
          >
            <hr className="rule about__rule" />
            <p className="eyebrow about__caption">{t.about.caption}</p>
          </div>
        </div>

        <figure className="about__figure" data-reveal="mask" style={{ '--reveal-delay': '120ms' }}>
          <img
            src="/img/about-portrait-1200.jpg"
            srcSet="/img/about-portrait-800.jpg 800w, /img/about-portrait-1200.jpg 1200w, /img/about-portrait-1600.jpg 1600w"
            sizes="(max-width: 900px) 100vw, 38vw"
            alt={t.about.imageAlt}
            width="1200"
            height="1800"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
