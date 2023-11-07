import React, { useCallback } from "react";
import { DOTS, usePagination } from "../../hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { PaginateButton } from "./paginateButton";

export interface IPaginate {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = (props: IPaginate) => {
  const { onChange, totalCount, currentPage, pageSize, siblingCount } = props;

  const pagination = usePagination({
    currentPage,
    totalCount,
    siblingCount: siblingCount || 1,
    pageSize,
  });

  const onNext = useCallback(() => onChange(currentPage + 1), [currentPage]);
  const onPrevious = useCallback(() => onChange(currentPage - 1), [currentPage]);

  if (currentPage === 0 || (pagination && pagination.length < 2)) {
    return null;
  }

  return (
    <ul className={"inline-flex items-center -space-x-px"}>
      <PaginateButton
        className={`rounded-l-lg ${
          currentPage === 1 ? "pointer-events-none bg-gray-100 opacity-50" : ""
        }`}
        content={<ChevronLeftIcon className={"h-5 w-5"} />}
        onClick={onPrevious}
      />
      {pagination?.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <PaginateButton
              key={i}
              className={"pointer-events-none cursor-default"}
              content={<span>{DOTS}</span>}
            />
          );
        }

        return (
          <PaginateButton
            key={i}
            content={<span>{pageNumber}</span>}
            onClick={() => onChange(Number(pageNumber))}
            className={
              pageNumber === currentPage
                ? "pointer-events-none  z-10 border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                : ""
            }
          />
        );
      })}
      <PaginateButton
        className={`rounded-r-lg ${
          currentPage === pagination?.at(-1) ? "pointer-events-none bg-gray-100 opacity-50" : ""
        }`}
        content={<ChevronRightIcon className={"h-5 w-5"} />}
        onClick={onNext}
      />
    </ul>
  );
};
