import { useCallback, useEffect, useRef, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useLanguage } from './i18n/LanguageContext'
import { useHeroPassed } from './hooks/useHeroPassed'
import { useReveal } from './hooks/useReveal'
import { useRoute } from './router/RouteContext'
import { HERO_ROUTE_IDS, publicRouteId } from './router/routes'
import { useDocumentHead } from './seo/useDocumentHead'

import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import TicketsOverlay from './tickets/TicketsOverlay'

import HomePage from './pages/HomePage'
import CountdownPage from './pages/CountdownPage'
import AboutPage from './pages/AboutPage'
import VipPage from './pages/VipPage'
import EventsPage from './pages/EventsPage'
import PrivacyPage from './pages/PrivacyPage'
import LegalPage from './pages/LegalPage'

import './App.css'

const PAGES = {
  home: HomePage,
  countdown: CountdownPage,
  about: AboutPage,
  vip: VipPage,
  events: EventsPage,
  privacy: PrivacyPage,
  legal: LegalPage,
}

export default function App() {
  const { t, lang } = useLanguage()
  const { routeId } = useRoute()
  const pageId = publicRouteId(routeId)
  const hasHero = HERO_ROUTE_IDS.has(pageId)
  const mainRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // The route is part of the key: the video hero only exists on home and
  // /countdown, so the sentinel has to be rebuilt when we leave or return.
  const heroPassed = useHeroPassed('inicio', 0.72, pageId)

  /* The incoming page fades up — but only once the visitor has actually
     navigated. On a cold load the hero (or the page header) runs its own
     entrance, and a second fade over the top of it reads as a stutter. */
  const previousRoute = useRef(pageId)
  const [animatePage, setAnimatePage] = useState(false)
  useReveal(mainRef)
  useDocumentHead(lang, pageId)

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
  useEffect(() => setMenuOpen(false), [pageId])

  useEffect(() => {
    if (previousRoute.current !== pageId) setAnimatePage(true)
    previousRoute.current = pageId
  }, [pageId])

  const Page = PAGES[pageId] || CountdownPage

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skipToContent}
      </a>

      {/* On hero pages, `solid` flips once the film scrolls past (mobile
          chrome reveal). The bar stays transparent everywhere — contrast is blend. */}
      <Navbar solid={!hasHero || heroPassed} menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      {/* <main> itself never remounts — useReveal observes it, and swapping
          the node out from under that observer would silently stop every
          reveal on the site. The page inside it is keyed instead, so the
          incoming page arrives with its reveals unarmed and animates in. */}
      <main id="main" ref={mainRef} data-route={pageId}>
        <div className="page" key={pageId} data-animate={animatePage}>
          <Page />
        </div>
      </main>

      <Footer />

      <TicketsOverlay />
      <Analytics />
    </>
  )
}
