import { useEffect } from 'react'
import { TICKETS_VIP_URL } from '../config/site'
import { img } from '../lib/img'
import { useLanguage } from '../i18n/LanguageContext'
import { isSiteHash } from '../lib/siteHash'
import { RouteLink, useRoute } from '../router/RouteContext'
import { pathFor } from '../router/routes'
import '../tickets/TicketsPage.css'

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

  useEffect(() => {
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [])

  useEffect(() => {
    const stripForeignUrl = () => {
      const hash = window.location.hash.slice(1)
      const search = new URLSearchParams(window.location.search)
      const foreignHash = Boolean(hash) && !isSiteHash(hash)
      if (!foreignHash && !search.has('theme')) return
      window.history.replaceState(null, '', window.location.pathname)
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
            className="tickets__frame"
            title={t.nav.tickets}
            src="/tickets-frame.html"
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
