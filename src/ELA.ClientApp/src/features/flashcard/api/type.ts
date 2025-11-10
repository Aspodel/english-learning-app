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

export type CreateCardDto = {
  deckId: number;
  front: string;
  back: string;
};

export type UpdateCardDto = {
  deckId: number;
  cardId: number;
  front: string;
  back: string;
};