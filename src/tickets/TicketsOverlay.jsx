import { useEffect, useRef } from 'react'
import { FOURVENUES_EMBED_SRC, TICKETS_VIP_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { useTickets } from './TicketsContext'
import './TicketsOverlay.css'

/**
 * Full-screen ticketing panel wrapping Fourvenues' official calendar widget.
 *
 * Two things matter about how the script is loaded:
 *
 *  1. It runs `document.write` if `#fourvenues-iframe` is missing, which after
 *     load would blank the whole page. The container is therefore rendered
 *     first and the script appended only once it exists.
 *  2. It is injected on first open, never at page load, so visitors who never
 *     click the CTA pay nothing for it.
 *
 * The widget then sizes its own iframe by postMessage; this panel just gives
 * it a scroll container.
 */
export default function TicketsOverlay() {
  const { open, closeTickets } = useTickets()
  const { t } = useLanguage()
  const panelRef = useRef(null)
  const mountRef = useRef(null)
  const loadedRef = useRef(false)

  // Inject the widget the first time the panel is opened.
  useEffect(() => {
    if (!open || loadedRef.current || !mountRef.current) return
    loadedRef.current = true

    const script = document.createElement('script')
    script.src = FOURVENUES_EMBED_SRC
    script.async = true
    mountRef.current.appendChild(script)
  }, [open])

  // Lock the page behind the panel.
  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  // Escape closes; Tab stays inside the panel.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeTickets()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const id = window.setTimeout(() => panelRef.current?.querySelector('button')?.focus(), 60)

    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [open, closeTickets])

  return (
    <div
      className="tickets"
      data-open={open}
      aria-hidden={!open}
      {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': t.nav.tickets } : { inert: '' })}
      ref={panelRef}
    >
      <header className="tickets__bar">
        <img
          className="tickets__logo"
          src="/brand/quartier-beige.png"
          alt="Quartier Barcelona"
          width="1600"
          height="381"
        />

        <p className="eyebrow tickets__title">{t.nav.tickets}</p>

        <button
          type="button"
          className="tickets__close"
          onClick={closeTickets}
          aria-label={t.nav.closeTickets}
        >
          <span className="tickets__close-x" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div className="tickets__scroll">
        {/* The widget replaces this container's contents. */}
        <div className="tickets__sheet" ref={mountRef}>
          <div id="fourvenues-iframe" />
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
