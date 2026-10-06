/**
 * Server-only Fourvenues Integrations fetch. Never import this from client
 * code — the API key lives in process.env and must not ship in the bundle.
 *
 * GET /integrations/events/  (X-Api-Key)
 * https://docs.fourvenues.com/integrations/api-reference/events/get-events
 */

const DEFAULT_BASE = 'https://api.fourvenues.com/integrations'
const WINDOW_DAYS = 56
const PAGE_SIZE = 50
const MAX_PAGES = 5

export async function loadFourvenuesEvents(env = process.env) {
  const apiKey = String(env.FOURVENUES_API_KEY ?? '').trim()
  if (!apiKey) return []

  const base = String(env.FOURVENUES_API_BASE ?? DEFAULT_BASE).replace(/\/$/, '')
  const start = madridIsoDate()
  const end = addDaysIso(start, WINDOW_DAYS)

  const seen = new Set()
  const events = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await fetchPage({ base, apiKey, start, end, page })
    for (const event of batch) {
      const id = String(event?._id ?? event?.id ?? '').trim()
      if (id && seen.has(id)) continue
      if (id) seen.add(id)
      const normalized = normalizeEvent(event)
      if (normalized && normalized.date >= start) events.push(normalized)
    }
    if (batch.length < PAGE_SIZE) break
  }

  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
  return events
}

async function fetchPage({ base, apiKey, start, end, page }) {
  const url = new URL(`${base}/events/`)
  url.searchParams.set('start', start)
  url.searchParams.set('end', end)
  url.searchParams.set('start_date', start)
  url.searchParams.set('end_date', end)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(PAGE_SIZE))

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 12000)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-Api-Key': apiKey,
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Fourvenues ${response.status}`)
    }

    return asList(await response.json())
  } finally {
    clearTimeout(timer)
  }
}

function asList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.data?.data)) return payload.data.data
  if (Array.isArray(payload?.events)) return payload.events
  return []
}

function normalizeEvent(row) {
  if (row?.visible === false || row?.active === false) return null

  const title = String(row?.name ?? row?.title ?? '').trim()
  const image = resolveImage(String(row?.flyer ?? row?.image ?? '').trim())
  const href = String(row?.url ?? '').trim()
  const date = unixToIso(row?.date) || unixToIso(row?.start)
  if (!title && !image) return null

  return {
    id: String(row?._id ?? '').trim() || [date, slug(title)].filter(Boolean).join('-'),
    title,
    fecha: date,
    date,
    image,
    href,
  }
}

function unixToIso(unix) {
  const n = Number(unix)
  if (!Number.isFinite(n) || n <= 0) return ''
  const ms = n > 1e12 ? n : n * 1000
  return madridIsoDate(new Date(ms))
}

function madridIsoDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function addDaysIso(iso, days) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10)
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
