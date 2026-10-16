/**
 * An event stays first in OPENING SERIES until it has actually finished.
 * Fourvenues `end` / `end_date` when present; otherwise six hours after start,
 * otherwise 06:00 Europe/Madrid the morning after the flyer date.
 */

const SIX_HOURS = 6 * 60 * 60 * 1000

export function eventStartMs(event) {
  const fromStamp = Date.parse(event?.startsAt || '')
  if (Number.isFinite(fromStamp)) return fromStamp
  if (event?.date) return Date.parse(`${event.date}T20:00:00+02:00`)
  return 0
}

export function eventEndMs(event) {
  const fromStamp = Date.parse(event?.endsAt || '')
  if (Number.isFinite(fromStamp)) return fromStamp

  const start = eventStartMs(event)
  if (start) return start + SIX_HOURS

  if (event?.date) return Date.parse(`${event.date}T06:00:00+02:00`) + 24 * 60 * 60 * 1000
  return 0
}

export function liveEvents(events, now = Date.now()) {
  return events
    .filter((event) => eventEndMs(event) > now)
    .sort((a, b) => {
      const start = eventStartMs(a) - eventStartMs(b)
      if (start) return start
      return (a.date || '').localeCompare(b.date || '') || String(a.title || '').localeCompare(b.title || '')
    })
}
