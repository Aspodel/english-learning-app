export type CreateVocabularyDto = {
  text: string;
  ipa: string;
};

export type UpdateVocabularyDto = {
  id: number;
  text: string;
  ipa: string;
  definitions?: DefinitionDto[];
};

export type DefinitionDto = {
  meaning: string;
  translation: string;
  partOfSpeech: string;
  examples?: ExampleDto[];
};

export type ExampleDto = {
  text: string;
  translation: string;
};
