declare interface Card extends BaseAuditableEntity {
  front: string;
  back: string;

  // SM-2
  easeFactor: number;
  interval: number;
  repetition: number;
  nextReview: string;
  lastReview?: string;
  suspended: boolean;

  reviewLogs: ReviewLog[];
}
