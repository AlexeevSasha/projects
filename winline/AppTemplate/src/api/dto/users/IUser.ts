import {Moment} from "moment";

export interface IUser {
  allowPushReceiving: boolean;
  avatarUri: string;
  birthDay: string;
  createdUtc: string;
  deletedUtc: string | null;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  phone: string;
  updatedUtc: string;
}

export interface IFiltersUser {
  pagination: number;
  name: string;
  date: null | [Moment, Moment];
  sorting: string | undefined | null;
}
