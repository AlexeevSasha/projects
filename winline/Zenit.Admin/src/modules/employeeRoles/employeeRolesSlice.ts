import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit";
import type {IEmployeeRole} from "../../api/dto/employees/IEmployeeRole";
import {
    addEmployeeRole,
    deleteEmployeeRole,
    getAllEmployeeRoles,
    updateEmployeeRole
} from "./employeeRolesActionAsync";

export interface IEmployeeRolesInitialState {
    isLoading: boolean;
    count: number;
}

export const employeeRolesAdapter = createEntityAdapter<IEmployeeRole>();

export const employeeRolesSlice = createSlice({
    name: 'employeeRoles',
    initialState: employeeRolesAdapter.getInitialState<IEmployeeRolesInitialState>({
        isLoading: false,
        count: 0,
    }),
    reducers: {},
    extraReducers: {
        [getAllEmployeeRoles.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllEmployeeRoles.fulfilled.type]: (state, {payload}: PayloadAction<{roles: IEmployeeRole[]; count: number}>) => {
            state.count = payload.count;
            employeeRolesAdapter.setAll(state, payload.roles);
            state.isLoading = false;
        },
        [getAllEmployeeRoles.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [addEmployeeRole.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addEmployeeRole.fulfilled.type]: (state, {payload}: PayloadAction<IEmployeeRole>) => {
            state.count += 1;
            state.ids.unshift(payload.id);
            state.entities[payload.id] = payload;
            state.isLoading = false;
        },
        [addEmployeeRole.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [updateEmployeeRole.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateEmployeeRole.fulfilled.type]: (state, {payload}: PayloadAction<IEmployeeRole>) => {
            employeeRolesAdapter.updateOne(state, {id: payload.id, changes: payload});
            state.isLoading = false;
        },
        [updateEmployeeRole.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [deleteEmployeeRole.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteEmployeeRole.fulfilled.type]: (state, {payload}: PayloadAction<number>) => {
            state.count -= 1;
            employeeRolesAdapter.removeOne(state, payload);
            state.isLoading = false;
        },
        [deleteEmployeeRole.rejected.type]: (state) => {
            state.isLoading = false;
        },
    }
});

