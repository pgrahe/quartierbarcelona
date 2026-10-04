/**
 * Formats an event's ISO date for the flyer, in the visitor's own language.
 *
 * The date is parsed at midday UTC and formatted in UTC. Parsing "2026-09-04"
 * on its own gives a UTC midnight that is the previous day in any negative
 * offset, and appending a bare time makes it local — either way the printed
 * weekday can be wrong by one. Midday UTC is far enough from both edges that
 * no timezone or DST shift can move the calendar day.
 *
 * Intl means nothing about the date has to appear in translations.js: the
 * weekday and month come out in the right language for free.
 */
export function formatEventDate(iso, lang = 'es') {
  const date = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return null

  const part = (options) => {
    try {
      return new Intl.DateTimeFormat(lang, { timeZone: 'UTC', ...options }).format(date)
    } catch {
      return ''
    }
  }

  // Abbreviated forms come back lowercase and often with a trailing period
  // ("vie.", "sept.") — the flyer sets them as uppercase labels.
  const clean = (s) => s.replace(/\.$/, '').toUpperCase()

  return {
    iso,
    weekday: clean(part({ weekday: 'short' })),
    day: part({ day: '2-digit' }),
    month: clean(part({ month: 'short' })),
    year: part({ year: 'numeric' }),
    /** Written out in full — used for the accessible name and <time>. */
    full: part({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

const ORDINALS = {
  1: 'ST',
  2: 'ND',
  3: 'RD',
  21: 'ST',
  22: 'ND',
  23: 'RD',
  31: 'ST',
}

/** Compact poster date: THU. 15TH in English, JUE. 15 elsewhere. */
export function formatPosterDate(iso, lang = 'es') {
  const date = formatEventDate(iso, lang)
  if (!date) return null

  const dayNum = Number(date.day)
  const dayLabel = lang === 'en' ? `${dayNum}${ORDINALS[dayNum] || 'TH'}` : String(dayNum)

  return {
    ...date,
    compact: `${date.weekday}. ${dayLabel}`,
  }
}

/** Calendar day in Europe/Madrid as YYYY-MM-DD — used to drop past nights. */
export function todayIsoMadrid(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}
