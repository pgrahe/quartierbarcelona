import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { navOffset, scrollToSection } from '../lib/scrollTo'
import LanguageSelector from './LanguageSelector'
import TicketsCta from './TicketsCta'
import './MobileMenu.css'

/**
 * Fullscreen mobile menu.
 *
 * Tapping a link closes the menu and smooth-scrolls from wherever the visitor
 * currently is — no navigation, no hash, no reload. Focus is trapped while
 * open and returned to the hamburger on close.
 */
export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage()
  const panelRef = useRef(null)

  const links = [
    { id: 'inicio', label: t.nav.home },
    { id: 'sobre-nosotros', label: t.nav.about },
    { id: 'contacto', label: t.nav.contact },
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
    // Move focus in once the panel has painted.
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector('a[href], button')?.focus()
    }, 60)

    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [open, onClose])

  const go = (e, id) => {
    e.preventDefault()
    onClose()
    // Let the panel finish leaving before the page moves underneath it.
    window.setTimeout(() => scrollToSection(id, { offset: navOffset() }), 260)
  }

  return (
    <div
      id="mobile-menu"
      className="mmenu"
      data-open={open}
      aria-hidden={!open}
      {...(open ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': t.nav.menu } : {})}
      {...(open ? {} : { inert: '' })}
      ref={panelRef}
    >
      <div className="mmenu__inner">
        <nav className="mmenu__links" aria-label={t.nav.menu}>
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="mmenu__link"
              style={{ '--i': i }}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
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
