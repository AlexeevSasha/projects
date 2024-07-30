import { matchesAdapter } from "./matchesSlice";
import type { StateType } from "../../core/redux/store";

const matchesSelector = matchesAdapter.getSelectors((state: StateType) => state.matches);

export const matchesSelectorEntities = matchesSelector.selectAll;
