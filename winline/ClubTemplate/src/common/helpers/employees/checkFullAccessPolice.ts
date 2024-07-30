import {accessNames} from "../../accessControles/accessNames";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";

export const checkFullAccessPolice = (role?: IEmployeeRole) => {
  return role?.policies?.includes(accessNames.fullAccess);
};
