import {ISelect} from "../ISelect";

export interface IPlace extends ISelect {
  name: string;
  width: number;
  height: number;
  currentCountImage: number;
  maxCountImage: number;
}
