import type { IFiltersUser } from "../../../api/dto/users/IUser";

export const generateODataQueryUser = (filterData: IFiltersUser) => {
  const sizePage = 10;
  let oDataQuery = "$count=true";

  if (filterData.pagination) {
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }

  if (filterData.name || filterData.cityId) {
    const filters: string[] = [];

    // +7 (777) 777-77-77 - проверка
    if (/^\+\d\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/g.test(filterData.name)) {
      filters.push(`contains(phone, '${encodeURIComponent(filterData.name.replace(/[\s()\-+]/g, "").toLowerCase())}')`);
    } else if (/^[0-9-()\s]+$/.test(filterData.name) || filterData.name.includes("+7")) {
      filters.push(`contains(phone, '${encodeURIComponent(filterData.name.replace(/[\s()\-+]/g, "").toLowerCase())}')`);
    } else if (filterData.name) {
      filters.push(`(contains(tolower(lastName), '${encodeURIComponent(filterData.name.split(" ")[0].toLowerCase())}')
            or contains(tolower(firstName), '${encodeURIComponent(filterData.name.split(" ")[0].toLowerCase())}')
            or contains(tolower(middleName), '${encodeURIComponent(filterData.name.split(" ")[0].toLowerCase())}')
            or contains(tolower(email), '${encodeURIComponent(filterData.name.toLowerCase())}'))`);
    }

    if (filterData.cityId) {
      filters.push(`cityId eq ${filterData.cityId}`);
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
