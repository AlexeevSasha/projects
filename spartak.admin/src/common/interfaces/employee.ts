import { BaseFilters } from "./common";

export type EmployeeViewFilters = BaseFilters & {
  Position?: string;
  ActivationDate?: string;
};

export type EmployeeRoleFiltersType = BaseFilters & {
  Name?: string;
};

export type Employee = {
  Id: string;
  Name: string;
  Email: string;
  Role: string;
  RoleId: string;
  Status: boolean;
  CreatedUtc: string;
  ActivationDate: string;
};

export type EmployeeRoleType = {
  Id: string;
  Name: string;
  Policies: string[];
  CreatedUtc: string;
  DeletedUtc: string;
};

export type PoliciesItem = {
  category: string;
  info: {
    key: string;
    value: string[];
  };
  policies: {
    value: string;
  }[];
};

export type EmployeeResponce = {
  employee: Employee[];
  count: number;
};

export type EmployeeRoleResponce = {
  roleList: EmployeeRoleType[];
  count: number;
};
