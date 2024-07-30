export interface IEmployeeRole extends IAddEmployeeRole{
    id: string;
    createdUtc: string;
}

export interface IAddEmployeeRole {
    name: string;
    policies: string[];
}

export interface IFiltersRole {
    name: string;
    sorting: string | undefined | null;
    pagination: number;
}

export interface IDeleteDataRole {
    id: string;
    access: boolean;
    token: string;
}
