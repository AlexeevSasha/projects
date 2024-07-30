import {createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
import i18next from "i18next";
import {
    getEmployees,
    addNewEmployee,
    updateEmployee,
    removeEmployee,
    updateEmployeeInvitation
} from "../../api/requests/employees";
import type {IAddEmployee, IEmployee, IEmployeeFilters}
    from "../../api/dto/employees/IEmployee";

export const getAllEmployees = createAsyncThunk(
    "employees/getAllEmployees",
    async (filters: IEmployeeFilters | undefined) => await getEmployees(filters));

export const addEmployee = createAsyncThunk(
    "employees/addEmployee",
    async (employeeData: IAddEmployee) => {
        const newEmployee = await addNewEmployee(employeeData);
        message.success(i18next.t("success.create.employee"));

        return newEmployee;
    }
);

export const updateDataEmployee = createAsyncThunk(
    "employees/updateEmployee",
    async (employeeData: IEmployee) => {
        const employeeUpdated = await updateEmployee(employeeData);
        message.success(i18next.t("success.update.employee"));

        return employeeUpdated;
    }
);

export const updateInvitationEmployee = createAsyncThunk<boolean, string>(
    "employees/updateInvitationEmployee",
    async (id) => {
        const response = await updateEmployeeInvitation(id);
        message.success(i18next.t("success.update.invitation"));

        return response;
    }
);

export const deleteEmployee = createAsyncThunk(
    "employees/deleteEmployee",
    async (id: string) => {
        await removeEmployee(id);
        message.success(i18next.t("success.delete.employee"));
    }
);
