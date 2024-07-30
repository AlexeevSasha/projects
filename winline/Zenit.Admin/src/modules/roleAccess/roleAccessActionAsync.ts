import {createAsyncThunk} from "@reduxjs/toolkit";
import { getAllRoleAccess } from "../../api/requests/roleAccess";
import { formattingAccess } from "../../common/helpers/employees/formattingAccess";
import {TFunction} from "react-i18next";

export const getRoleAccess = createAsyncThunk(
    'roleAccess/getRoleAccess',
    async (transition: TFunction<"translation">) => {
            const allAccess = await getAllRoleAccess();

            return formattingAccess(allAccess, transition);
    },
);
