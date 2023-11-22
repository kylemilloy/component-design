import { useCallback, useMemo, useState } from 'react'
import data from './data.json'
import { Event } from './types'

export default function useEvents() {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Array<Event['id']>>([])
  const events = useMemo(
    () =>
      data.filter((event) => {
        if (query) {
          return event.name.toLowerCase().includes(query.toLowerCase())
        }

        return true
      }) as unknown as ReadonlyArray<Event>,
    [query],
  )

  const onToggleFavorite = useCallback((id: number) => {
    setFavorites((favorites) => {
      return favorites.includes(id)
        ? favorites.filter((favorite) => favorite !== id)
        : [...favorites, id]
    })
  }, [])

  return {}
}
