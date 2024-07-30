import { IFilterContent } from "../../../api/dto/content/IContent";
import { changeDataFormatToISO } from "../../../common/helpers/changeDateFormatToISO";

export const generateODataQueryContent = (filterData: IFilterContent, mode?: string) => {
  const sizePage = 10;
  let oDataQuery = `${mode ? mode : ""}$count=true`;

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
      filters.push(`(createdUtc ge ${changeDataFormatToISO(filterData.date[0], true)}
            and createdUtc le ${changeDataFormatToISO(filterData.date[1])})`);
    }

    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }

  if (filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else if (mode) {
    return oDataQuery;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
