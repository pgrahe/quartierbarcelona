import { useEffect, useState } from 'react'

import './PageHero.css'

/**
 * Compact header for an inner page — title and lead on ink, no photograph.
 * The home page keeps the video hero; content pages open lighter so the
 * section underneath starts sooner.
 */
export default function PageHero({ title, lead }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true)
      return
    }
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className="phero" data-entered={entered} aria-labelledby="page-title">
      <div className="shell phero__body">
        <h1 className="phero__title" id="page-title">
          <span className="phero__title-inner">{title}</span>
        </h1>
        <p className="phero__lead">{lead}</p>
      </div>
    </section>
  )
}
