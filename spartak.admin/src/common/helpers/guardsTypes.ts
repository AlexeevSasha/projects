import type { SorterResult } from "antd/es/table/interface";

export const guardTypeNumberPagination = (pagination: undefined | number): pagination is number => {
  return !!pagination && typeof pagination === "number";
};

export const guardTypeOneSorter = <T>(sorter: SorterResult<T> | SorterResult<T>[]): sorter is SorterResult<T> => {
  return !!sorter && !(sorter instanceof Array);
};
