import { createCRUD } from '@/lib/crud-factory';

const endpoint = 'card';

export const cardApi = createCRUD<
  CreateCardDto,
  UpdateCardDto,
  Card,
  Card
>(endpoint, {
  get: `/${endpoint}/:id`,
  post: `/${endpoint}`,
  put: `/${endpoint}/:id`,
  delete: `/${endpoint}/:id`,
  search: `/${endpoint}`,
});
