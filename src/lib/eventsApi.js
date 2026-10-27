/**
 * Programme from /api/events — Fourvenues via the server proxy.
 * The API key never reaches the browser. An empty list hides the grid.
 * Finished nights drop off; the next one becomes first.
 */

import { liveEvents } from './eventLive'
import { canonicalizeFourvenuesUrl, fourvenuesEmbedHash, sanitizeEmbedHash } from './fourvenuesTheme'

export async function fetchEvents() {
  const response = await fetch('/api/events')
  if (!response.ok) {
    throw new Error(`Events API ${response.status}`)
  }

  const rows = await response.json()
  if (!Array.isArray(rows)) return []

  return liveEvents(rows.map(normalizeEvent).filter(Boolean))
}

function normalizeEvent(row, index) {
  const title = String(row?.title ?? '').trim()
  const image = resolveImage(String(row?.image ?? '').trim())
  const href = canonicalizeFourvenuesUrl(String(row?.href ?? '').trim())
  const embed = sanitizeEmbedHash(row?.embed) || fourvenuesEmbedHash(href)
  const fecha = String(row?.fecha ?? row?.date ?? '').trim()
  const date = String(row?.date ?? '').trim() || toIsoDate(fecha)
  if (!title && !image) return null

  return {
    id: String(row?.id ?? '').trim() || [date, slug(title) || `event-${index + 1}`].filter(Boolean).join('-'),
    title,
    fecha,
    date,
    startsAt: String(row?.startsAt ?? '').trim(),
    endsAt: String(row?.endsAt ?? '').trim(),
    image,
    href,
    embed,
  }
}

function toIsoDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  return ''
}

function resolveImage(url) {
  return url.replace(/^https:\/\/fourvenues\.com\//, 'https://www.fourvenues.com/')
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
