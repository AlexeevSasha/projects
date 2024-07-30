import type { Moment } from "moment";

export interface ILogUpdateChanges {
  ColumnName: string;
  OriginalValue: string;
  NewValue: string;
}

export interface ISystemLogItem {
  id: string;
  userId: string;
  userName: string;
  tableName: string;
  actionName: string;
  entityId: string;
  entityName: string;
  dataChanges: ILogUpdateChanges[] | Record<string, string> | string | null;
  createdUtc: string;
}

export interface ISystemLogFilters {
  name: string;
  date: null | [Moment, Moment];
  pagination: number;
  employee: string | undefined;
  sorting: string;
}
