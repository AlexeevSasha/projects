import {createSlice, createEntityAdapter, PayloadAction} from "@reduxjs/toolkit";
import {getAccessNameInObject} from "../../common/helpers/employees/getAccessName";
import type {IAccessFormatted} from "../../api/dto/employees/IAccess";
import {getRoleAccess} from "./roleAccessActionAsync";

export const roleAccessAdapter = createEntityAdapter<IAccessFormatted>({
    selectId: (role: IAccessFormatted) => getAccessNameInObject(role.policies[0]),
});

export const roleAccessSlice = createSlice({
    name: 'roleAccess',
    initialState: roleAccessAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [getRoleAccess.fulfilled.type]: (state, {payload}: PayloadAction<IAccessFormatted[]>) => {
            roleAccessAdapter.setAll(state, payload);
        }
    },
});
