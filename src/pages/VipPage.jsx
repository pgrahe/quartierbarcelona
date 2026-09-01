import { DetailGrid } from '../components/Details'
import Explore from '../components/Explore'
import NightStack from '../components/NightStack'
import VipExperience from '../components/VipExperience'
import { useLanguage } from '../i18n/LanguageContext'

/** /vip-experience — the pitch, then what a table actually gets you. */
export default function VipPage() {
  const { t } = useLanguage()
  const page = t.pages.vip

  return (
    <>
      <VipExperience eyebrow={page.sectionEyebrow} pageStart />

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
