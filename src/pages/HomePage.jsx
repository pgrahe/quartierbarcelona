import Hero from '../components/Hero'
import BrandMoment from '../components/BrandMoment'
import UpcomingEvents from '../components/UpcomingEvents'
import NightStack from '../components/NightStack'
import PhotoMarquee from '../components/PhotoMarquee'
import Explore from '../components/Explore'
import Contact from '../components/Contact'
import LocationMap from '../components/LocationMap'

/**
 * Home.
 *
 * The film, the overlapping collage, the programme, the infinite photo
 * marquee, the doors into the rest of the site, the sticky night stack into
 * contact, and finally how to reach us and where we are.
 *
 * The long-form copy that used to live here has moved to the pages it
 * belongs to (/sobre-nosotros, /vip-experience, /private-events). What is
 * left is deliberately visual: the ground alternates black → ink → black →
 * black → stone → ink → black → beige so no two adjacent sections read as
 * one another.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMoment />
      <UpcomingEvents />
      <PhotoMarquee />
      <Explore />
      <NightStack />
      <Contact />
      <LocationMap />
    </>
  )
}
