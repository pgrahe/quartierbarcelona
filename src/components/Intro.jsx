import { useLanguage } from '../i18n/LanguageContext'
import './Intro.css'

/**
 * The first thing under the film: who we are, in four lines, on black velvet.
 *
 * Deliberately nothing but type — no eyebrow, no rule, no photograph, no
 * button. The hero has just finished moving; this is the beat where the page
 * stops and simply says what the place is, before the programme takes over
 * underneath it.
 *
 * The headline is the same "A NEW CHAPTER" the /sobre-nosotros page opens on
 * (`about.title`, two lines split on the newline), so home and the story page
 * speak with one voice. The paragraph is `about.intro` — the short cut of the
 * long-form copy, written to be read on a phone in one breath.
 *
 * `intro__ground` is the velvet. It is one empty, decorative div: the whole
 * texture is generated in CSS, with no image to download. See Intro.css.
 */
export default function Intro() {
  const { t } = useLanguage()
  const [line1, line2] = t.about.title.split('\n')

  return (
    <section id="intro" className="intro section" aria-labelledby="intro-title">
      <div className="intro__ground" aria-hidden="true" />

      <div className="shell intro__inner">
        <h2 className="intro__title" id="intro-title" data-reveal>
          <span>{line1}</span>
          {line2 && <span>{line2}</span>}
        </h2>

        <p className="intro__body" data-reveal style={{ '--reveal-delay': '140ms' }}>
          {t.about.intro}
        </p>
      </div>
    </section>
  )
}
