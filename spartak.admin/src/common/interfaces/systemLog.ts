import { BaseFilters, LocaleType } from "./common";

export type LogFilters = BaseFilters & {
  StartDate?: string;
  EndDate?: string;
  Employee?: string;
  LogId?: number;
};

export interface ILogUpdateChanges {
  ColumnName: string;
  OriginalValue: LocaleType | string;
  NewValue: LocaleType | string;
}

export type LogType = {
  ActionName: string;
  CreatedUtc: string;
  DataChanges: string;
  EntityName: string;
  EntityId: string;
  Id: string;
  UserName: string;
  UserId: string;
  TableName: string;
};

export type LogResponce = {
  items: LogType[];
  count: number;
};
