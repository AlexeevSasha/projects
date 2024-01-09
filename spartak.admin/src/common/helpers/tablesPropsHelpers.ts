import type { TablePaginationConfig } from "antd";
import type { SorterResult } from "antd/lib/table/interface";
import { Dispatch, SetStateAction } from "react";
import { sortDirectionMap } from "../constants/sorting";
import { guardTypeNumberPagination, guardTypeOneSorter } from "./guardsTypes";

export const onChangeDataTable = <T, F>(
  pagination: TablePaginationConfig,
  sorter: SorterResult<T> | SorterResult<T>[],
  filters: F | any,
  setFilters: Dispatch<SetStateAction<F>>
) => {
  // ЗАЩИТА ТИПА НА СУЩЕСТВОВАНИЕ pagination.current
  if (guardTypeNumberPagination(pagination.current) && guardTypeOneSorter<T>(sorter)) {
    const sortField = Array.isArray(sorter.field) ? sorter.field.join("/") : sorter.field;
    const valueSorting = sorter.order ? `${sortField} ${sortDirectionMap[sorter.order]}` : sorter.order;
    setFilters({
      ...filters,
      sorting: valueSorting || filters.sorting,
      pagination: pagination.current,
      pageSize: pagination.pageSize,
    });
  }
};

const pageSizeOptions = [10, 20, 50];

export const onChangePaginationTable = (total: number, current = 1, pageSize?: number) => ({
  pageSizeOptions,
  showSizeChanger: true,
  defaultCurrent: 1,
  pageSize,
  current,
  total,
});
