export const getParamArray = (query?: string | string[]) => {
  if (!query) return [];
  if (typeof query === "string") return [query];
  return query;
};
