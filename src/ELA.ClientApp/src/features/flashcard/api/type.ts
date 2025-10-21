export type CreateDeckDto = {
  name: string;
  description?: string;
};

export type UpdateDeckDto = {
  name?: string;
  description?: string;
};

export type DeckListItem = {
  id: string;
  name: string;
  description?: string;
  cardCount: number;
  created: string;
};