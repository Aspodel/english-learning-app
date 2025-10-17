import { createCRUD } from '@/lib/crud-factory';
import type { CreateVocabularyDto, UpdateVocabularyDto } from './types';

const endpoint = 'vocabulary';

export const vocabularyApi = createCRUD<
  CreateVocabularyDto,
  UpdateVocabularyDto,
  Vocabulary,
  Vocabulary
>(endpoint, {
  get: `/${endpoint}/:id`,
  post: `/${endpoint}`,
  put: `/${endpoint}/:id`,
  delete: `/${endpoint}/:id`,
  search: `/${endpoint}`,
});
