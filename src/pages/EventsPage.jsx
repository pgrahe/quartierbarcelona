import { whatsappUrl } from '../config/site'
import { DetailGrid, SpecRows } from '../components/Details'
import Explore from '../components/Explore'
import PageHero from '../components/PageHero'
import PhotoMarquee from '../components/PhotoMarquee'
import PrivateEvents from '../components/PrivateEvents'
import { useLanguage } from '../i18n/LanguageContext'

/** /private-events — the room, what it is used for, and how to book it. */
export default function EventsPage() {
  const { t } = useLanguage()
  const page = t.pages.events
  const pe = t.privateEvents

  return (
    <>
      <PageHero title={page.name} lead={page.lead} />

      <PrivateEvents title={page.sectionTitle} />

      <DetailGrid id="events-formats" eyebrow={pe.formatsTitle} items={pe.formats} />

      <SpecRows id="events-info" eyebrow={pe.infoTitle} rows={pe.info}>
        <a
          className="cta cta--outline cta--md"
          href={whatsappUrl(pe.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cta__label">{pe.cta}</span>
        </a>
      </SpecRows>

      <PhotoMarquee />
      <Explore exclude="events" />
    </>
  )
}
