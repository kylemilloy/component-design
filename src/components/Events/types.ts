export type Event = {
  id: number;
  name: string;
  slug: string;
  description_without_html?: string;
  starts_on: string;
  ends_on: string;
  image?: string;
  tags: Array<string>;
  ticket_types: Array<{
    id: number;
    name: string;
    price: number;
  }>;
  location: {
    city: string;
    name: string;
  };
};
