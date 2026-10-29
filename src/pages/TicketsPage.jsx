import { useEffect, useRef, useState } from 'react'
import { TICKETS_VIP_URL } from '../config/site'
import { img } from '../lib/img'
import { useLanguage } from '../i18n/LanguageContext'
import { isSiteHash } from '../lib/siteHash'
import { sanitizeEmbedHash } from '../lib/fourvenuesTheme'
import { RouteLink, useRoute } from '../router/RouteContext'
import { pathFor } from '../router/routes'
import '../tickets/TicketsPage.css'

function ticketsFrameSrc() {
  if (typeof window === 'undefined') return '/tickets-frame.html'
  const embed =
    sanitizeEmbedHash(new URLSearchParams(window.location.search).get('e')) ||
    sanitizeEmbedHash(window.location.hash.slice(1))
  return embed ? `/tickets-frame.html#${embed}` : '/tickets-frame.html'
}

function readMessage(raw) {
  if (!raw) return null
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }
  return typeof raw === 'object' ? raw : null
}

/**
 * /tickets — Fourvenues calendar on our chrome.
 *
 * The widget runs in /tickets-frame.html so its hash stays off this URL.
 * Do not remount that iframe on hash changes: that sent people back to the
 * calendar every time they opened an event.
 */
export default function TicketsPage() {
  const { t, lang } = useLanguage()
  const { navigate } = useRoute()
  const scrollRef = useRef(null)
  const frameRef = useRef(null)
  const [frameSrc] = useState(ticketsFrameSrc)

  useEffect(() => {
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [])

  useEffect(() => {
    const stripLeakedHash = () => {
      const hash = window.location.hash.slice(1)
      const search = new URLSearchParams(window.location.search)
      if ((!hash || isSiteHash(hash)) && !search.has('theme')) return
      const event = sanitizeEmbedHash(search.get('e'))
      const next = event
        ? `${window.location.pathname}?e=${encodeURIComponent(event)}`
        : window.location.pathname
      window.history.replaceState(null, '', next)
    }

    stripLeakedHash()
    window.addEventListener('hashchange', stripLeakedHash)
    return () => window.removeEventListener('hashchange', stripLeakedHash)
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
      const data = readMessage(event.data)
      if (!data) return

      if (data.key === 'quartier-tickets-height' && data.height && frameRef.current) {
        frameRef.current.style.height = data.height
      }

      if (data.key === 'quartier-tickets-scroll' && scrollRef.current) {
        scrollRef.current.scrollBy({ top: data.deltaY || 0, left: 0, behavior: 'instant' })
      }
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

      <div className="tickets__scroll" ref={scrollRef}>
        <div className="tickets__sheet">
          <iframe
            ref={frameRef}
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
