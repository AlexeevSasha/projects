import { changeDataFormatToISO } from "../../../common/helpers/changeDateFormatToISO";
import type { ISystemLogFilters } from "../../../api/dto/systemLog/ISystemLog";

export const generateODataQuerySystemLog = (filterData: ISystemLogFilters) => {
  const sizePage = 10;
  let oDataQuery = "$count=true";

  if (filterData.pagination) {
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }

  if (filterData.name || filterData.employee || filterData.date) {
    const filters: string[] = [];

    if (/^[\da-z]{8}-[\da-z]{4}-[\da-z]{4}-[\da-z]{4}-[\da-z]{12}$/.test(filterData.name)) {
      filters.push(`id eq ${filterData.name}`);
    } else if (filterData.name) {
      filters.push(`(contains(tolower(username), '${encodeURIComponent(filterData.name.toLowerCase())}')
           or contains(tolower(tablename), '${encodeURIComponent(filterData.name.toLowerCase())}')
            or contains(tolower(actionname), '${encodeURIComponent(filterData.name.toLowerCase())}'))`);
    }

    if (filterData.employee) {
      filters.push(`userid eq ${filterData.employee}`);
    }

    if (filterData.date) {
      filters.push(`(createdUtc ge ${changeDataFormatToISO(filterData.date[0], true)}
      and createdUtc le ${changeDataFormatToISO(filterData.date[1])})`);
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
