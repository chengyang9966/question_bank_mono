const paginationHelper = (options: {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: 'asc' | 'desc';
}) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  return {
    skip: Number((page - 1) * limit),
    take: Number(limit),
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  };
};

export default paginationHelper;
