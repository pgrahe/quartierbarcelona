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
 * Read on a phone, top to bottom: the film, a short word about who we are,
 * the programme, the photographs running past, the table, the room you can
 * take over, the collage, and then how to reach us and where we are.
 *
 * The order is deliberate. Everything that can be booked — a ticket, a table,
 * the whole club — comes before anything that is only there to be looked at.
 * The collage sits at the end as the closing image rather than as the page's
 * first impression, and Contact follows it directly.
 *
 * Ground: black → black → black → stone → black/stone → ink → black → stone.
 * The seams between changes of ground are written in App.css, per change,
 * not per section, so this list can be reordered without touching them.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <UpcomingEvents />
      <PhotoMarquee />
      <VipExperience />
      <PrivateEvents />
      <BrandMoment />
      <Contact />
      <LocationMap />
    </>
  )
}
