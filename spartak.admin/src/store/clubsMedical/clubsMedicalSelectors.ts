import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const clubsMedicalState = ({ clubsMedical }: StateType) => clubsMedical;

export const clubsMedicalLoadingSelector = createSelector(clubsMedicalState, ({ isLoading }) => isLoading);
export const clubsMedicalCountSelector = createSelector(clubsMedicalState, ({ count }) => count);
export const clubsMedicalSelector = createSelector(clubsMedicalState, ({ medical }) => medical);
export const clubsMedicalPersonSelector = createSelector(clubsMedicalState, ({ medicalPerson }) => medicalPerson);
