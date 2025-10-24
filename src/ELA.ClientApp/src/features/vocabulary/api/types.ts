export type CreateVocabularyDto = {
  text: string;
  ipa?: string;
};

export type UpdateVocabularyDto = {
  id: number;
  text: string;
  ipa?: string;
};

export type CreateDefinitionDto = {
  meaning: string;
  translation?: string;
  partOfSpeech?: string;
};

export type CreateExampleDto = {
  text: string;
  translation?: string;
};
