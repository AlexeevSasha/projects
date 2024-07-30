import type { IAdvFilters } from "../../api/dto/adv/IAdv";

export const generateODataQueryAdv = (filterData: IAdvFilters | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;
  if (filterData.name || filterData.status || filterData.author) {
    const filters: string[] = [];

    if (filterData.name) {
      filters.push(`contains(tolower(name), '${encodeURIComponent(filterData.name.toLowerCase())}')`);
    }

    if (filterData.status) {
      filters.push(`status eq '${filterData.status}'`);
    }

    if (filterData.author) {
      filters.push(`author eq '${filterData.author}'`);
    }

    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=StartPublish desc`;
  }

  return oDataQuery;
};
