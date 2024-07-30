import type { IBaseFilters, IOrder } from "../../../api/dto/pointsSystem";
import { changeDataFormatToISO } from "../../../common/helpers/changeDateFormatToISO";

export const generateODataQueryOrder = (filterData: IBaseFilters<IOrder> | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;

  if (filterData.name || filterData.status || filterData.date) {
    const filters: string[] = [];

    if (filterData.name) {
      filters.push(
        `contains(tolower(user/name), '${encodeURIComponent(
          filterData.name.toLowerCase()
        )}') or contains(tolower(user/phone), '${encodeURIComponent(filterData.name.toLowerCase())}')`
      );
    }

    if (filterData.status) {
      filters.push(`status eq '${filterData.status}'`);
    }

    if (filterData.date) {
      filters.push(`(date ge ${changeDataFormatToISO(filterData.date[0], true)} and date le ${changeDataFormatToISO(filterData.date[1])})`);
    }
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    const val = filterData.sorting.split(" ");
    if (filterData.sorting.includes("name") || filterData.sorting.includes("phone")) {
      oDataQuery += `&$orderby=user/${val[0]} ${val[1]}`;
    } else if (filterData.sorting.includes("product")) {
      oDataQuery += `&$orderby=product/name ${val[1]}`;
    } else {
      oDataQuery += `&$orderby=${filterData.sorting}`;
    }
  } else {
    oDataQuery += `&$orderby=date desc`;
  }

  return oDataQuery;
};
