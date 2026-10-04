import { useEffect, useState } from 'react'
import { fetchEvents } from '../lib/eventsApi'

/**
 * Loads the programme on mount from the OpenSheet API.
 */
export function useEvents() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    fetchEvents()
      .then((next) => {
        if (cancelled) return
        setEvents(next)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setEvents([])
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { events, status }
}
