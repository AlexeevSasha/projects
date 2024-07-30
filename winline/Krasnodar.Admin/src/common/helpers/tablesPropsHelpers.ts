import React from "react";
import { guardTypeNumberPagination, guardTypeOneSorter } from "./guardsTypes";
import { sortedNamesOData } from "../constants/sortedNamesOData";
import type { TablePaginationConfig } from "antd";
import type { SorterResult } from "antd/lib/table/interface";
import i18next from "i18next";

export const onChangeDataTable = <T, F>(
  pagination: TablePaginationConfig,
  sorter: SorterResult<T> | SorterResult<T>[],
  filters: F,
  setFilters: React.Dispatch<React.SetStateAction<F>>
) => {
  // ЗАЩИТА ТИПА НА СУЩЕСТВОВАНИЕ pagination.current
  if (guardTypeNumberPagination(pagination.current) && guardTypeOneSorter<T>(sorter)) {
    const valueSorting = sorter.order ? `${sorter.field} ${sortedNamesOData[sorter.order]}` : sorter.order;
    setFilters({
      ...filters,
      sorting: valueSorting,
      pagination: pagination.current
    });
  }
};

export const onChangePaginationTable = (allCounts: number, currentPage: number) => {
  return {
    defaultCurrent: 1,
    current: currentPage,
    total: allCounts,
    showSizeChanger: false,
    showTotal: (total: any, range: any[]) => i18next.t("common.pagination", { range0: range[0], range1: range[1], total: total })
  };
};
