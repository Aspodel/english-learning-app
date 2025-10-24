declare interface Vocabulary extends BaseAuditableEntity {
  text: string;
  ipa?: string;
  userId: string;
  definitions: Definition[];
}
