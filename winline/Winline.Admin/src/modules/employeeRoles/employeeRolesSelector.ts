import { employeeRolesAdapter } from "./employeeRolesSlice";
import type { StateType } from "../../core/redux/store";

const employeeRolesSelector = employeeRolesAdapter.getSelectors((state: StateType) => state.employeeRoles);

export const employeeRolesSelectorEntities = employeeRolesSelector.selectAll;
