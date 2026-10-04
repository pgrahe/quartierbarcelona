import { existsSync, readFileSync } from 'node:fs'

import * as XLSX from 'xlsx'

/**
 * Read content/events.xlsx into the shape UpcomingEvents expects.
 *
 * Columns (first row, case-insensitive):
 *   date   YYYY-MM-DD  — required
 *   title  night name  — required; Alt+Enter for a second line
 *   flyer  filename in public/img/flyers/ or a /img/… path
 *   age    optional, e.g. +20
 *   slug   optional Fourvenues path
 *   id     optional stable key; derived from date + title if omitted
 *
 * Extra columns are ignored. Empty date/title rows are skipped.
 */
export function loadEventsFromExcel(file) {
  if (!existsSync(file)) return []

  const workbook = XLSX.read(readFileSync(file), { type: 'buffer', cellDates: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  if (!sheet) return []

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true })
  const events = []

  for (const row of rows) {
    const date = toIsoDate(cell(row, 'date', 'fecha'))
    const title = String(cell(row, 'title', 'titulo', 'título')).replace(/\r\n/g, '\n').trim()
    if (!date || !title) continue

    const flyer = resolveFlyer(cell(row, 'flyer', 'imagen', 'image'))
    const age = String(cell(row, 'age', 'edad')).trim()
    const slug = String(cell(row, 'slug')).trim()
    const id = String(cell(row, 'id')).trim() || slugFrom(date, title)

    events.push({ id, date, title, flyer, age, slug })
  }

  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
  return events
}

function cell(row, ...keys) {
  for (const [key, value] of Object.entries(row)) {
    const normalized = String(key).trim().toLowerCase()
    if (keys.includes(normalized)) return value
  }
  return ''
}

function toIsoDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return [
      value.getUTCFullYear(),
      String(value.getUTCMonth() + 1).padStart(2, '0'),
      String(value.getUTCDate()).padStart(2, '0'),
    ].join('-')
  }

  const text = String(value ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text

  const excelSerial = Number(text)
  if (Number.isFinite(excelSerial) && excelSerial > 20000 && excelSerial < 80000) {
    const utc = Math.round((excelSerial - 25569) * 86400 * 1000)
    const date = new Date(utc)
    if (!Number.isNaN(date.getTime())) {
      return [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, '0'),
        String(date.getUTCDate()).padStart(2, '0'),
      ].join('-')
    }
  }

  return ''
}

function resolveFlyer(value) {
  const raw = String(value ?? '').trim().replace(/\\/g, '/')
  if (!raw) return ''
  if (raw.startsWith('/')) return raw
  if (raw.startsWith('img/')) return `/${raw}`
  if (raw.startsWith('public/img/')) return raw.slice('public'.length)
  return `/img/flyers/${raw.replace(/^flyers\//, '')}`
}

function slugFrom(date, title) {
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return [date, slug].filter(Boolean).join('-')
}
