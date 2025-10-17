import { createCRUD } from '@/lib/crud-factory';

const endpoint = 'deck';

export const deckApi = createCRUD<
  CreateDeckDto,
  UpdateDeckDto,
  Deck,
  Deck
>(endpoint, {
  get: `/${endpoint}/:id`,
  post: `/${endpoint}`,
  put: `/${endpoint}/:id`,
  delete: `/${endpoint}/:id`,
  search: `/${endpoint}`,
});
