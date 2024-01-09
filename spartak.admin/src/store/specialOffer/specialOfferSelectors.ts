import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const offerSelector = ({ specialOffers }: StateType) => specialOffers;

export const specialOffersLoadingSelector = createSelector(offerSelector, ({ isLoading }) => isLoading);
export const specialOffersCountSelector = createSelector(offerSelector, ({ count }) => count);
export const specialOffersSelector = createSelector(offerSelector, ({ specialOffers }) => specialOffers);
export const specialOfferSelector = createSelector(offerSelector, ({ specialOffer }) => specialOffer);
