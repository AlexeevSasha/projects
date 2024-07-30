import type {IRemindersFilters} from "../../../api/dto/employees/IEmployeeReminder";

export const generateODataQueryReminders = (filterData: IRemindersFilters) => {
  let oDataQuery = '$count=true';
  const sizePage = 10;
  if(filterData.pagination){
    const skipValue = filterData.pagination * sizePage - sizePage;
    oDataQuery += `&$skip=${skipValue}&$top=${sizePage}`;
  }
  if(filterData.sorting) {
    oDataQuery += `&$orderby=${filterData.sorting}`;
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
