import { BaseFilters, LocaleType } from "./common";

export type CalendarFiltersType = BaseFilters & {};

export type CalendarEntity = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  EventDate: string;
  EventUrl: string;
  ImageUrl: string;
};

export type CalendarResponce = {
  items: CalendarEntity[];
  count: number;
};
