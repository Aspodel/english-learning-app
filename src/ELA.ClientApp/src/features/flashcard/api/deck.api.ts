import { createCRUD } from '@/lib/crud-factory';
import type { CreateDeckDto, UpdateDeckDto, DeckListItem } from './type';

const endpoint = 'decks';

export const deckApi = createCRUD<
  CreateDeckDto,
  UpdateDeckDto,
  Deck,
  DeckListItem
>(endpoint, {
  get: `/${endpoint}/:id`,
  post: `/${endpoint}`,
  put: `/${endpoint}/:id`,
  delete: `/${endpoint}/:id`,
  search: `/${endpoint}`,
});
