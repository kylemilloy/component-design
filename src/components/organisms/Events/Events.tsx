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
import { ReactElement, useState } from 'react'
import data from './data.json'
import { Event } from './types'

export default function Events() {
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

  return (
    <Box>
      <Input
        value={query}
        placeholder="Search by name..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <Events.List
        mt="4"
        events={events}
        render={(event) => (
          <Events.Item
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
        {events.map((event) => render(event))}
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
