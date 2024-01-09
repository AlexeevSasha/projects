import { LocaleType } from "./LocaleType";

export interface IAbomenent {
  Id: string;
  ShortName: LocaleType;
  FullName: LocaleType;
  EventId: number;
  ImageUrl: string | null;
  PreviousImageUrl: string;
  GroupLimits?: number[];
}
