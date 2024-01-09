import { createSelector } from "@reduxjs/toolkit";
import { StateType } from "store";

const usersViewState = ({ usersView }: StateType) => usersView;

export const usersSelector = createSelector(usersViewState, ({ users }) => users);
