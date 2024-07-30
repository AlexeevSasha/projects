import { usersAdapter } from "./usersSlice";
import type { StateType } from "../../core/redux/store";

const userAllSelect = usersAdapter.getSelectors((state: StateType) => state.users);

export const getUserEntities = userAllSelect.selectAll;
