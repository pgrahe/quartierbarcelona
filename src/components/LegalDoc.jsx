import { Fragment } from 'react'

import { COMPANY, CONTACT, LEGAL_UPDATED, companyAddress, localeFor } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import PageHero from './PageHero'
import './LegalDoc.css'

/* -------------------------------------------------------------------------
 * The two legal documents — one component, because they are the same object:
 * a header, a company card, a numbered set of articles.
 *
 * `doc` selects the text: 'privacy' → Política de Privacidad,
 * 'notice' → Aviso Legal. Everything else comes from translations.js
 * (`legal.<doc>`) and src/config/site.js, so the page is a renderer and holds
 * no copy and no business data of its own.
 *
 * A section's `blocks` array is the whole document model: a string is a
 * paragraph, a nested array is a bullet list.
 * ---------------------------------------------------------------------- */

/**
 * Placeholders the copy is written with, plus the one bare URL that appears
 * in it. Keeping the AEPD in the same pass means the supervisory authority is
 * a real link in all four languages without four more entries in the table.
 */
const TOKEN = /\{(company|nif|address|email|phone)\}|www\.aepd\.es/g

/** Prints a legal date the way its own language writes one. */
function formatUpdated(iso, lang) {
  const date = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(date.getTime())) return ''
  try {
    return new Intl.DateTimeFormat(localeFor(lang).ogLocale.replace('_', '-'), {
      timeZone: 'UTC',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  } catch {
    return iso
  }
}

/** Splits a line on its placeholders and swaps in the real values. */
function fill(text, tokens) {
  const out = []
  let cursor = 0

  for (const match of text.matchAll(TOKEN)) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index))
    out.push(match[1] ? tokens[match[1]] : tokens.aepd)
    cursor = match.index + match[0].length
  }
  out.push(text.slice(cursor))

  return out.map((part, i) => <Fragment key={i}>{part}</Fragment>)
}

export default function LegalDoc({ doc }) {
  const { t, lang } = useLanguage()

  const page = doc === 'privacy' ? t.pages.privacy : t.pages.legal
  const copy = t.legal[doc]
  const updated = formatUpdated(LEGAL_UPDATED, lang)

  const tokens = {
    company: COMPANY.name,
    nif: COMPANY.nif,
    address: companyAddress(),
    email: (
      <a className="legal__link" href={`mailto:${CONTACT.email}`}>
        {CONTACT.email}
      </a>
    ),
    phone: (
      <a className="legal__link" href={`tel:${CONTACT.phoneHref}`}>
        {CONTACT.phoneDisplay}
      </a>
    ),
    aepd: (
      <a className="legal__link" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
        www.aepd.es
      </a>
    ),
  }

  const facts = [
    { label: t.legal.holderLabel, value: COMPANY.name },
    { label: t.legal.nifLabel, value: COMPANY.nif },
    { label: t.legal.addressLabel, value: companyAddress() },
    {
      label: t.legal.emailLabel,
      value: (
        <a className="legal__link" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
      ),
    },
  ]

  return (
    <>
      <PageHero title={page.name} lead={page.lead} />

      <section className="legal section velvet" aria-labelledby="page-title">
        <div className="shell legal__grid">
          {/* The card and the index travel with the reader on desktop: a
              legal page is scanned for one clause, not read top to bottom. */}
          <aside className="legal__aside">
            <div className="legal__card" data-reveal>
              <p className="eyebrow legal__updated">
                {t.legal.updatedLabel}
                <span>{updated}</span>
              </p>

              <hr className="rule legal__card-rule" />

              <dl className="legal__facts">
                {facts.map((fact) => (
                  <div className="legal__fact" key={fact.label}>
                    <dt className="eyebrow legal__fact-label">{fact.label}</dt>
                    <dd className="legal__fact-value">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <nav className="legal__index" aria-label={t.legal.indexLabel} data-reveal>
              <p className="eyebrow legal__index-title">{t.legal.indexLabel}</p>
              <ol className="legal__index-list">
                {copy.sections.map((section, i) => (
                  <li key={section.title}>
                    <a className="legal__index-link" href={`#${doc}-${i + 1}`}>
                      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="legal__body">
            <p className="legal__intro" data-reveal>
              {copy.intro}
            </p>

            {/* Only the translations carry this — the Spanish text is the
                original, so it has nothing to disclaim. */}
            {t.legal.prevail && (
              <p className="legal__prevail" data-reveal style={{ '--reveal-delay': '80ms' }}>
                {t.legal.prevail}
              </p>
            )}

            {/* Deliberately no `data-reveal` on the articles. Everywhere else
                on the site a block fading in as you reach it is the point;
                here it would mean a legal text that is invisible until it has
                been scrolled to, and the index above jumps straight past the
                sections it skips. A legal document is simply present. */}
            <ol className="legal__sections">
              {copy.sections.map((section, i) => (
                <li className="legal__section" id={`${doc}-${i + 1}`} key={section.title}>
                  <p className="eyebrow legal__number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>

                  <h2 className="legal__title">{section.title}</h2>

                  {section.blocks.map((block, b) =>
                    Array.isArray(block) ? (
                      <ul className="legal__list" key={b}>
                        {block.map((item) => (
                          <li key={item}>{fill(item, tokens)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="legal__para" key={b}>
                        {fill(block, tokens)}
                      </p>
                    ),
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
