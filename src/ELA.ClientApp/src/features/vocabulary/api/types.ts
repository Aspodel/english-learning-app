export type CreateVocabularyDto = {
  word: string;
  definition: string;
  exampleSentence?: string;
};

export type UpdateVocabularyDto = {
  definition?: string;
  exampleSentence?: string;
};