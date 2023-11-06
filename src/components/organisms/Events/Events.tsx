import { Box, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'
import afterFrame from 'afterframe'
import { FC, useState } from 'react'
import benchmark from '../../../utils/benchmark'
import EventItem from './EventItem'
import EventList from './EventList'
import data from './data.json'
import { Event } from './types'

const StyledEventList = styled(EventList)`
  margin-top: 1rem;
`

const Events: FC = () => {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Array<Event['id']>>([])
  const events = data.filter((event) => {
    if (query) {
      return event.name.toLowerCase().includes(query.toLowerCase())
    }

    return true
  }) as unknown as ReadonlyArray<Event>

  const onToggleFavorite = (id: number) => {
    setFavorites((favorites) => {
      return favorites.includes(id)
        ? favorites.filter((favorite) => favorite !== id)
        : [...favorites, id]
    })
  }

  const end = benchmark()
  afterFrame(end)

  return (
    <Box>
      <Input
        value={query}
        placeholder="Search by name..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <StyledEventList
        events={events}
        render={(event) => (
          <EventItem
            key={event.id}
            event={event}
            isFavorited={favorites.includes(event.id)}
            onFavorite={(id) => onToggleFavorite(id)}
          />
        )}
      />
    </Box>
  )
}

export default Events
