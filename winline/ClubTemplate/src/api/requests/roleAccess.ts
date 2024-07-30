import { get } from "../baseRequest";
import { IAccess } from "../dto/employees/IAccess";
import { accessNames } from "../../common/accessControles/accessNames";

export const getAllRoleAccess = async (): Promise<IAccess[]> =>
    get(`${process.env.REACT_APP_ADMIN}/Role/GetPolicies`).then((result) => result.filter((role: IAccess) => role.category in accessNames));
