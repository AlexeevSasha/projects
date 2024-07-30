import { Moment } from "moment";

export interface IContent {
  id: string;
  createdUtc: string;
  deletedUtc: string;
  contentType: string;
  contentStatus: string;
  name: string;
  tag?: string;
  beginningPublication?: string;
  endPublication?: string;
  sortOrder?: number;
}

export interface IFilterContent {
  name: string;
  date: null | [Moment, Moment];
  contentStatus?: string;
  contentType: string;
  pagination: number;
  sorting: string;
}
