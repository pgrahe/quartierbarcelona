/**
 * Server-only Fourvenues fetch. Never import this from client code — keys
 * live in process.env and must not ship in the bundle.
 *
 * FOURVENUES_API_KEY         → Integrations API (Quartier and any venue on that key)
 * FOURVENUES_API_KEY_CHANNEL → Channel Manager API (all promoters on the channel: Velvet, Derby, …)
 */

const INTEGRATIONS_BASE = 'https://api.fourvenues.com/integrations'
const CHANNEL_BASE = 'https://channels-service.fourvenues.com'
const WINDOW_DAYS = 56
const PAGE_SIZE = 50
const MAX_PAGES = 5
const CHANNEL_ORG_SLUGS = [
  'quartier-club',
  'velvet-club-pedralbes',
  'velvet-club',
  'derby-club',
]

export async function loadFourvenuesEvents(env = process.env) {
  const start = madridIsoDate()
  const end = addDaysIso(start, WINDOW_DAYS)

  const [integration, channel] = await Promise.all([
    loadIntegrationEvents(env, start, end).catch(() => []),
    loadChannelEvents(env, start, end).catch(() => []),
  ])

  return mergeEvents(integration, channel)
}

async function loadIntegrationEvents(env, start, end) {
  const apiKey = String(env.FOURVENUES_API_KEY ?? '').trim()
  if (!apiKey) return []

  const base = String(env.FOURVENUES_API_BASE ?? INTEGRATIONS_BASE).replace(/\/$/, '')
  const seen = new Set()
  const events = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = new URL(`${base}/events/`)
    url.searchParams.set('start', start)
    url.searchParams.set('end', end)
    url.searchParams.set('start_date', start)
    url.searchParams.set('end_date', end)
    url.searchParams.set('page', String(page))
    url.searchParams.set('limit', String(PAGE_SIZE))

    const batch = asList(await fetchJson(url, apiKey))
    for (const row of batch) {
      const id = String(row?._id ?? row?.id ?? '').trim()
      if (id && seen.has(id)) continue
      if (id) seen.add(id)
      const normalized = normalizeIntegrationEvent(row)
      if (normalized && normalized.date >= start) events.push(normalized)
    }
    if (batch.length < PAGE_SIZE) break
  }

  return events
}

async function loadChannelEvents(env, start, end) {
  const apiKey = String(env.FOURVENUES_API_KEY_CHANNEL ?? '').trim()
  if (!apiKey) return []

  const orgById = await loadChannelOrganizations(apiKey)
  const seen = new Set()
  const events = []

  const collect = (row, org) => {
    const id = String(row?._id ?? row?.id ?? '').trim()
    if (id && seen.has(id)) return
    if (id) seen.add(id)
    const resolvedOrg = org || orgById.get(String(row?.organization_id ?? ''))
    const normalized = normalizeChannelEvent(row, resolvedOrg)
    if (!normalized) return
    if (normalized.date && normalized.date < start) return
    events.push(normalized)
  }

  await paginateChannelEvents(apiKey, { start, end }, (row) => collect(row))

  for (const org of orgById.values()) {
    await paginateChannelEvents(
      apiKey,
      { start, end, organization_id: org._id },
      (row) => collect(row, org),
    )
  }

  return events
}

async function paginateChannelEvents(apiKey, { start, end, organization_id }, onRow) {
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const url = new URL(`${CHANNEL_BASE}/events`)
    url.searchParams.set('start_date', start)
    url.searchParams.set('end_date', end)
    url.searchParams.set('limit', String(PAGE_SIZE))
    url.searchParams.set('offset', String(page * PAGE_SIZE))
    if (organization_id) url.searchParams.set('organization_id', organization_id)

    let batch = []
    try {
      batch = asList(await fetchJson(url, apiKey))
    } catch {
      break
    }
    for (const row of batch) onRow(row)
    if (batch.length < PAGE_SIZE) break
  }
}

async function loadChannelOrganizations(apiKey) {
  const map = new Map()

  const add = (org) => {
    const id = String(org?._id ?? '').trim()
    if (id) map.set(id, org)
  }

  try {
    asList(await fetchJson(`${CHANNEL_BASE}/organizations`, apiKey)).forEach(add)
  } catch {
    /* listed below from /auth and known slugs */
  }

  try {
    const auth = await fetchJson(`${CHANNEL_BASE}/auth`, apiKey)
    const channel = auth?.data?.channel ?? auth?.data ?? auth
    for (const host of channel?.hosts ?? []) add(host)
  } catch {
    /* optional */
  }

  await Promise.all(
    CHANNEL_ORG_SLUGS.map(async (slug) => {
      try {
        add(await fetchChannelOrgBySlug(apiKey, slug))
      } catch {
        /* org not on this channel */
      }
    }),
  )

  return map
}

async function fetchChannelOrgBySlug(apiKey, slug) {
  const paths = [
    `${CHANNEL_BASE}/organizations/slug/${encodeURIComponent(slug)}`,
    `${CHANNEL_BASE}/organizations/by-slug/${encodeURIComponent(slug)}`,
  ]
  let lastError
  for (const path of paths) {
    try {
      const payload = await fetchJson(path, apiKey)
      return payload?.data ?? payload
    } catch (error) {
      lastError = error
    }
  }
  throw lastError
}

async function fetchJson(url, apiKey) {
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

    return await response.json()
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

function normalizeIntegrationEvent(row) {
  if (row?.visible === false || row?.active === false) return null

  const title = String(row?.name ?? row?.title ?? '').trim()
  const image = resolveImage(String(row?.flyer ?? row?.image ?? '').trim())
  const href = String(row?.url ?? '').trim()
  const date = unixToIso(row?.date) || unixToIso(row?.start) || isoToMadridDate(row?.start_date)
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

function normalizeChannelEvent(row, org) {
  const title = String(row?.name ?? row?.title ?? '').trim()
  const image = resolveImage(
    String(row?.image_url ?? row?.flyer ?? row?.image ?? '').trim(),
  )
  const date =
    isoToMadridDate(row?.display_date) ||
    isoToMadridDate(row?.start_date) ||
    unixToIso(row?.date) ||
    unixToIso(row?.start)
  if (!title && !image) return null

  const orgSlug = String(org?.slug ?? row?.organization_slug ?? '').trim()
  const code = String(row?.code ?? '').trim()
  const eventSlug = String(row?.slug ?? '').trim()
  const iframeUrl = String(row?.iframe?.tag_url ?? row?.url ?? '').trim()
  const href =
    (iframeUrl.startsWith('http') ? iframeUrl : '') ||
    (orgSlug && code ? `https://www.fourvenues.com/${orgSlug}/${code}` : '') ||
    (orgSlug && eventSlug ? `https://www.fourvenues.com/${orgSlug}/events/${eventSlug}` : '')

  return {
    id: String(row?._id ?? '').trim() || [date, slug(title)].filter(Boolean).join('-'),
    title,
    fecha: date,
    date,
    image,
    href,
  }
}

function mergeEvents(...lists) {
  const seen = new Set()
  const events = []

  for (const list of lists) {
    for (const event of list) {
      const key = event.id || `${event.date}:${slug(event.title)}`
      if (!key || seen.has(key)) continue
      seen.add(key)
      events.push(event)
    }
  }

  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
  return events
}

function unixToIso(unix) {
  const n = Number(unix)
  if (!Number.isFinite(n) || n <= 0) return ''
  const ms = n > 1e12 ? n : n * 1000
  return madridIsoDate(new Date(ms))
}

function isoToMadridDate(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return ''
  return madridIsoDate(parsed)
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
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
