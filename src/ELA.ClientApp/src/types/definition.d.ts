declare interface Definition extends BaseEntity {
  meaning: string;
  translation?: string;
  partOfSpeech?: string;
  examples: Example[];
}
