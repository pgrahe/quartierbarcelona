import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink } from '../router/RouteContext'
import './Explore.css'

/**
 * The bridge between pages — a compact directory of routes, not a gallery.
 *
 * On the home page it carries all three destinations; at the foot of a
 * content page it carries the other two. Each entry is a short strip: index,
 * name, one line of copy and a thumbnail. Photographs stay present without
 * owning a full viewport of scroll.
 */
const CARDS = [
  {
    route: 'about',
    navKey: 'about',
    copyKey: 'about',
    altKey: 'aboutImageAlt',
    src: '/img/about-portrait-1200.jpg',
    srcSet:
      '/img/about-portrait-800.jpg 800w, /img/about-portrait-1200.jpg 1200w, /img/about-portrait-1600.jpg 1600w',
    width: 1200,
    height: 1800,
  },
  {
    route: 'vip',
    navKey: 'vipExperience',
    copyKey: 'vip',
    altKey: 'vipImageAlt',
    src: '/img/vip-bottles-1100.jpg',
    srcSet: '/img/vip-bottles-700.jpg 700w, /img/vip-bottles-1100.jpg 1100w, /img/vip-bottles-1500.jpg 1500w',
    width: 1100,
    height: 1527,
  },
  {
    route: 'events',
    navKey: 'privateEvents',
    copyKey: 'events',
    altKey: 'eventsImageAlt',
    src: '/img/private-events-1400.jpg',
    srcSet:
      '/img/private-events-900.jpg 900w, /img/private-events-1400.jpg 1400w, /img/private-events-1900.jpg 1900w',
    width: 1400,
    height: 788,
  },
]

/** `exclude` is the route the visitor is already on. */
export default function Explore({ exclude }) {
  const { t } = useLanguage()
  const ex = t.explore
  const cards = CARDS.filter((c) => c.route !== exclude)

  if (!cards.length) return null

  return (
    <section className="explore section velvet on-stone" aria-labelledby="explore-title">
      <div className="shell">
        <div className="explore__head">
          <p className="eyebrow explore__eyebrow" data-reveal>
            {ex.eyebrow}
          </p>

          <h2
            className="explore__title"
            id="explore-title"
            data-reveal
            style={{ '--reveal-delay': '80ms' }}
          >
            {exclude ? ex.titleAlt : ex.title}
          </h2>
        </div>

        <ul className="explore__list" data-count={cards.length}>
          {cards.map((card, i) => (
            <li key={card.route} className="explore__item" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
              <article className="ecard">
                <figure className="ecard__figure">
                  <img
                    src={card.src}
                    srcSet={card.srcSet}
                    sizes="(max-width: 900px) 28vw, 12rem"
                    alt={ex[card.altKey]}
                    width={card.width}
                    height={card.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <div className="ecard__body">
                  <p className="eyebrow ecard__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>

                  <h3 className="ecard__title">
                    <RouteLink to={card.route} className="ecard__link">
                      {t.nav[card.navKey]}
                    </RouteLink>
                  </h3>

                  <p className="ecard__copy">{ex[card.copyKey]}</p>
                </div>

                <p className="ecard__more" aria-hidden="true">
                  <svg className="ecard__arrow" viewBox="0 0 24 12" focusable="false">
                    <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
