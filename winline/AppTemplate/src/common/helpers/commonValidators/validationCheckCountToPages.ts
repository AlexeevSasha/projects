import { Dispatch, SetStateAction } from "react";
import type { IRemindersFilters } from "../../../api/dto/employees/IEmployeeReminder";
import type { IFiltersRole } from "../../../api/dto/employees/IEmployeeRole";
import type { IEmployeeFilters } from "../../../api/dto/employees/IEmployee";

type IFilters = IEmployeeFilters | IFiltersRole | IRemindersFilters;

export const validationCheckCountToPages = <T extends IFilters>(count: number, pages: number, setFilters: Dispatch<SetStateAction<T>>) => {
  if (Math.ceil(count / 10) !== pages) {
    if (count !== 0 && pages > Math.ceil(count / 10)) {
      setFilters((prev) => ({ ...prev, pagination: pages - 1 }));
    }
  }
};
