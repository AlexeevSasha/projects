import type { StateType } from "../../core/redux/store";
import { loyaltyAdapter } from "./loyaltySlice";

const selectors = loyaltyAdapter.getSelectors((state: StateType) => state.loyalty);

export const getLoyaltyEntities = selectors.selectAll;
