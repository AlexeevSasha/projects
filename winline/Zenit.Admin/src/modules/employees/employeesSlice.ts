import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {IEmployee} from "../../api/dto/employees/IEmployee";
import {
    addEmployee,
    deleteEmployee,
    getAllEmployees,
    updateDataEmployee,
    updateInvitationEmployee
} from "./employeesActionAsync";

export interface IEmployeeState {
    isLoading: boolean;
    count: number;
}

export const employeesAdapter = createEntityAdapter<IEmployee>();

export const employeesSlice = createSlice({
    name: 'employees',
    initialState: employeesAdapter.getInitialState<IEmployeeState>({
        isLoading: false,
        count: 0,
    }),
    reducers: {
    },
    extraReducers: {
        [getAllEmployees.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllEmployees.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.count = action.payload.count;
            employeesAdapter.setAll(state, action.payload.employees);
        },
        [getAllEmployees.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [addEmployee.pending.type]: (state) => {
            state.isLoading = true;
        },
        [addEmployee.fulfilled.type]: (state, {payload}: PayloadAction<IEmployee>) => {
            state.isLoading = false;
            state.count += 1;
            state.ids.unshift(payload.id);
            state.entities[payload.id] = payload;
        },
        [addEmployee.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [updateDataEmployee.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateDataEmployee.fulfilled.type]: (state, {payload}: PayloadAction<IEmployee>) => {
            employeesAdapter.updateOne(state, {id: payload.id, changes: payload});
            state.isLoading = false;
        },
        [updateDataEmployee.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [deleteEmployee.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteEmployee.fulfilled.type]: (state, {payload}: PayloadAction<number>) => {
            employeesAdapter.removeOne(state, payload);
            state.isLoading = false;
            state.count -= 1;
        },
        [deleteEmployee.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [updateInvitationEmployee.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateInvitationEmployee.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [updateInvitationEmployee.rejected.type]: (state) => {
            state.isLoading = false;
        },

    }
});

