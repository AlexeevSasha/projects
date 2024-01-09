import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

export const quizSelector = createSelector(
  ({ quiz }: StateType) => quiz,
  (state) => state
);
