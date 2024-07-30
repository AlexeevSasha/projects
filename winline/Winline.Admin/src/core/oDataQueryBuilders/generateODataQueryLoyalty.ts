import { ILoyaltyFilters } from "../../api/dto/loyalty/ILoyalty";
import { changeDataFormatToISO } from "../../common/helpers/changeDateFormatToISO";

export const generateODataQueryLoyalty = (filterData: ILoyaltyFilters | undefined) => {
  if (!filterData) {
    return "$expand=Condition,AcceptUser,WinnerUser,Club&count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;

  if (!filterData.id) {
    oDataQuery += `&$expand=Condition,AcceptUser,WinnerUser,Club`;
  }
  if (filterData.name || filterData.clubId || filterData.date || filterData.status || filterData.id) {
    const filters: string[] = [];

    if (filterData.name) {
      filters.push(`contains(tolower(name), '${encodeURIComponent(filterData.name.replace(/'/g, "%27%27").toLowerCase())}')`);
    }

    if (filterData.clubId) {
      filters.push(`Club/Id eq ${filterData.clubId}`);
    }

    if (filterData.id) {
      filters.push(`id eq ${filterData.id}`);
    }

    if (filterData.status) {
      filters.push(`status eq '${filterData.status.replace(/'/g, "%27%27").toLowerCase()}'`);
    }

    if (filterData.date) {
      filters.push(
        `(startDate ge ${changeDataFormatToISO(filterData.date[0], true)} and endDate le ${changeDataFormatToISO(filterData.date[1])})`
      );
    }
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting && !filterData.sorting.includes("condition")) {
    if (filterData.sorting.includes("acceptUser")) {
      const total = filterData.sorting.split(" ");
      total[0] = "AcceptUser/Total";
      oDataQuery += `&$orderby=${total[0]} ${total[1]}`;
    } else {
      oDataQuery += `&$orderby=${filterData.sorting}`;
    }
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
