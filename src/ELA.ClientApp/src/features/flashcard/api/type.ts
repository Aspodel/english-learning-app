export type DeckDto = {
  name: string;
  description?: string;
};

export type DeckListItem = {
  id: number;
  name: string;
  description?: string;
  cardCount: number;
  created: string;
};