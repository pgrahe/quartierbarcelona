import './Details.css'

/* -------------------------------------------------------------------------
 * Two small editorial primitives, shared by the VIP and Private Events pages.
 *
 * Both exist because those pages needed more substance than the landing
 * section carried, and inventing a second layout language for each of them
 * would have been the fastest way to make the site stop looking like one
 * site. They are numbered rules and type — no boxes, no borders, no icons.
 * ---------------------------------------------------------------------- */

/**
 * A numbered set of points: "QUÉ INCLUYE", "FORMATOS".
 * `items` is [{ title, body }].
 */
export function DetailGrid({ id, eyebrow, items, tone = 'dark' }) {
  if (!items?.length) return null

  return (
    <section className={`dgrid section ${tone === 'stone' ? 'dgrid--stone on-stone' : 'velvet'}`} aria-labelledby={id}>
      <div className="shell">
        <h2 className="eyebrow dgrid__eyebrow" id={id} data-reveal>
          {eyebrow}
        </h2>

        <ul className="dgrid__list">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="dgrid__item"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <p className="eyebrow dgrid__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="dgrid__title">{item.title}</h3>
              <p className="dgrid__body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * Label / value rows — the same shape as the Contact block, so the two read
 * as the same kind of statement. `rows` is [{ label, value }].
 */
export function SpecRows({ id, eyebrow, rows, children }) {
  if (!rows?.length) return null

  return (
    <section className="specs section" aria-labelledby={id}>
      <div className="shell">
        <h2 className="eyebrow specs__eyebrow" id={id} data-reveal>
          {eyebrow}
        </h2>

        <dl className="specs__list">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className="specs__row"
              data-reveal
              style={{ '--reveal-delay': `${60 + i * 70}ms` }}
            >
              <dt className="eyebrow specs__label">{row.label}</dt>
              <dd className="specs__value">{row.value}</dd>
            </div>
          ))}
        </dl>

        {children && (
          <div className="specs__foot" data-reveal>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
