import { createCRUD } from '@/lib/crud-factory';

import type { CreateCardDto, UpdateCardDto } from '@/features/flashcard';

const endpoint = 'cards';

export const cardApi = (deckId: number) => createCRUD<CreateCardDto, UpdateCardDto, Card, Card>(
  endpoint,
  {
    get: `/${endpoint}/:id`,
    post: `/${endpoint}`,
    put: `/${endpoint}/:id`,
    delete: `/${endpoint}/:id`,
    search: `/decks/${deckId}/${endpoint}`,
  }
);
