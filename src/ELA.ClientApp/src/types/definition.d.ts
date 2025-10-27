declare interface Definition extends BaseEntity {
  meaning: string;
  translation?: string;
  partOfSpeech?: (typeof PARTS_OF_SPEECH)[number];
  examples: Example[];
}

const PARTS_OF_SPEECH: readonly [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'interjection',
];
