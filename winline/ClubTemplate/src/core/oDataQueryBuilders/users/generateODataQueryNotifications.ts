import type {INotificationFilters} from "../../../api/dto/users/INotificationAwait";

export const generateODataQueryNotifications = (filterData: INotificationFilters, isHistory: boolean) => {
  let oDataQuery = '$count=true';
  const filters: string[] = [];

  const sizePage = 10;
  if(filterData.pagination){
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }
  if(filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=sendTime ${isHistory ? "desc" : "asc"}`;
  }

  filters.push(`sentTime ${!isHistory ? "eq " : "ne "}${null}`);

  oDataQuery += `&$filter=${filters}`;

  return oDataQuery;
};
