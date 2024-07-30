import { IEmployeeFilters } from "../../../api/dto/employees/IEmployee";

export const generateODataQueryEmployee = (filterData: IEmployeeFilters | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;
  if (filterData.name || filterData.roleId) {
    const filters: string[] = [];

    if (filterData.name) {
      filters.push(`contains(tolower(name), '${encodeURIComponent(filterData.name.toLowerCase())}')`);
    }

    if (filterData.roleId) {
      filters.push(`roleid eq ${filterData.roleId}`);
    }
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
