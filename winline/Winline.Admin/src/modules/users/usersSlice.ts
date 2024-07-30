import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit";
import type { IUser } from "../../api/dto/users/IUser";
import type {IAlert} from "../../common/interfaces/IAlert";
import {deleteOfConsentWinLine, getAllUsers} from "./usersActionAsync";

export const usersAdapter = createEntityAdapter<IUser>();

export const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState<{isLoading: boolean; alerts: IAlert[]; count: number}>({
        isLoading: false,
        alerts: [],
        count: 0,
    }),
    reducers: {},
    extraReducers: {
        [getAllUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllUsers.fulfilled.type]: (state, {payload}: PayloadAction<{allUsers: IUser[]; count: number}>) => {
            state.count = payload.count;
            usersAdapter.setAll(state, payload.allUsers);
            state.isLoading = false;
        },
        [getAllUsers.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [deleteOfConsentWinLine.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteOfConsentWinLine.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.count -= 1;
        },
        [deleteOfConsentWinLine.rejected.type]: (state) => {
            state.isLoading = false;
        },
    }
});
