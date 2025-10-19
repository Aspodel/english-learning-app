export type CreateVocabularyDto = {
  text: string;
  ipa: string;
};

export type UpdateVocabularyDto = {
  text: string;
  ipa: string;
  userId: string;
  definitions: Definition[];
};
