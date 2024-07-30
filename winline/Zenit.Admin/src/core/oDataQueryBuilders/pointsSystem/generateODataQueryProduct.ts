import type { IFilters } from "../../../api/dto/pointsSystem";

export const generateODataQueryProduct = (filterData: IFilters | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;

  if (filterData.name) {
    oDataQuery += `&$filter=contains(tolower(name), '${encodeURIComponent(filterData.name.toLowerCase())}')`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
