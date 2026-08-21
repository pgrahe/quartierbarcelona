import { useLanguage } from '../i18n/LanguageContext'
import './BrandMoment.css'

/**
 * Three campaign photographs stacked on a black field.
 *
 * Not a full-bleed carousel: each frame is a contained portrait that sticks
 * as you scroll, so the next one slides up and overlaps the one beneath —
 * a short stack, not three screens of page.
 */
const FRAMES = [
  {
    id: '1',
    src: '/img/brand-moment-1000.jpg?v=2',
    srcSet: '/img/brand-moment-1000.jpg?v=2 1000w, /img/brand-moment-1600.jpg?v=2 1600w',
  },
  {
    id: '2',
    src: '/img/brand-moment-2-1000.jpg',
    srcSet: '/img/brand-moment-2-1000.jpg 1000w, /img/brand-moment-2-1600.jpg 1600w',
  },
  {
    id: '3',
    src: '/img/brand-moment-3-1000.jpg',
    srcSet: '/img/brand-moment-3-1000.jpg 1000w, /img/brand-moment-3-1600.jpg 1600w',
  },
]

export default function BrandMoment() {
  const { t } = useLanguage()
  const alts = [t.brand.imageAlt, t.brand.imageAlt2, t.brand.imageAlt3]

  return (
    <section className="moment section" aria-label={t.brand.caption}>
      <div className="moment__stage">
        {FRAMES.map((item, i) => (
          <figure
            key={item.id}
            className="moment__card"
            style={{ '--i': i, '--reveal-delay': `${i * 90}ms` }}
            data-reveal="mask"
          >
            <img
              className="moment__img"
              src={item.src}
              srcSet={item.srcSet}
              sizes="(max-width: 900px) 86vw, min(42rem, 52vw)"
              alt={alts[i]}
              width="1600"
              height="2223"
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>

      <p className="eyebrow moment__caption" data-reveal style={{ '--reveal-delay': '160ms' }}>
        {t.brand.caption}
      </p>
    </section>
  )
}
