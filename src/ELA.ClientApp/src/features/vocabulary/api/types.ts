import type { PartOfSpeech } from '@/features/vocabulary';

export type CreateVocabularyDto = {
  text: string;
  ipa?: string;
  definitions?: CreateDefinitionDto[];
};

export type CreateDefinitionDto = {
  meaning: string;
  translation?: string;
  partOfSpeech?: PartOfSpeech;
  examples?: CreateExampleDto[];
};

export type CreateExampleDto = {
  text: string;
  translation?: string;
};

export type UpdateVocabularyDto = {
  id: number;
  text: string;
  ipa?: string;
};

export type UpdateDefinitionDto = {
  id?: number;
  meaning: string;
  translation?: string;
  partOfSpeech?: PartOfSpeech;
};

export type UpdateExampleDto = {
  id?: number;
  text: string;
  translation?: string;
};
