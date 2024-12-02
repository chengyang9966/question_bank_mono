export interface Pagination {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}
