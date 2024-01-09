import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const partnersState = ({ partners }: StateType) => partners;

export const partnersLoadingSelector = createSelector(partnersState, ({ isLoading }) => isLoading);
export const partnersCountSelector = createSelector(partnersState, ({ count }) => count);
export const partnersSelector = createSelector(partnersState, ({ partners }) => partners);
export const partnerSelector = createSelector(partnersState, ({ partner }) => partner);
