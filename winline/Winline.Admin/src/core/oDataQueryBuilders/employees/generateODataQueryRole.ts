import { IFiltersRole } from "../../../api/dto/employees/IEmployeeRole";

export const generateODataQueryRole = (filterData: IFiltersRole | undefined) => {
  const sizePage = 10;
  let oDataQuery = `$count=true`;
  if (filterData?.pagination) {
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }
  if (filterData?.name) {
    oDataQuery += `&$filter=contains(tolower(name), '${encodeURIComponent(filterData.name.toLowerCase())}')`;
  }

  if (filterData?.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
