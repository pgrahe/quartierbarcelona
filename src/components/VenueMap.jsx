import { useEffect, useRef } from 'react'
import { LOCATION } from '../config/site'

/**
 * Leaflet map on Carto Positron tiles — the light monochrome OSM look
 * (same family as the Sutton-style reference), with a brand-dark pin.
 *
 * Leaflet is loaded inside the effect (not at module top level) so the 450 KB
 * CJS build stays off the critical path. Vite must pre-bundle it (see
 * optimizeDeps in vite.config.js); a raw UMD `import('leaflet')` has no
 * ESM exports and silently leaves this container empty.
 */
function leafletApi(mod) {
  const candidates = [mod?.default, mod, typeof window !== 'undefined' ? window.L : null]
  for (const candidate of candidates) {
    if (candidate && typeof candidate.map === 'function') return candidate
  }
  return null
}

export default function VenueMap({ title }) {
  const hostRef = useRef(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    let cancelled = false
    let map
    let ro
    let kick

    ;(async () => {
      await import('leaflet/dist/leaflet.css')
      const mod = await import('leaflet')
      const L = leafletApi(mod)
      if (cancelled || !hostRef.current) return
      if (!L) throw new Error('Leaflet loaded without a map() constructor')

      map = L.map(hostRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([LOCATION.lat, LOCATION.lng], LOCATION.zoom)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }).addTo(map)

      const pin = L.divIcon({
        className: 'loc__pin',
        html: '<span class="loc__pin-dot" aria-hidden="true"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      L.marker([LOCATION.lat, LOCATION.lng], {
        icon: pin,
        title: title || 'Quartier Barcelona',
      }).addTo(map)

      ro =
        typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(() => map.invalidateSize())
          : null
      ro?.observe(hostRef.current)
      kick = window.setTimeout(() => map.invalidateSize(), 400)
    })().catch((err) => {
      console.error('VenueMap failed to load Leaflet', err)
    })

    return () => {
      cancelled = true
      window.clearTimeout(kick)
      ro?.disconnect()
      map?.remove()
    }
  }, [title])

  return <div ref={hostRef} className="loc__leaflet" role="img" aria-label={title} />
}
