import { LocaleType } from "./LocaleType";

export interface GraduateEntity {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  GraduateSectionId: string;
  Birthday: string;
  GraduateUrl: string;
  Team: LocaleType;
  GraduateSectionName: LocaleType;
}
