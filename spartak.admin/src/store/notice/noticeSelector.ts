import { StateType } from "../index";
import { createSelector } from "@reduxjs/toolkit";

const noticeState = ({ notice }: StateType) => notice;

export const noticeSelector = createSelector(noticeState, (notice) => notice);
