import { addressLines, mapDirectionsUrl } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import VenueMap from './VenueMap'
import './LocationMap.css'

/**
 * Location.
 *
 * A beige type panel and a monochrome Leaflet map sit in one grid, so the map
 * reads as part of the page rather than as a pasted Google iframe.
 *
 * Address, map pin and directions link all derive from LOCATION in
 * src/config/site.js.
 */
export default function LocationMap() {
  const { t } = useLanguage()
  const [line1, line2] = t.location.title.split('\n')

  return (
    <section className="loc" aria-label={t.location.eyebrow}>
      <div className="loc__grid">
        <div className="loc__panel on-stone">
          <div className="loc__panel-inner">
            <p className="eyebrow loc__eyebrow" data-reveal>
              {t.location.eyebrow}
            </p>

            <h2 className="loc__title" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <span>{line1}</span>
              {line2 && <span>{line2}</span>}
            </h2>

            <div className="loc__meta" data-reveal style={{ '--reveal-delay': '160ms' }}>
              <hr className="rule" />
              <address className="loc__address">
                {addressLines().map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>

              <a
                className="loc__directions"
                href={mapDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.location.directions}
              </a>
            </div>
          </div>
        </div>

        <div className="loc__map" data-reveal="mask" style={{ '--reveal-delay': '120ms' }}>
          <VenueMap title={t.location.mapLabel} />
        </div>
      </div>
    </section>
  )
}
