import { useMemo } from "react";
import { IPaginate } from "../components/pagination/pagination";

export const DOTS = "...";

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => index + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount,
}: Omit<Required<IPaginate>, "onChange">) => {
  return useMemo(() => {
    const total = Math.ceil(totalCount / pageSize);

    // сколько в промежутке будет элементов, из них два dots
    const totalPageNumbers = siblingCount + 5;

    //Если количество страниц меньше, чем номера страниц
    if (totalPageNumbers >= total) return range(1, total);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, total);

    //показываем или скрываем dots
    const leftDots = leftSiblingIndex > 2;
    const rightDots = rightSiblingIndex < total - 2;

    if (!leftDots && rightDots) {
      const leftCount = 3 + 2 * siblingCount;
      return [...range(1, leftCount), DOTS, total];
    }

    if (leftDots && !rightDots) {
      const rightCount = 3 + 2 * siblingCount;
      return [1, DOTS, ...range(total - rightCount + 1, total)];
    }

    if (leftDots && rightDots) {
      const middle = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middle, DOTS, total];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
};
