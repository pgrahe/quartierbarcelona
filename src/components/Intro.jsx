import { useLanguage } from '../i18n/LanguageContext'
import { img, imgSrcSet } from '../lib/img'
import './Intro.css'


/**
 * Home beat under the film — the stone "A NEW CHAPTER" editorial from the
 * hero-perfection era: eyebrow, title, body, closing line, caption, portrait.
 *
 * Same voice as /sobre-nosotros, shorter stack (no coda). Left-aligned on
 * stone so the page opens into type, not a centred card on dark.
 */
export default function Intro() {
  const { t } = useLanguage()
  const [line1, line2] = t.about.title.split('\n')
  const closingDelay = 160 + t.about.body.length * 60

  return (
    <section id="intro" className="intro section velvet on-stone" aria-labelledby="intro-title">
      <div className="shell intro__grid">
        <div className="intro__text">
          <p className="eyebrow intro__eyebrow" data-reveal>
            {t.about.eyebrow}
          </p>

          <h2 className="intro__title" id="intro-title" data-reveal style={{ '--reveal-delay': '80ms' }}>
            <span>{line1}</span>
            {line2 && <span>{line2}</span>}
          </h2>

          <div className="intro__body">
            {t.about.body.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? 'intro__lead' : undefined}
                data-reveal
                style={{ '--reveal-delay': `${160 + i * 60}ms` }}
              >
                {para}
              </p>
            ))}
          </div>

          <p
            className="intro__closing"
            data-reveal
            style={{ '--reveal-delay': `${closingDelay}ms` }}
          >
            {t.about.closing}
          </p>

          <div
            className="intro__meta"
            data-reveal
            style={{ '--reveal-delay': `${closingDelay + 60}ms` }}
          >
            <hr className="rule intro__rule" />
            <p className="eyebrow intro__caption">{t.about.caption}</p>
          </div>
        </div>

        <figure className="intro__figure" data-reveal="mask" style={{ '--reveal-delay': '120ms' }}>
          <img
            src={img('/img/about-portrait-1200.jpg')}
            srcSet={imgSrcSet([
              ['/img/about-portrait-800.jpg', '800w'],
              ['/img/about-portrait-1200.jpg', '1200w'],
              ['/img/about-portrait-1600.jpg', '1600w'],
            ])}
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
