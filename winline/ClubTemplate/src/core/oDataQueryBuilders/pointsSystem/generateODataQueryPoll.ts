import type { IBaseFilters, IPoll } from "../../../api/dto/pointsSystem";
import { changeDataFormatToISO } from "../../../common/helpers/changeDateFormatToISO";

export const generateODataQueryPoll = (filterData: IBaseFilters<IPoll> | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;

  if (filterData.name || filterData.status || filterData.date) {
    const filters: string[] = [];

    if (filterData.name) {
      filters.push(`contains(tolower(match/name), '${encodeURIComponent(filterData.name.toLowerCase())}')`);
    }

    if (filterData.status) {
      filters.push(`status eq '${filterData.status}'`);
    }

    if (filterData.date) {
      filters.push(
        `(startDate ge ${changeDataFormatToISO(filterData.date[0], true)} and startDate le ${changeDataFormatToISO(filterData.date[1])})`
      );
    }
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=startDate desc`;
  }

  return oDataQuery;
};
