import { useLanguage } from '../i18n/LanguageContext'
import './PhotoMarquee.css'

/**
 * Infinite photo marquee between Private Events and Contact.
 *
 * Two identical tracks sit side by side; CSS translates the row by exactly
 * half its width, so the loop never jumps. No JS timer — only CSS animation.
 */

const FRAMES = [
  { id: '01', altKey: 'imageAlt' },
  { id: '02', altKey: 'imageAlt2' },
  { id: '03', altKey: 'imageAlt3' },
  { id: '04', altKey: 'imageAlt4' },
  { id: '05', altKey: 'imageAlt5' },
]

function Track({ alts, ariaHidden }) {
  return (
    <div className="marquee__track" aria-hidden={ariaHidden || undefined}>
      {FRAMES.map((frame) => (
        <figure key={`${ariaHidden ? 'b' : 'a'}-${frame.id}`} className="marquee__plate">
          <img
            src={`/img/marquee-${frame.id}-1200.jpg`}
            srcSet={`/img/marquee-${frame.id}-800.jpg 800w, /img/marquee-${frame.id}-1200.jpg 1200w`}
            sizes="(max-width: 900px) 52vw, 18rem"
            alt={ariaHidden ? '' : alts[frame.altKey]}
            width="1200"
            height="1800"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </figure>
      ))}
    </div>
  )
}

export default function PhotoMarquee() {
  const { t } = useLanguage()
  const m = t.photoMarquee

  return (
    <section className="marquee section" aria-label={m.caption}>
      <div className="marquee__viewport">
        <div className="marquee__row">
          <Track alts={m} />
          <Track alts={m} ariaHidden />
        </div>
      </div>
    </section>
  )
}
