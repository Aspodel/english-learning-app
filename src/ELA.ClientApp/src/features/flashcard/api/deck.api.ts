import { createCRUD } from '@/lib/crud-factory';
import type { DeckDto, DeckListItem } from './type';

const endpoint = 'decks';

export const deckApi = createCRUD<
  DeckDto,
  DeckDto & { id: number },
  Deck,
  DeckListItem
>(endpoint, {
  get: `/${endpoint}/:id`,
  post: `/${endpoint}`,
  put: `/${endpoint}/:id`,
  delete: `/${endpoint}/:id`,
  search: `/${endpoint}`,
});
