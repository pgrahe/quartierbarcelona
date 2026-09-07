/**
 * Remaining time until a target instant.
 *
 * Units are floored independently so the clock never shows 60 seconds or
 * 24 hours. A past target returns zeros with `done: true`.
 */
export function remainingUntil(target, now = Date.now()) {
  const end = new Date(target).getTime()
  if (Number.isNaN(end)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
  }

  const ms = Math.max(0, end - now)
  const totalSeconds = Math.floor(ms / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: ms === 0,
  }
}

export function padUnit(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}
