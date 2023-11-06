import { GridItem, Heading, Image, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { Event } from './types'

type EventItemProps = { event: Event }

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

const EventItem: FC<EventItemProps> = ({ event }) => {
  const { name, image, location, description_without_html: description } = event

  return (
    <GridItem>
      <Image w="full" src={image} />

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

export default EventItem
