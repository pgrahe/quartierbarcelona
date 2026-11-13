import { DetailGrid } from '../components/Details'
import Explore from '../components/Explore'
import NightStack from '../components/NightStack'
import Sala3D from '../components/Sala3D'
import VipExperience from '../components/VipExperience'
import { useLanguage } from '../i18n/LanguageContext'

/** /vip-experience — the pitch, the room in 3D, then what a table actually gets you. */
export default function VipPage() {
  const { t } = useLanguage()
  const page = t.pages.vip

  return (
    <>
      <VipExperience eyebrow={page.sectionEyebrow} pageStart />

      <Sala3D />

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
