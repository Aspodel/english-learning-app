import { createCrudApi } from '@/lib/api-factory';

export const vocabularyApi = createCrudApi<Vocabulary, Partial<Vocabulary>>({
  resource: 'vocabularies',
});
