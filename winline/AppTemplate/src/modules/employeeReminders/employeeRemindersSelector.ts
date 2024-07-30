import { employeeRemindersAdapter } from "./employeeRemindersSlice";
import type { StateType } from "../../core/redux/store";

const employeeRemindersSelector = employeeRemindersAdapter.getSelectors((state: StateType) => state.employeeReminders);

export const employeeRemindersSelectorEntities = employeeRemindersSelector.selectAll;
