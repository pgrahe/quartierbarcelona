import { useEffect, useRef } from 'react'
import { LOCATION } from '../config/site'
import 'leaflet/dist/leaflet.css'

/**
 * Leaflet map on Carto Positron tiles — the light monochrome OSM look
 * (same family as the Sutton-style reference), with a brand-dark pin.
 *
 * Leaflet is loaded inside the effect (not at module top level) so a missing
 * window during tooling, or a stale Vite prebundle, cannot blank the whole app.
 */
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
      const mod = await import('leaflet')
      const L = mod.default ?? mod
      if (cancelled || !hostRef.current) return

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
