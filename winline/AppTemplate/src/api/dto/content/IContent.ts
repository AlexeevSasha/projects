import { Moment } from "moment";

export interface IContent {
  id: string;
  createdUtc: string;
  updatedUtc: string;
  deletedUtc: string;
  contentType: string;
  contentStatus: string;
  name: string;
  tag?: string | null;
  publishBefore?: string;
  municipalities?: any;
  sortOrder?: number;
}

export interface IFilterContent {
  pagination: number;
  sorting: string;
  contentType: string;
  name: string;
  date: null | [Moment, Moment];
  contentStatus?: string;
}
