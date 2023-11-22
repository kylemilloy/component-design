import {
  Box,
  BoxProps,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { ReactElement, useCallback } from 'react'
import useEvents from './hooks'
import { Event } from './types'

export default function Events() {
  const { query, events, onQuery, favorites, onToggleFavorite } = useEvents()

  const render = useCallback(
    (event: Event) => (
      <Events.Item
        key={event.id}
        event={event}
        onFavorite={onToggleFavorite}
        isFavorited={favorites.includes(event.id)}
      />
    ),
    [favorites, onToggleFavorite],
  )

  return (
    <Box>
      <Input value={query} placeholder="Search by name..." onChange={onQuery} />

      <Events.List mt="4" events={events} render={render} />
    </Box>
  )
}

Events.List = function EventsList({
  events,
  render,
  ...props
}: {
  events: ReadonlyArray<Event>
  render: (event: Event) => ReactElement
} & BoxProps) {
  return (
    <Box {...props}>
      <Heading>Events</Heading>

      <Grid mt="4" gap="4" templateColumns="repeat(2, 1fr)">
        {events.map(render)}
      </Grid>
    </Box>
  )
}

Events.Item = function EventsItem({
  event,
  isFavorited,
  onFavorite,
}: {
  event: Event
  isFavorited: boolean
  onFavorite: (id: number) => void
}) {
  const { name, image, location, description_without_html: description } = event

  return (
    <GridItem>
      <Box position="relative">
        <Image w="full" src={image} />

        <IconButton
          top="4"
          right="4"
          position="absolute"
          alignItems="center"
          justifyContent="center"
          aria-label="Toggle Favorite"
          onClick={() => onFavorite(event.id)}
        >
          <Icon w="6" h="6" color="red">
            <path
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke={'currentColor'}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </Icon>
        </IconButton>
      </Box>

      <Heading mt="4" size="md" noOfLines={1}>
        {name}
      </Heading>

      <Heading
        my="2"
        size="xs"
        display="flex"
        color="gray.500"
        textTransform="uppercase"
      >
        {location.name}, {location.city}
      </Heading>

      <Text mt="1" color="gray.500" noOfLines={3}>
        {description?.substring(0, 140)}
      </Text>
    </GridItem>
  )
}
