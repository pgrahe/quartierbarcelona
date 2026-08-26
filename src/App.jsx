import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from './i18n/LanguageContext'
import { useHeroPassed } from './hooks/useHeroPassed'
import { useReveal } from './hooks/useReveal'

import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import About from './components/About'
import BrandMoment from './components/BrandMoment'
import VipExperience from './components/VipExperience'
import NightStack from './components/NightStack'
import PrivateEvents from './components/PrivateEvents'
import PhotoMarquee from './components/PhotoMarquee'
import Contact from './components/Contact'
import LocationMap from './components/LocationMap'
import Footer from './components/Footer'
import TicketsOverlay from './tickets/TicketsOverlay'

import './App.css'

export default function App() {
  const { t } = useLanguage()
  const mainRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const heroPassed = useHeroPassed('inicio')
  useReveal(mainRef)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  // A menu left open across a resize into desktop would trap the page.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = (e) => e.matches && setMenuOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <a className="skip-link" href="#sobre-nosotros">
        {t.nav.skipToContent}
      </a>

      <Navbar solid={heroPassed} menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <main id="main" ref={mainRef}>
        <Hero />
        <About />
        <BrandMoment />
        <VipExperience />
        <NightStack />
        <PrivateEvents />
        <PhotoMarquee />
        <Contact />
        <LocationMap />
      </main>

      <Footer />

      <TicketsOverlay />
    </>
  )
}
