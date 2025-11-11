// import { createCRUD } from '@/lib/crud-factory';

// import type { CreateCardDto, UpdateCardDto } from '@/features/flashcard';

// const endpoint = 'cards';

// export const cardApi = (deckId: number) =>
//   createCRUD<CreateCardDto, UpdateCardDto, Card, Card>(endpoint, {
//     get: `/${endpoint}/:id`,
//     post: `/${endpoint}`,
//     put: `/${endpoint}/:id`,
//     delete: `/${endpoint}/:id`,
//     search: `/decks/${deckId}/${endpoint}`,
//   });

// src/features/cards/api/cardApi.ts
import { createCrudApi } from '@/lib/api-factory';

export interface Card {
  id: string;
  front: string;
  back: string;
}

export interface CardParams {
  deckId: number;
  page?: number;
  pageSize?: number;
}

export const cardApi = createCrudApi<Card, Partial<Card>, CardParams>({
  resource: 'cards',
  baseUrl: (p) => `/decks/${p.deckId}/cards`,
}).extend((base) => ({
  // GET /decks/:deckId/cards/due
  useDue: (params: { deckId: number }) =>
    base.customQuery<Card[]>({
      key: ['cards', 'due', params.deckId],
      url: `/decks/${params.deckId}/cards/due`,
    }),

  // POST /decks/:deckId/cards/bulk
  useBulkCreate: () =>
    base.customMutation<{ deckId: number; cards: Partial<Card>[] }, Card[]>({
      url: ({ deckId }) => `/decks/${deckId}/cards/bulk`,
      method: 'post',
    }),
}));

// interface Card {
//   id: string;
//   title: string;
// }

// interface PaginatedList<T> {
//   data: T[];
//   total: number;
//   page: number;
//   perPage: number;
// }

// const cardApi = createCrudApi<Card>({ resource: 'cards' });

// // List (paginated)
// const { data: list } = cardApi.useList<PaginatedList<Card>>({ page: 1 });

// // Detail (custom response)
// const { data: detail } = cardApi.useDetail<{ card: Card; comments: string[] }>('123');

// // Create (returns wrapped response)
// const create = cardApi.useCreate<{ card: Card; success: boolean }>();

// // Get all
// const { data } = usersApi.useList({ page: 1, search: 'john' });

// // Get detail
// const { data: user } = usersApi.useDetail(id);

// // Create
// const mutation = usersApi.useCreate({
//   onSuccess: () => alert('User created!'),
// });

// mutation.mutate({ name: 'Alice', email: 'alice@example.com' });

// // Update
// const update = usersApi.useUpdate({
//   onSuccess: () => alert('User updated!'),
// });
// update.mutate({ ...user, name: 'New Name' });

// // Delete
// const del = usersApi.useDelete({
//   onSuccess: () => alert('User deleted!'),
// });
// del.mutate({ id });


// export const usersApi = createCrudApi<User>({
//   resource: 'users',
// }).extend(({ customQuery, customMutation }) => ({
//   useUserStats: () =>
//     customQuery<{ total: number; active: number }>({
//       url: '/users/stats',
//       key: ['users', 'stats'],
//     }),

//   useActivateUser: () =>
//     customMutation<{ id: number }>({
//       url: (body) => `/users/${body.id}/activate`,
//       method: 'post',
//     }),
// }));

// const { data: stats } = usersApi.useUserStats();
// const activateUser = usersApi.useActivateUser();