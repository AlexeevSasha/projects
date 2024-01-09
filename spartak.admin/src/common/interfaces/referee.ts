import { LocaleType } from "./common";

export type Referee = {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  MatchId: string;
  Position: LocaleType;
};
