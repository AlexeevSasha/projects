import { ICoverageList } from "./ICoverageList";
import { IMedRequestList } from "./IMedRequestList";
import { IMeddispList } from "./IMeddispList";

export interface IRecipesAndCoverageResponse {
  coverageList: ICoverageList[];
  medRequestList: IMedRequestList[];
  meddispList: IMeddispList[];
}
