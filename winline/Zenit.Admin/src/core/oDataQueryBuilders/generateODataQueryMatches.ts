import moment from "moment";
import { IMatchFilters } from "../../api/dto/IMatch";
import { changeDataFormatToISO } from "../../common/helpers/changeDateFormatToISO";

export const generateODataQueryMatches = (filterData: IMatchFilters | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;
  const filters: string[] = [];
  if (filterData.homeTeamName || filterData.guestTeamName || filterData.date) {
    if (filterData.homeTeamName) {
      filters.push(`(contains(tolower(homeTeamName), '${encodeURIComponent(filterData.homeTeamName.toLowerCase())}'))`);
    }

    if (filterData.guestTeamName) {
      filters.push(`(contains(tolower(guestTeamName), '${encodeURIComponent(filterData.guestTeamName.toLowerCase())}'))`);
    }
    if (filterData.date) {
      filters.push(`(dateTimeStart ge ${changeDataFormatToISO(filterData.date[0], true)}
      and dateTimeStart le ${changeDataFormatToISO(filterData.date[1])})`);
    }
  }

  if (!filterData.date) {
    const startDate = moment().subtract(24, "hours");
    filters.push(`(dateTimeStart ge ${changeDataFormatToISO(startDate, true)})`);
  }

  if (filters[0]) {
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=dateTimeStart asc`;
  }

  return oDataQuery;
};
