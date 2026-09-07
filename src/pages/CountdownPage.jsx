import Hero from '../components/Hero'
import PhotoMarquee from '../components/PhotoMarquee'
import Contact from '../components/Contact'
import LocationMap from '../components/LocationMap'

/**
 * /countdown — teaser landing.
 *
 * The home hero (film + rotating slogan), then the photo loop, then how to
 * reach us and where we are. No agenda, no VIP pitch: the clock is the page.
 */
export default function CountdownPage() {
  return (
    <>
      <Hero variant="countdown" />
      <PhotoMarquee />
      <Contact showTickets={false} />
      <LocationMap />
    </>
  )
}
