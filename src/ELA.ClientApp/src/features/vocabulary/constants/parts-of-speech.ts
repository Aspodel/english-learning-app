export const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'interjection',
] as const;

export type PartOfSpeech = (typeof PARTS_OF_SPEECH)[number];
