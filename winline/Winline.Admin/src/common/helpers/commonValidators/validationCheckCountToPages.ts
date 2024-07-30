import { Dispatch, SetStateAction } from "react";
import type { IFiltersRole } from "../../../api/dto/employees/IEmployeeRole";
import type { IEmployeeFilters } from "../../../api/dto/employees/IEmployee";
import type { INotificationFilters } from "../../../api/dto/users/INotificationAwait";
import type { IAdvFilters } from "../../../api/dto/adv/IAdv";
import type { ILoyaltyFilters } from "../../../api/dto/loyalty/ILoyalty";

type IFilters = IEmployeeFilters | IFiltersRole | INotificationFilters | IAdvFilters | ILoyaltyFilters;

export const validationCheckCountToPages = <T extends IFilters>(count: number, pages: number, setFilters: Dispatch<SetStateAction<T>>) => {
  if (Math.ceil(count / 10) !== pages) {
    if (count !== 0 && pages > Math.ceil(count / 10)) {
      setFilters((prev) => ({ ...prev, pagination: pages - 1 }));
    }
  }
};
