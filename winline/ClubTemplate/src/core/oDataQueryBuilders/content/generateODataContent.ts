import { IFilterContent } from "../../../api/dto/content/content";
import { changeDataFormatToISO } from "../../../common/helpers/changeDateFormatToISO";

export const generateODataQueryContent = (filterData: IFilterContent) => {
  const sizePage = 10;
  let oDataQuery = "$count=true";

  if (filterData.pagination) {
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }

  if (filterData.contentType || filterData.name || filterData.date || filterData.contentStatus) {
    const filters: string[] = [];

    if (filterData.contentType) {
      filters.push(`contentType eq '${filterData.contentType}'`);
    }

    if (filterData.contentStatus) {
      filters.push(`contentStatus eq '${filterData.contentStatus}'`);
    }

    if (filterData.name) {
      filters.push(`(contains(tolower(name), '${encodeURIComponent(filterData.name.replace(/'/g, "%27%27").toLowerCase())}') or 
            contains(tolower(tag), '${encodeURIComponent(filterData.name.replace(/'/g, "%27%27").toLowerCase())}'))`);
    }

    if (filterData.date) {
      filters.push(`(beginningPublication ge ${changeDataFormatToISO(filterData.date[0], true)}
            and endPublication le ${changeDataFormatToISO(filterData.date[1])})`);
    }

    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else if (filterData.contentStatus === "Published") {
    oDataQuery += `&$orderby=sortOrder asc`;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
