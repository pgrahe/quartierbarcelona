import { useEffect, useState } from 'react'

import { OPENING_AT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { padUnit, remainingUntil } from '../lib/countdown'
import './OpeningCountdown.css'

const EMPTY = { days: 0, hours: 0, minutes: 0, seconds: 0, done: false }

/**
 * Hero clock for /countdown.
 *
 * Numbers stay empty on the server and on the first client paint, then fill
 * in after mount — a prerendered remaining-time would be stale the moment
 * the HTML was built, and would mismatch hydration.
 */
export default function OpeningCountdown({ entered = false }) {
  const { t } = useLanguage()
  const copy = t.countdown
  const [parts, setParts] = useState(null)

  useEffect(() => {
    const tick = () => setParts(remainingUntil(OPENING_AT))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const shown = parts || EMPTY
  const units = [
    { key: 'days', value: shown.days, label: copy.days },
    { key: 'hours', value: shown.hours, label: copy.hours },
    { key: 'minutes', value: shown.minutes, label: copy.minutes },
    { key: 'seconds', value: shown.seconds, label: copy.seconds },
  ]

  return (
    <div className="cd" data-entered={entered} data-ready={Boolean(parts)}>
      <p className="eyebrow cd__date">{copy.date}</p>

      <div className="cd__clock" role="timer" aria-label={copy.aria} aria-live="off">
        {units.map((unit) => (
          <div key={unit.key} className="cd__unit">
            <span className="cd__num">{padUnit(unit.value)}</span>
            <span className="cd__label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
