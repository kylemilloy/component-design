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
import styled from '@emotion/styled'
import afterFrame from 'afterframe'
import { FC, ReactElement, useState } from 'react'
import benchmark from '../../../utils/benchmark'
import data from './data.json'
import { Event } from './types'

type EventItemProps = {
  event: Event
  isFavorited: boolean
  onFavorite: (id: number) => void
}

const MainHeading = styled(Heading)`
  margin: 1rem 0 0;
`

const SubHeading = styled(Heading)`
  display: flex;
  margin: 0.5rem 0;
  text-transform: uppercase;
  color: var(--chakra-colors-gray-500);
`

const StyledText = styled(Text)`
  margin: 0.25rem 0 0;
  color: var(--chakra-colors-gray-500);
`

const FullWidthImage = styled(Image)`
  width: 100%;
`

const ImageContainer = styled(Box)`
  position: relative;
`

const FavoriteButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  align-items: center;
  justify-content: center;
`

const FavoriteIcon = styled(Icon)`
  width: 1.5rem;
  height: 1.5rem;
  color: red;
`

const EventItem: FC<EventItemProps> = ({ event, isFavorited, onFavorite }) => {
  const { name, image, location, description_without_html: description } = event

  return (
    <GridItem>
      <ImageContainer>
        <FullWidthImage src={image} />

        <FavoriteButton
          aria-label="Toggle Favorite"
          onClick={() => onFavorite(event.id)}
        >
          <FavoriteIcon>
            <path
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke={'currentColor'}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </FavoriteIcon>
        </FavoriteButton>
      </ImageContainer>

      <MainHeading size="md" noOfLines={1}>
        {name}
      </MainHeading>

      <SubHeading size="xs">
        {location.name}, {location.city}
      </SubHeading>

      <StyledText noOfLines={3}>{description?.substring(0, 140)}</StyledText>
    </GridItem>
  )
}

type EventListProps = {
  events: ReadonlyArray<Event>
  render: (event: Event) => ReactElement
} & BoxProps

const EventGrid = styled(Grid)`
  gap: 1rem;
  margin-top: 1rem;
`

export const EventList: FC<EventListProps> = ({ events, render, ...props }) => {
  return (
    <Box {...props}>
      <Heading>Events</Heading>

      <EventGrid templateColumns="repeat(2, 1fr)">
        {events.map((event) => render(event))}
      </EventGrid>
    </Box>
  )
}

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
