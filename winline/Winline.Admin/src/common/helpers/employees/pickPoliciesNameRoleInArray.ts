import type {IAddEmployeeRole, IEmployeeRole} from "../../../api/dto/employees/IEmployeeRole";

export const pickPoliciesNameRoleInArray = (dataRole: IEmployeeRole | IAddEmployeeRole) => {
    const {name, ...data} = dataRole;
    const policies = Object.values(data).filter((value) => /^\w+[.]\w+$/.test(value as string));
    if ('id' in dataRole) {
        return {id: dataRole.id, name, policies};
    }

    return {name, policies};
};
