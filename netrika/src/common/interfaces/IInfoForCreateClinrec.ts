import { ICustomBaseSelect } from "./ISelect";

export interface IInfoForCreateClinrec {
  ageCategory: ICustomBaseSelect[];
  clinrecStatus: ICustomBaseSelect[];
  clinrecUsageStatus: ICustomBaseSelect[];
  clinrecList?: ICustomBaseSelect[];
}
