import About from '../components/About'
import BrandMoment from '../components/BrandMoment'
import Explore from '../components/Explore'
import PageHero from '../components/PageHero'
import { useLanguage } from '../i18n/LanguageContext'

/** /sobre-nosotros — the story, at length, and the collage that follows it. */
export default function AboutPage() {
  const { t } = useLanguage()
  const page = t.pages.about

  return (
    <>
      <PageHero title={page.name} lead={page.lead} />

      <About eyebrow={page.sectionEyebrow} />
      <BrandMoment />
      <Explore exclude="about" />
    </>
  )
}
