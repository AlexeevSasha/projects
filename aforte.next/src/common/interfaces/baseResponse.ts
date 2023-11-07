export type BaseRequest<T> = {
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
  meta: unknown;
  errors: string[];
};
