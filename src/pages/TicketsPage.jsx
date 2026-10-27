import { useEffect, useState } from 'react'
import { TICKETS_VIP_URL } from '../config/site'
import { img } from '../lib/img'
import { useLanguage } from '../i18n/LanguageContext'
import { isSiteHash } from '../lib/siteHash'
import { sanitizeEmbedHash } from '../lib/fourvenuesTheme'
import { NAV_EVENT, RouteLink, useRoute } from '../router/RouteContext'
import { pathFor } from '../router/routes'
import '../tickets/TicketsPage.css'

function ticketsFrameSrc() {
  if (typeof window === 'undefined') return '/tickets-frame.html'
  const embed = sanitizeEmbedHash(new URLSearchParams(window.location.search).get('e'))
  return embed ? `/tickets-frame.html#${embed}` : '/tickets-frame.html'
}

/**
 * /tickets — Fourvenues calendar on our chrome.
 *
 * Their official embed script writes `location.hash` on whatever page hosts
 * it. Opening an event and going back then mangles that URL (`?themedark/…`)
 * and reloads the widget from it. The script therefore runs inside
 * `/tickets-frame.html`, so `/tickets` never changes.
 */
export default function TicketsPage() {
  const { t, lang } = useLanguage()
  const { navigate } = useRoute()
  const [frameSrc, setFrameSrc] = useState(ticketsFrameSrc)

  useEffect(() => {
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [])

  useEffect(() => {
    const syncFrame = () => setFrameSrc(ticketsFrameSrc())
    window.addEventListener(NAV_EVENT, syncFrame)
    window.addEventListener('popstate', syncFrame)
    return () => {
      window.removeEventListener(NAV_EVENT, syncFrame)
      window.removeEventListener('popstate', syncFrame)
    }
  }, [])

  useEffect(() => {
    const stripForeignUrl = () => {
      const hash = window.location.hash.slice(1)
      const search = new URLSearchParams(window.location.search)
      const event = sanitizeEmbedHash(search.get('e'))
      const foreignHash = Boolean(hash) && !isSiteHash(hash)
      if (!foreignHash && !search.has('theme')) return
      const next = event ? `${window.location.pathname}?e=${encodeURIComponent(event)}` : window.location.pathname
      window.history.replaceState(null, '', next)
      setFrameSrc(ticketsFrameSrc())
    }

    stripForeignUrl()
    window.addEventListener('hashchange', stripForeignUrl)
    return () => window.removeEventListener('hashchange', stripForeignUrl)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      navigate(pathFor('home', lang))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lang, navigate])

  useEffect(() => {
    const onMessage = (event) => {
      if (event.data?.key !== 'quartier-tickets-height' || !event.data.height) return
      const frame = document.querySelector('.tickets__frame')
      if (frame) frame.style.height = event.data.height
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className="tickets" id="main">
      <header className="tickets__bar">
        <RouteLink to="home" className="tickets__logo-link" aria-label="Quartier Barcelona">
          <img
            className="tickets__logo"
            src={img('/brand/quartier-beige.png')}
            alt="Quartier Barcelona"
            width="1600"
            height="448"
          />
        </RouteLink>

        <p className="eyebrow tickets__title">{t.nav.tickets}</p>

        <RouteLink to="home" className="tickets__close" aria-label={t.nav.closeTickets}>
          <span className="tickets__close-x" aria-hidden="true">
            <i />
            <i />
          </span>
        </RouteLink>
      </header>

      <div className="tickets__scroll">
        <div className="tickets__sheet">
          <iframe
            key={frameSrc}
            className="tickets__frame"
            title={t.nav.tickets}
            src={frameSrc}
            allow="payment; clipboard-write"
          />
        </div>

        <p className="tickets__fallback">
          <a href={TICKETS_VIP_URL} target="_blank" rel="noopener noreferrer">
            {t.nav.ticketsExternal}
          </a>
        </p>
      </div>
    </div>
  )
}
