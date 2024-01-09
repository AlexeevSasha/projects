import { createSelector } from "@reduxjs/toolkit";
import { getValuesFromDto } from "common/helpers/loyalty/getDtoFromValues";
import { StateType } from "store";

const loyaltyState = ({ loyalty }: StateType) => loyalty;

export const loyaltyLoadingSelector = createSelector(loyaltyState, ({ isLoading }) => isLoading);
export const loyaltyCountSelector = createSelector(loyaltyState, ({ count }) => count);
export const loyaltyListSelector = createSelector(loyaltyState, ({ items }) => items);
export const loyaltySelector = createSelector(loyaltyState, ({ entity }) => entity && getValuesFromDto(entity));
export const loyaltyEventsSelector = createSelector(loyaltyState, ({ events }) => events);
export const loyaltySectorsSelector = createSelector(loyaltyState, ({ sectors }) => sectors);
