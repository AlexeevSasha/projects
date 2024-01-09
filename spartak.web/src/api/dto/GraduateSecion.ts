import { LocaleType } from "./LocaleType";

export interface GraduateSectionEntity {
  Id: string;
  Status: string;
  DeletedUtc: string;
  CreatedUtc: string;
  FullName: LocaleType;
  SortOrder: number;
  ImageSectionUrl: string;
  ImageTeamUrl: string;
}
