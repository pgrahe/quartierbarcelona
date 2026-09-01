import { useCallback, useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useLanguage } from './i18n/LanguageContext'
import { useHeroPassed } from './hooks/useHeroPassed'
import { useReveal } from './hooks/useReveal'
import { useRoute } from './router/RouteContext'
import { useDocumentHead } from './seo/useDocumentHead'

import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import TicketsOverlay from './tickets/TicketsOverlay'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import VipPage from './pages/VipPage'
import EventsPage from './pages/EventsPage'
import PrivacyPage from './pages/PrivacyPage'
import LegalPage from './pages/LegalPage'

import './App.css'

const PAGES = {
  home: HomePage,
  about: AboutPage,
  vip: VipPage,
  events: EventsPage,
  privacy: PrivacyPage,
  legal: LegalPage,
}

export default function App() {
  const { t, lang } = useLanguage()
  const { routeId, isHome } = useRoute()
  const mainRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // The route is part of the key: the hero only exists on the home page, so
  // the sentinel has to be rebuilt every time we come back to it.
  const heroPassed = useHeroPassed('inicio', 0.72, routeId)

  /* The incoming page fades up — but only once the visitor has actually
     navigated. On a cold load the hero (or the page header) runs its own
     entrance, and a second fade over the top of it reads as a stutter. */
  const previousRoute = useRef(routeId)
  const [animatePage, setAnimatePage] = useState(false)
  useReveal(mainRef)
  useDocumentHead(lang, routeId)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  // A menu left open across a resize into desktop would trap the page.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // A menu left open across a navigation would cover the page you asked for.
  useEffect(() => setMenuOpen(false), [routeId])

  useEffect(() => {
    if (previousRoute.current !== routeId) setAnimatePage(true)
    previousRoute.current = routeId
  }, [routeId])

  const Page = PAGES[routeId] || HomePage

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>

      {/* On home, `solid` flips once the hero scrolls past (mobile chrome
          reveal). The bar stays transparent everywhere — contrast is blend. */}
      <Navbar solid={!isHome || heroPassed} menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      {/* <main> itself never remounts — useReveal observes it, and swapping
          the node out from under that observer would silently stop every
          reveal on the site. The page inside it is keyed instead, so the
          incoming page arrives with its reveals unarmed and animates in. */}
      <main id="main" ref={mainRef} data-route={routeId}>
        <div className="page" key={routeId} data-animate={animatePage}>
          <Page />
        </div>
      </main>

      <Footer />

      <TicketsOverlay />
      <Analytics />
    </>
  )
}
