import { IMetaTags } from "../../components/baseMeta/baseMeta";
import { LocaleType } from "./LocaleType";
import { IMainInfo } from "./IMainInfo";

export interface ITimeline {
  eventDate?: LocaleType;
  eventDescription?: LocaleType;
  eventPhoto?: LocaleType;
}

export interface ISeasonsResults {
  seasonStart?: LocaleType;
  seasonEnd?: LocaleType;
  achievements?: LocaleType[];
}

export interface IHistoryResults {
  seasonsResults?: ISeasonsResults[];
  timeline?: ITimeline[];
}

export interface ICLubResults {
  metaTags?: IMetaTags;
  historyResults?: IHistoryResults;
  mainInfo?: IMainInfo;
}
