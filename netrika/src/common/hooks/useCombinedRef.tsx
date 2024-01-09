import React, { useCallback } from "react";

type RefItem<T> = ((element: T | null) => void) | React.MutableRefObject<T | null> | null | undefined;

export const useCombinedRef = <T,>(...refs: RefItem<T>[]) => {
  const refCb = useCallback((element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    });
    // eslint-disable-next-line
  }, refs);

  return refCb;
};
