import { NextRouter } from "next/router";

const noDelete = ["id", "category"];

type QueryParams = {
  [key: string]: string | string[] | undefined;
};

const deleteAllQuery = (query: QueryParams) => {
  Object.keys(query).forEach((key) => {
    if (!noDelete.includes(key)) {
      delete query[key];
    }
  });

  return query;
};

export const removeTagsQuery = (key: string, value: string, router: NextRouter) => {
  if (key === "all") {
    router?.push({ query: deleteAllQuery(router.query) });
    return;
  }
  if (key === "price") {
    router?.push({ query: { ...router.query, minPrice: [], maxPrice: [] } });
    return;
  }
  let check = router.query[key];
  if (Array.isArray(check)) {
    const index = check.indexOf(value);
    check.splice(index, 1);
  } else {
    check = [];
  }
  router?.push({
    query: { ...router.query, [key]: check },
  });
};
