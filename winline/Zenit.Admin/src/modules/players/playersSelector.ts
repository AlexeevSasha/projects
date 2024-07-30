import { StateType } from "../../core/redux/store";
import { playersAdapter } from "./playersSlice";

export const playersSelector = playersAdapter.getSelectors((state: StateType) => state.players);

export const playersSelectorEntities = playersSelector.selectAll;
