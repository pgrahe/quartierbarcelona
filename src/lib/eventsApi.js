import { EVENTS_API_URL } from '../config/site'

/**
 * Programme from the public OpenSheet feed of the Quartier spreadsheet.
 * Rows are never hardcoded — an empty sheet is an empty list.
 */

export async function fetchEvents() {
  const response = await fetch(EVENTS_API_URL)
  if (!response.ok) {
    throw new Error(`Events API ${response.status}`)
  }

  const rows = await response.json()
  if (!Array.isArray(rows)) return []

  return rows.map(normalizeEvent).filter(Boolean)
}

function normalizeEvent(row, index) {
  const title = String(row?.titulo ?? '').trim()
  const image = resolveImage(String(row?.imagen ?? '').trim())
  const href = String(row?.fourvenues ?? '').trim()
  const fecha = String(row?.fecha ?? '').trim()
  if (!title && !image) return null

  const iso = toIsoDate(fecha)

  return {
    id: [iso, slug(title) || `event-${index + 1}`].filter(Boolean).join('-'),
    title,
    fecha,
    date: iso,
    image,
    href,
  }
}

const MONTHS = {
  jan: '01',
  ene: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  abr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  ago: '08',
  sep: '09',
  sept: '09',
  oct: '10',
  nov: '11',
  dec: '12',
  dic: '12',
}

function toIsoDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const dmy = value.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/)
  if (dmy) {
    const [, day, month, year] = dmy
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  const named = value.match(/^(\d{1,2})\s+([a-záéíóúñ]+)\s*(\d{4})?$/i)
  if (named) {
    const month = MONTHS[named[2].slice(0, 4).toLowerCase()] || MONTHS[named[2].slice(0, 3).toLowerCase()]
    if (month) {
      const year = named[3] || String(new Date().getFullYear())
      return `${year}-${month}-${named[1].padStart(2, '0')}`
    }
  }

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
