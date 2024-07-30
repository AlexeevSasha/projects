import { employeesAdapter } from "./employeesSlice";
import type { StateType } from "../../core/redux/store";

const employeesSelector = employeesAdapter.getSelectors((state: StateType) => state.employees);

export const employeeSelectorEntities = employeesSelector.selectAll;
