import type { Moment } from "moment";
import type { ISelect } from "./ISelect";

type IStatuses = "New" | "Approved" | "Issued" | "Rejected" | "Opened" | "Created" | "Closed" | "Finished";

export interface ILoyaltyProgram {
  id: string;
  type: string;
  participantsNumber?: number;
  startDate: string;
  endDate: string;
  status: string;
  points: number;
}

export interface IProduct {
  id: string;
  name: string;
  total: number;
  inStock: number;
  issued: number;
  priceInPoints: number;
  image: string;
  visible?: boolean;
}

export interface IOrder {
  id: string;
  orderCode: string;
  user: IUser;
  product: IProduct;
  date: string;
  status: "New" | "Approved" | "Issued" | "Rejected";
}

interface IUser {
  name: string;
  phone: string;
  city: string;
}

export interface ILoyaltyProgramFilters {
  id?: string;
  pagination: number;
}

export interface IFilters {
  name: string;
  sorting: string;
  pagination: number;
}

export interface IBaseFilters<T> extends IFilters {
  date: null | [Moment, Moment];
  status?: Extract<IStatuses, T>;
}

export interface IFiveEvents {
  id?: string;
  question?: string;
  answer?: boolean;
}

export interface IPlayer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IPoll<T = IPlayer, K = IFiveEvents, S = ISelect> {
  id: string;
  type: "FiveEvents" | "MatchWinner" | "StartingFive";
  points: string;
  description: string;
  image: string;
  participantsNumber?: number;
  match: ISelect;
  startDate: string;
  endPollDate: string;
  endDate: string;
  status: "Opened" | "Created" | "Closed" | "Finished";
  fiveEvents: K[];
  matchWinner: S;
  startingFive: T[];
  hasResult: boolean;
}
