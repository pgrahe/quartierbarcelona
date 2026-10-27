import { useEffect, useRef } from 'react'
import { CONTACT, LOCATION, TICKETS_ENABLED } from '../config/site'
import { useEvents } from '../hooks/useEvents'
import { useLanguage } from '../i18n/LanguageContext'
import { formatEventDate } from '../lib/eventDate'
import { RouteLink } from '../router/RouteContext'
import TicketsCta from './TicketsCta'
import './UpcomingEvents.css'

const AUTOPLAY_MS = 5000
const RESUME_MS = 8000

/**
 * OPENING SERIES — flyers from /api/events.
 *
 * Mobile carousel, one flyer per screen. Desktop carousel, as many as fit.
 * The first card is the night that has not finished yet.
 */

function FlyerCarousel({ events, lang, labels }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || events.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let resumeAt = 0

    const stride = () => {
      const slide = track.querySelector('.agenda__slide')
      if (!slide) return track.clientWidth
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
      return slide.getBoundingClientRect().width + gap
    }

    const advance = () => {
      if (document.hidden || Date.now() < resumeAt) return
      const step = stride()
      const max = track.scrollWidth - track.clientWidth
      const atEnd = track.scrollLeft >= max - 8
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' })
    }

    const pause = () => {
      resumeAt = Date.now() + RESUME_MS
    }

    const timer = window.setInterval(advance, AUTOPLAY_MS)
    track.addEventListener('pointerdown', pause)
    track.addEventListener('wheel', pause, { passive: true })
    track.addEventListener('keydown', pause)
    track.addEventListener('touchstart', pause, { passive: true })

    return () => {
      window.clearInterval(timer)
      track.removeEventListener('pointerdown', pause)
      track.removeEventListener('wheel', pause)
      track.removeEventListener('keydown', pause)
      track.removeEventListener('touchstart', pause)
    }
  }, [events.length])

  return (
    <div className="agenda__viewport" data-reveal style={{ '--reveal-delay': '160ms' }}>
      <ul ref={trackRef} className="agenda__carousel">
        {events.map((event) => (
          <li key={event.id} className="agenda__slide">
            <EventCard event={event} lang={lang} labels={labels} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function EventCard({ event, lang, labels }) {
  const spoken = event.date ? formatEventDate(event.date, lang) : null
  const accessibleName = [labels.cardLabel, event.title, spoken?.full || event.fecha]
    .filter(Boolean)
    .join(' — ')

  const body = (
    <div className="agenda__media">
      {event.image ? (
        <img
          src={event.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="agenda__media-empty" aria-hidden="true" />
      )}
    </div>
  )

  if (TICKETS_ENABLED && event.embed) {
    return (
      <RouteLink
        to="tickets"
        search={{ e: event.embed }}
        className="agenda__card"
        aria-label={accessibleName}
      >
        {body}
      </RouteLink>
    )
  }

  if (TICKETS_ENABLED && event.href) {
    return (
      <a
        className="agenda__card"
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={accessibleName}
      >
        {body}
      </a>
    )
  }

  return (
    <article className="agenda__card" aria-label={accessibleName}>
      {body}
    </article>
  )
}

export default function UpcomingEvents() {
  const { t, lang } = useLanguage()
  const a = t.agenda
  const { events, status } = useEvents()

  if (status === 'loading') return null

  const street = LOCATION.street.replace(/^Carrer de\s+/i, '').toUpperCase()

  return (
    <section id="agenda" className="agenda section" aria-labelledby="agenda-title">
      <div className="shell">
        <h2 className="agenda__title" id="agenda-title" data-reveal>
          {a.title}
        </h2>

        {events.length > 0 && (
          <FlyerCarousel events={events} lang={lang} labels={a} />
        )}

        <footer className="agenda__brand" data-reveal style={{ '--reveal-delay': '280ms' }}>
          <TicketsCta variant="outline" size="md" className="agenda__cta" />
          <p className="agenda__meta">
            <span>{street}</span>
            <span>INFO &amp; BOOKINGS · {CONTACT.phoneDisplay}</span>
          </p>
        </footer>
      </div>
    </section>
  )
}
