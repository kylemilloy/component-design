import { Box, Input } from '@chakra-ui/react'
import afterFrame from 'afterframe'
import { FC, useState } from 'react'
import benchmark from '../../../utils/benchmark'
import EventItem from './EventItem'
import EventList from './EventList'
import data from './data.json'
import { Event } from './types'

const Events: FC = () => {
  const [query, setQuery] = useState('')
  const events = data.filter((event) => {
    if (query) {
      return event.name.toLowerCase().includes(query.toLowerCase())
    }

    return true
  }) as unknown as ReadonlyArray<Event>

  const end = benchmark()

  afterFrame(end)

  return (
    <Box>
      <Input
        value={query}
        placeholder="Search by name..."
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      <EventList
        mt="4"
        events={events}
        render={(event) => <EventItem key={event.id} event={event} />}
      />
    </Box>
  )
}

export default Events