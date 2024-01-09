import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const clubsStaffState = ({ clubsStaffs }: StateType) => clubsStaffs;

export const clubsStaffLoadingSelector = createSelector(clubsStaffState, ({ isLoading }) => isLoading);
export const clubsStaffCountSelector = createSelector(clubsStaffState, ({ count }) => count);
export const clubsStaffsSelector = createSelector(clubsStaffState, ({ staff }) => staff);
export const clubsStaffSelector = createSelector(clubsStaffState, ({ stuff }) => stuff);
