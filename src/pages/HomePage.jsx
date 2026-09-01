import Hero from '../components/Hero'
import Intro from '../components/Intro'
import UpcomingEvents from '../components/UpcomingEvents'
import PhotoMarquee from '../components/PhotoMarquee'
import VipExperience from '../components/VipExperience'
import PrivateEvents from '../components/PrivateEvents'
import BrandMoment from '../components/BrandMoment'
import Contact from '../components/Contact'
import LocationMap from '../components/LocationMap'

/**
 * Home.
 *
 * Read on a phone, top to bottom: the film, the stone A NEW CHAPTER editorial,
 * the programme, the collage, the table, the room you can take over, the
 * photographs running past, and then how to reach us and where we are.
 *
 * The order is deliberate. Everything that can be booked — a ticket, a table,
 * the whole club — sits in the middle of the page; the marquee closes into
 * Contact as the last image beat before the details.
 *
 * Ground seams between sections live in App.css, per change of ground, so
 * this list can be reordered without touching them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <UpcomingEvents />
      <BrandMoment />
      <VipExperience />
      <PrivateEvents />
      <PhotoMarquee />
      <Contact />
      <LocationMap />
    </>
  )
}
