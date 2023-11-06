import { Box, Grid, Heading } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { type FC, type ReactElement } from 'react'
import { Event } from './types'

type EventListProps = {
  events: ReadonlyArray<Event>
  render: (event: Event) => ReactElement
}

const EventGrid = styled(Grid)`
  gap: 1rem;
  margin-top: 1rem;
`

const EventList: FC<EventListProps> = ({ events, render }) => {
  return (
    <Box>
      <Heading>Events</Heading>

      <EventGrid templateColumns="repeat(2, 1fr)">
        {events.map((event) => render(event))}
      </EventGrid>
    </Box>
  )
}

export default EventList
