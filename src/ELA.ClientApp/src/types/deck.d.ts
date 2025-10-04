declare interface Deck extends BaseAuditableEntity {
  name: string;
  userId: string;
  cards: Card[];
}
