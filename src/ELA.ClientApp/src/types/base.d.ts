declare interface BaseEntity<TId = number> {
  id: TId;
}

declare interface BaseAuditableEntity<TId = number> extends BaseEntity<TId> {
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
}

declare interface PaginatedList<T> {
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  items: T[];
}