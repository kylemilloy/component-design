import { Box, Grid, Heading, type BoxProps } from '@chakra-ui/react'
import { type FC, type ReactElement } from 'react'
import { Event } from './types'

type EventListProps = BoxProps & {
  events: ReadonlyArray<Event>
  render: (event: Event) => ReactElement
}

const EventList: FC<EventListProps> = ({ events, render, ...props }) => {
  return (
    <Box {...props}>
      <Heading>Events</Heading>

      <Grid mt="4" gap="4" templateColumns="repeat(2, 1fr)">
        {events.map((event) => render(event))}
      </Grid>
    </Box>
  )
}

export default EventList
