import { TICKETS_VIP_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { useTickets } from '../tickets/TicketsContext'
import './TicketsCta.css'

/**
 * The site's one and only primary CTA. Every placement — navbar, mobile hero,
 * mobile menu, contact, footer — renders this, so behaviour and destination
 * are defined in exactly one place.
 *
 * It stays a real <a> pointing at the public Fourvenues page: cmd-click,
 * middle-click and "open in new tab" keep working, and it still functions
 * without JavaScript. A plain left-click is intercepted and opens the
 * in-page ticketing overlay instead.
 *
 * `variant`: 'solid' (ghost on dark — stone hairline) | 'outline' (ghost on dark / filled on stone)
 * `size`:    'sm' (chrome) | 'md' (menu / contact)
 * `label`:   overrides the wording where the surrounding copy has already
 *            said "tickets" — the agenda's "VER TODA LA AGENDA", for one.
 *            The destination and behaviour never change with it.
 */
export default function TicketsCta({
  variant = 'solid',
  size = 'sm',
  className = '',
  label,
  onClick,
}) {
  const { t } = useLanguage()
  const { openTickets } = useTickets()

  const handleClick = (e) => {
    // Let the browser handle modified clicks — those mean "somewhere else".
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onClick?.(e)
    openTickets()
  }

  return (
    <a
      href={TICKETS_VIP_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta cta--${variant} cta--${size} ${className}`.trim()}
    >
      <span className="cta__label">{label || t.nav.tickets}</span>
    </a>
  )
}
