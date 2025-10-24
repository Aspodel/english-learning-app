declare interface Deck extends BaseAuditableEntity {
  name: string;
  description?: string;
  userId: string;
  cards: Card[];
}
