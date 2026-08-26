import { DetailGrid } from '../components/Details'
import Explore from '../components/Explore'
import NightStack from '../components/NightStack'
import PageHero from '../components/PageHero'
import VipExperience from '../components/VipExperience'
import { useLanguage } from '../i18n/LanguageContext'

/** /vip-experience — the pitch, then what a table actually gets you. */
export default function VipPage() {
  const { t } = useLanguage()
  const page = t.pages.vip

  return (
    <>
      <PageHero title={page.name} lead={page.lead} />

      <VipExperience eyebrow={page.sectionEyebrow} />

      <DetailGrid
        id="vip-details"
        eyebrow={t.vipExperience.detailsTitle}
        items={t.vipExperience.details}
      />

      <NightStack />
      <Explore exclude="vip" />
    </>
  )
}
