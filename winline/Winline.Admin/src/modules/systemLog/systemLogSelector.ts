import { systemLogAdapter } from "./systemLogSlice";
import type { StateType } from "../../core/redux/store";

const selectors = systemLogAdapter.getSelectors((state: StateType) => state.systemLog);

export const getSystemLogEntities = selectors.selectAll;
