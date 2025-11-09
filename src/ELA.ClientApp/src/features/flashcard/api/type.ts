export type DeckDto = {
  name: string;
  description?: string;
};

export type DeckListItemDto = {
  id: number;
  name: string;
  description?: string;
  created: string;
  cardCount: number;
  dueCardCount: number;
};