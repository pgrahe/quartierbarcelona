import { useLanguage } from '../i18n/LanguageContext'
import './NightStack.css'

/**
 * Night stack — three portraits before Contact.
 *
 * Mobile: sticky plates that pin over each other on scroll.
 * Desktop: a single row with a staggered entrance and a light hover lift.
 */

const FRAMES = [
  {
    src: '/img/night-stack-a-1100.jpg',
    srcSet: '/img/night-stack-a-700.jpg 700w, /img/night-stack-a-1100.jpg 1100w',
    altKey: 'imageAlt',
  },
  {
    src: '/img/night-stack-b-1100.jpg',
    srcSet: '/img/night-stack-b-700.jpg 700w, /img/night-stack-b-1100.jpg 1100w',
    altKey: 'imageAlt2',
  },
  {
    src: '/img/night-stack-c-1100.jpg',
    srcSet: '/img/night-stack-c-700.jpg 700w, /img/night-stack-c-1100.jpg 1100w',
    altKey: 'imageAlt3',
  },
]

export default function NightStack() {
  const { t } = useLanguage()
  const ns = t.nightStack

  return (
    <section className="nstack section" aria-label={ns.caption}>
      <div className="shell nstack__shell">
        <div className="nstack__plates">
          {FRAMES.map((frame, i) => (
            <figure
              key={frame.src}
              className="nstack__plate"
              style={{ '--z': i + 1, '--reveal-delay': `${i * 80}ms` }}
              data-reveal="mask"
            >
              <img
                src={frame.src}
                srcSet={frame.srcSet}
                sizes="(max-width: 900px) 78vw, 30vw"
                alt={ns[frame.altKey]}
                width="1100"
                height="1650"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
