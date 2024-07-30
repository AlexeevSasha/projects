export interface IAddEmployee {
    name: string;
    roleId: string;
    email: string;
}

export interface IEmployee extends IAddEmployee{
    activationDate: string;
    createdUtc: string;
    id: string;
    role: string;
}

export interface IEmployeeData {
    employeeData: IAddEmployee | IEmployee;
    access: boolean;
    token: string;
}

export interface IEmployeeFilters {
    name: string;
    sorting: string;
    pagination: number;
    roleId: string | undefined;
}
