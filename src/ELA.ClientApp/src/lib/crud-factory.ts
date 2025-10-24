import { createGet } from '@/api/base-get';
import { createPost } from '@/api/base-post';
import { createPut } from '@/api/base-put';
import { createDelete } from '@/api/base-delete';
import { createSearch } from '@/api/base-search';

export function createCRUD<TCreate, TUpdate extends { id: string | number; }, TGet, TSearch>(
  name: string,
  routes: {
    get: string;
    post: string;
    put: string;
    delete: string;
    search: string;
  }
) {
  return {
    ...createGet<TGet>(name, routes.get),
    ...createPost<TCreate>(name, routes.post),
    ...createPut<TUpdate>(name, routes.put),
    ...createDelete(name, routes.delete),
    ...createSearch<TSearch>(name, routes.search),
  };
}
