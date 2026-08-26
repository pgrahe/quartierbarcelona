import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { HOME_ROUTE, pathFor, routeFromPath } from './routes'
import { navOffset, scrollToSection, scrollToSectionWhenReady } from '../lib/scrollTo'

/* -------------------------------------------------------------------------
 * A router in ~90 lines, and deliberately no dependency.
 *
 * Every URL on this site is prerendered to real HTML at build time, so the
 * router never has to fetch, match patterns or code-split — it only has to
 * answer one question ("which page is this pathname?") and swap the page
 * component when a link is clicked, so navigation stays instant and the
 * ticketing overlay, the language state and the fixed navbar survive it.
 *
 * pushState does not fire an event, so navigations are announced on a custom
 * one. Both this provider and LanguageProvider listen for it, which keeps
 * them independent of each other rather than circularly imported.
 * ---------------------------------------------------------------------- */

export const NAV_EVENT = 'quartier:navigate'

/** Change the address bar and tell everyone who cares. */
export function pushPath(url) {
  const [path] = url.split('#')
  if (window.location.pathname + window.location.hash !== url) {
    window.history.pushState({ path }, '', url)
  }
  window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: { path } }))
}

const RouteContext = createContext(null)

function currentPath(initialPath) {
  if (initialPath) return initialPath
  return typeof window === 'undefined' ? '/' : window.location.pathname
}

export function RouteProvider({ children, initialPath }) {
  const [path, setPath] = useState(() => currentPath(initialPath))
  /* Where to land once the incoming page exists. Set by navigate(), consumed
     by the effect below — see the comment there. */
  const pendingHash = useRef(null)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    window.addEventListener(NAV_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(NAV_EVENT, sync)
    }
  }, [])

  const { routeId, lang } = useMemo(() => routeFromPath(path), [path])

  /* A URL that arrives with a hash — shared, bookmarked, or typed — has to be
     honoured once, on mount. The browser's own anchor handling runs against an
     empty #root: the section it is looking for is rendered a moment later. */
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) scrollToSectionWhenReady(hash, { offset: navOffset(), behavior: 'auto' })
  }, [])

  /* Landing on a section of another page.
   *
   * This provider sits above the whole app, so its effects run after every
   * child has mounted — which makes this the first moment the incoming page's
   * sections are guaranteed to be in the document. Doing it here rather than
   * polling for the element from inside the click handler is what makes the
   * jump reliable rather than a race against React's scheduler. */
  useEffect(() => {
    const hash = pendingHash.current
    if (!hash) return
    pendingHash.current = null
    scrollToSectionWhenReady(hash, { offset: navOffset(), behavior: 'auto' })
  }, [path])

  /**
   * Navigate to a path, optionally landing on a section within it.
   *
   * The vertical position is set before React paints the new page: scrolling
   * the old document to the top and then swapping its contents is what makes
   * a page change land at the top instead of halfway down. A hash target
   * cannot exist yet, so that one waits for the new page to mount.
   */
  const navigate = useCallback(
    (to, { hash } = {}) => {
      const samePage = window.location.pathname === to

      if (samePage) {
        if (hash) scrollToSection(hash, { offset: navOffset() })
        else {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
        }
        return
      }

      /* Land on the section directly, without animation. Smooth-scrolling
         several thousand pixels down a page the visitor has not seen yet is
         not a transition, it is a wait — a hash in a URL should behave like a
         hash in a URL. */
      if (hash) pendingHash.current = hash
      else window.scrollTo({ top: 0, behavior: 'auto' })

      pushPath(hash ? `${to}#${hash}` : to)
    },
    [],
  )

  const value = useMemo(
    () => ({ path, routeId, lang, navigate, isHome: routeId === HOME_ROUTE }),
    [path, routeId, lang, navigate],
  )

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}

export function useRoute() {
  const ctx = useContext(RouteContext)
  if (!ctx) throw new Error('useRoute must be used inside <RouteProvider>')
  return ctx
}

/**
 * An internal link.
 *
 * Stays a real <a> with a real href — cmd-click, middle-click, "open in new
 * tab", crawlers and no-JS visitors all keep working, because every one of
 * these URLs is a genuine document. A plain left-click is handled in-page.
 *
 * `to` is a route id, `hash` an optional section within it.
 *
 * `delay` holds the navigation back by that many milliseconds. Only the
 * fullscreen mobile panel uses it: the page must not start moving underneath
 * a panel that is still on screen — and while that panel is open the body is
 * scroll-locked, so an immediate scroll would be clamped to nothing anyway.
 */
export function RouteLink({ to, hash, lang, delay = 0, className, children, onClick, ...rest }) {
  const route = useRoute()
  const target = pathFor(to, lang || route.lang)
  const href = hash ? `${target}#${hash}` : target

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onClick?.(e)
    if (delay) window.setTimeout(() => route.navigate(target, { hash }), delay)
    else route.navigate(target, { hash })
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-current={to === route.routeId && !hash ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}
