import { CONTACT, LOCATION, TICKETS_ENABLED } from '../config/site'
import { useEvents } from '../hooks/useEvents'
import { useLanguage } from '../i18n/LanguageContext'
import { formatEventDate } from '../lib/eventDate'
import TicketsCta from './TicketsCta'
import './UpcomingEvents.css'

/**
 * THIS WEEK — cards from the OpenSheet API.
 *
 * Desktop 4 / tablet 2 / mobile 1. Each row is titulo, fecha, imagen,
 * fourvenues. Nothing is hardcoded.
 */

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
          <ul className="agenda__grid" data-reveal style={{ '--reveal-delay': '160ms' }}>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} lang={lang} labels={a} />
              </li>
            ))}
          </ul>
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
