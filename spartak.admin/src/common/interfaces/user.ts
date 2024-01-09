import { BaseFilters } from "./common";

export type User = {
  allowPushReceiving: boolean;
  avatarUri: string;
  birthDay: string;
  createdUtc: string;
  deletedUtc: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  phone: string;
  updatedUtc: string;
};

export type UserFilters = BaseFilters & {
  date: string;
};

export type UsersResponce = {
  count: number;
  users: User[];
};
