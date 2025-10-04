declare interface ReviewLog extends BaseEntity {
  reviewDate: string;
  qualityRating: number; // 0 to 5 scale
  interval: number;
  easeFactor: number;
  repetition: number;
}
