import { LocaleType } from "./common";
import { IMainInfo } from "./IMainInfo";

export interface IStadiumUsefulInfo {
  entranceInfo?: {
    additionalInfo?: LocaleType;
    title?: LocaleType;
  };
  entranceNames?: LocaleType[];
  mainInfo?: IMainInfo;
  usefulInfoBlocks?: { title?: LocaleType; description?: LocaleType }[];
}
