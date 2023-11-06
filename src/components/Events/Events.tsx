import {
  Box,
  BoxProps,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import data from "./data.json";
import { Event } from "./types";

type EventItemProps = { event: Event };

type EventListProps = BoxProps & {
  events: ReadonlyArray<Event>;
  render: (event: Event) => React.ReactElement;
};

export const Events: FC = () => {
  const [query, setQuery] = useState("");
  const events = data.filter((event) => {
    if (query) {
      return event.name.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  }) as unknown as ReadonlyArray<Event>;

  return (
    <Box>
      <Input
        value={query}
        placeholder="Search by name..."
        onChange={(e) => setQuery(e.target.value)}
      />

      <EventList
        mt="4"
        events={events}
        render={(event) => <EventItem key={event.id} event={event} />}
      />
    </Box>
  );
};

export const EventList: FC<EventListProps> = ({ events, render, ...props }) => {
  return (
    <Box {...props}>
      <Heading>Events</Heading>

      <Grid mt="4" gap="4" templateColumns="repeat(2, 1fr)">
        {events.map((event) => render(event))}
      </Grid>
    </Box>
  );
};

export const EventItem: FC<EventItemProps> = ({ event }) => {
  const { name, image, description_without_html: description } = event;

  return (
    <GridItem>
      <Image w="full" src={image} />

      <Heading mt="4" size="md" noOfLines={1}>
        {name}
      </Heading>

      <Text mt="1" color="gray.500" noOfLines={3}>
        {description?.substring(0, 140)}
      </Text>
    </GridItem>
  );
};
