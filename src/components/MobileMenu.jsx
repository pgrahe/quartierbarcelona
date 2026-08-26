import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { RouteLink, useRoute } from '../router/RouteContext'
import LanguageSelector from './LanguageSelector'
import TicketsCta from './TicketsCta'
import './MobileMenu.css'

/**
 * Fullscreen mobile menu.
 *
 * Tapping a link closes the panel and goes to that page — or, for Contact,
 * to the home page and down to the contact block. Focus is trapped while open
 * and returned to the hamburger on close.
 */
export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage()
  const { routeId } = useRoute()
  const panelRef = useRef(null)
  const wasOpenRef = useRef(false)

  const links = [
    { key: 'home', to: 'home', label: t.nav.home },
    { key: 'about', to: 'about', label: t.nav.about },
    { key: 'vip', to: 'vip', label: t.nav.vipExperience },
    { key: 'events', to: 'events', label: t.nav.privateEvents },
    { key: 'contact', to: 'home', hash: 'contacto', label: t.nav.contact },
  ]

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
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      )
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
    // Focus the dialog shell, not the first link — programmatic link focus
    // flashes :focus-visible on touch open (notably iOS Safari, first time).
    const id = window.setTimeout(() => {
      panelRef.current?.focus({ preventScroll: true })
    }, 60)

    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [open, onClose])

  // Return focus to the hamburger that opened the panel.
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      return
    }
    if (!wasOpenRef.current) return
    window.setTimeout(() => {
      document.querySelector('.nav__burger')?.focus({ preventScroll: true })
    }, 0)
  }, [open])

  return (
    <div
      id="mobile-menu"
      className="mmenu"
      data-open={open}
      aria-hidden={!open}
      tabIndex={-1}
      {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': t.nav.menu } : {})}
      {...(open ? {} : { inert: '' })}
      ref={panelRef}
    >
      <div className="mmenu__inner">
        <nav className="mmenu__links" aria-label={t.nav.menu}>
          {links.map((l, i) => (
            <RouteLink
              key={l.key}
              to={l.to}
              hash={l.hash}
              className="mmenu__link"
              data-active={!l.hash && l.to === routeId}
              delay={260}
              style={{ '--i': i }}
              onClick={onClose}
            >
              {l.label}
            </RouteLink>
          ))}
        </nav>

        <div className="mmenu__foot">
          <TicketsCta variant="outline" size="md" className="mmenu__cta" onClick={onClose} />
          <hr className="rule mmenu__rule" />
          <LanguageSelector size="md" className="mmenu__langs" />
        </div>
      </div>
    </div>
  )
}
