import { TICKETS_ENABLED } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink } from '../router/RouteContext'
import './TicketsCta.css'

/**
 * The site's one and only primary CTA. Every placement — navbar, mobile hero,
 * mobile menu, contact, footer — renders this, so behaviour and destination
 * are defined in exactly one place.
 *
 * It stays a real <a> to /tickets: cmd-click, middle-click and "open in new
 * tab" keep working, and it still functions without JavaScript.
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
  delay = 0,
}) {
  const { t } = useLanguage()
  const classNames = `cta cta--${variant} cta--${size} ${className}`.trim()
  const text = label || t.nav.tickets

  if (!TICKETS_ENABLED) {
    return (
      <span className={`${classNames} cta--disabled`} aria-disabled="true">
        <span className="cta__label">{text}</span>
      </span>
    )
  }

  return (
    <RouteLink to="tickets" className={classNames} onClick={onClick} delay={delay}>
      <span className="cta__label">{text}</span>
    </RouteLink>
  )
}
