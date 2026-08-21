import { LANGUAGES } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'
import './LanguageSelector.css'

/**
 * ES · EN · FR · DE laid out inline. No dropdown, no flags — four codes and a
 * separator, which is both the most minimal and the most accessible option.
 */
export default function LanguageSelector({ size = 'sm', className = '' }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={`langs langs--${size} ${className}`.trim()} role="group" aria-label={t.nav.language}>
      {LANGUAGES.map((l, i) => (
        <span className="langs__item" key={l.code}>
          {i > 0 && <span className="langs__sep" aria-hidden="true">·</span>}
          <button
            type="button"
            className="langs__btn"
            lang={l.htmlLang}
            aria-current={l.code === lang ? 'true' : undefined}
            data-active={l.code === lang}
            onClick={() => setLang(l.code)}
          >
            <span className="visually-hidden">{l.name}</span>
            <span aria-hidden="true">{l.label}</span>
          </button>
        </span>
      ))}
    </div>
  )
}
