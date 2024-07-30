import { get, post } from "../baseRequest";
import { generateODataQueryReminders } from "../../core/oDataQueryBuilders/employees/generateODataQueryReminders";
import type { IAddReminder, IEmployeeReminder, IRemindersFilters } from "../dto/employees/IEmployeeReminder";

export const getEmployeeReminders = async (filters: IRemindersFilters) => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/odata/Reminder?${generateODataQueryReminders(filters)}`, "application/json");

  return { allEmployeeReminders: response.value, count: response["@odata.count"] };
};

export const addEmployeeReminder = async (dataReminder: IAddReminder): Promise<IEmployeeReminder> =>
  post<string>(`${process.env.REACT_APP_ADMIN}/Reminder/AddReminder`, JSON.stringify(dataReminder), "application/json");
