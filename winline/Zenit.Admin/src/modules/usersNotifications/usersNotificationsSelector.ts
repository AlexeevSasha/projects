import { usersNotificationsAdapter } from "./usersNotificationsSlice";
import type { StateType } from "../../core/redux/store";

const selectors = usersNotificationsAdapter.getSelectors((state: StateType) => state.usersNotifications);

export const usersNotificationsSelectorEntities = selectors.selectAll;
