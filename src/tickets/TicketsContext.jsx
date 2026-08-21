import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * One piece of shared state: whether the ticketing overlay is open.
 *
 * Every "TICKETS Y MESAS VIP" placement — navbar, mobile hero, mobile menu,
 * contact, footer — calls the same `openTickets()`, so the overlay is mounted
 * once at the app root instead of once per button.
 */
const TicketsContext = createContext(null)

export function TicketsProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openTickets = useCallback(() => setOpen(true), [])
  const closeTickets = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ open, openTickets, closeTickets }), [open, openTickets, closeTickets])

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
}

export function useTickets() {
  const ctx = useContext(TicketsContext)
  if (!ctx) throw new Error('useTickets must be used inside <TicketsProvider>')
  return ctx
}
