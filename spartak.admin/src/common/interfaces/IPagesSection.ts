import { IServicesAdjacentTerritory } from "./IServicesAdjacentTerritory";
import { IAboutStadium } from "./IStadiumAbout";
import { IServicesVip } from "./IServicesVip";
import { IClubContacts } from "./IClubContacts";
import { ICLubResults } from "./ICLubResults";
import { IClubHistory } from "./IClubHistory";
import { IStadiumHowToGet } from "./IStadiumHowToGet";
import { IStadiumContacts } from "./IStadiumContacts";
import { IStadiumStaff } from "./IStadiumStaff";
import { BaseFilters } from "./common";
import { IStadiumUsefulInfo } from "./IStadiumUsefulInfo";

export interface IPagesSectionsFilters extends BaseFilters {
  pagination: number;
}

export type PagesSectionInfoT =
  | {
      schema: "stadiumAbout";
      info: IAboutStadium;
    }
  | {
      schema: "clubContacts";
      info: IClubContacts;
    }
  | {
      schema: "clubHistory";
      info: IClubHistory;
    }
  | {
      schema: "stadiumHowToGet";
      info: IStadiumHowToGet;
    }
  | {
      schema: "stadiumContacts";
      info: IStadiumContacts;
    }
  | {
      schema: "stadiumUsefulInfo";
      info: IStadiumUsefulInfo;
    }
  | {
      schema: "clubResults";
      info: ICLubResults;
    }
  | {
      schema: "stadiumStaff";
      info: IStadiumStaff;
    }
  | {
      schema: "servicesAdjacentTerritory";
      info: IServicesAdjacentTerritory;
    }
  | {
      schema: "servicesVip";
      info: IServicesVip;
    };
