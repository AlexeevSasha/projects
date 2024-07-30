interface IPolice {
    value: string;
}

export interface IAccess {
    category: string;
    policies: IPolice[];
}

export interface IPoliceFormatted {
    value: string;
    label: string;
}

export interface IAccessFormatted {
    category: string;
    policies: IPoliceFormatted[];
}
