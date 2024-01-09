import { IMetaTags } from "./IMetaTags";
import { LocaleType } from "./common";
import { IMainInfo } from "./IMainInfo";

export interface ITimeline {
  eventDate?: LocaleType;
  eventDescription?: LocaleType;
  eventPhoto?: LocaleType;
}
export interface ISeasonsResults {
  seasonStart?: number;
  seasonEnd?: number;
  achievements?: LocaleType[];
}

export interface IHistoryResults {
  seasonsResults: ISeasonsResults[];
  timeline: ITimeline[];
}

export interface ICLubResults {
  metaTags?: IMetaTags;
  historyResults: IHistoryResults;
  mainInfo?: IMainInfo;
}
