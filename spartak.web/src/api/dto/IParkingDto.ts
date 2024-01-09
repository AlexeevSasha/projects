import { LocaleType } from "./LocaleType";

export interface IParkingDto {
  EventId: number;
  EventStart: string;
  FullName: LocaleType;
  GroupLimits: unknown;
  Id: string;
  ShortName: LocaleType;
  TotalTickets: number;
}
