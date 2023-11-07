import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

export const useQueryFilters = () => {
  const router = useRouter();
  const filtersQuery = useRef(router.query);

  const getQueryFilters = useCallback((value: object) => {
    filtersQuery.current = { ...filtersQuery.current, ...value };
    router?.push({
      query: { ...filtersQuery.current },
    });
  }, []);

  useEffect(() => {
    filtersQuery.current = router.query;
  }, [router.query]);

  return { getQueryFilters, router };
};
