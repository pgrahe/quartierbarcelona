import { useCallback, useEffect, useRef, useState } from 'react'
import { EVENTS } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { formatEventDate } from '../lib/eventDate'
import { useTickets } from '../tickets/TicketsContext'
import TicketsCta from './TicketsCta'
import './UpcomingEvents.css'

/**
 * PRÓXIMOS EVENTOS — the programme as flyers.
 *
 * Mobile: one flyer at a time; the visitor swipes sideways (no autoplay).
 * Desktop: all flyers in a row. Dots track the swipe on small screens.
 * The CTA opens the on-site Fourvenues calendar overlay.
 */

function Flyer({ event, lang, labels, ticketsLabel }) {
  const { openTickets } = useTickets()
  const date = formatEventDate(event.date, lang)

  return (
    <article className="flyer">
      <span className="flyer__glow" aria-hidden="true" />
      <span className="flyer__grain" aria-hidden="true" />
      <span className="flyer__sheen" aria-hidden="true" />

      <div className="flyer__top">
        <span className="eyebrow flyer__tag">{event.age}</span>
        {date && <span className="eyebrow flyer__weekday">{date.weekday}</span>}
      </div>

      <div className="flyer__mark">
        <img
          src="/brand/quartier-beige.png"
          alt=""
          width="1600"
          height="381"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flyer__foot">
        {date && (
          <p className="flyer__date">
            <time dateTime={date.iso}>
              <span className="flyer__day">{date.day}</span>
              <span className="flyer__month">
                {date.month}
                <span className="flyer__year">{date.year}</span>
              </span>
            </time>
          </p>
        )}

        <h3 className="flyer__title">{event.title}</h3>

        <button type="button" className="flyer__action" onClick={openTickets}>
          <span className="flyer__action-label" aria-hidden="true">
            {ticketsLabel}
          </span>
          <svg className="flyer__arrow" viewBox="0 0 24 12" aria-hidden="true" focusable="false">
            <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="visually-hidden">
            {labels.cardLabel} — {event.title}
            {date ? `, ${date.full}` : ''}
          </span>
        </button>
      </div>
    </article>
  )
}

export default function UpcomingEvents() {
  const { t, lang } = useLanguage()
  const a = t.agenda
  const ticketsLabel = t.nav.tickets
  const [index, setIndex] = useState(0)
  const viewportRef = useRef(null)
  const count = EVENTS.length

  const goTo = useCallback((i) => {
    const viewport = viewportRef.current
    if (!viewport || !count) return
    const next = ((i % count) + count) % count
    const item = viewport.querySelectorAll('.agenda__item')[next]
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    }
    setIndex(next)
  }, [count])

  // Keep the dots in sync with a manual swipe.
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || count < 2) return

    const onScroll = () => {
      const w = viewport.clientWidth || 1
      const i = Math.round(viewport.scrollLeft / w)
      setIndex(Math.max(0, Math.min(count - 1, i)))
    }

    viewport.addEventListener('scroll', onScroll, { passive: true })
    return () => viewport.removeEventListener('scroll', onScroll)
  }, [count])

  if (!count) return null

  return (
    <section id="agenda" className="agenda section velvet" aria-labelledby="agenda-title">
      <div className="shell">
        <div className="agenda__head">
          <p className="eyebrow agenda__eyebrow" data-reveal>
            {a.eyebrow}
          </p>

          <h2
            className="agenda__title"
            id="agenda-title"
            data-reveal
            style={{ '--reveal-delay': '80ms' }}
          >
            {a.title}
          </h2>

          <p className="agenda__lead" data-reveal style={{ '--reveal-delay': '160ms' }}>
            {a.lead}
          </p>
        </div>

        <div className="agenda__carousel" data-reveal style={{ '--reveal-delay': '200ms' }}>
          <div className="agenda__viewport" ref={viewportRef}>
            <ul className="agenda__track">
              {EVENTS.map((event) => (
                <li key={event.id} className="agenda__item">
                  <Flyer event={event} lang={lang} labels={a} ticketsLabel={ticketsLabel} />
                </li>
              ))}
            </ul>
          </div>

          {count > 1 && (
            <div className="agenda__dots" role="tablist" aria-label={a.title}>
              {EVENTS.map((event, i) => (
                <button
                  key={event.id}
                  type="button"
                  role="tab"
                  className="agenda__dot"
                  aria-selected={i === index}
                  aria-label={event.title}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="agenda__foot" data-reveal>
          <TicketsCta variant="outline" size="md" label={a.cta} className="agenda__cta" />
          <p className="agenda__note">{a.note}</p>
        </div>
      </div>
    </section>
  )
}
