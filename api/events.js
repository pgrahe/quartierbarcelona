import { loadFourvenuesEvents } from '../src/lib/fourvenuesEvents.js'

/**
 * Production proxy: the Fourvenues key never leaves the server.
 * Locally the same path is served by the Vite middleware in vite.config.js.
 */
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end()
    return
  }

  try {
    const events = await loadFourvenuesEvents(process.env)
    res.statusCode = 200
    res.end(JSON.stringify(events))
  } catch {
    res.statusCode = 502
    res.end('[]')
  }
}
