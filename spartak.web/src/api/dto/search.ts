import { ICoach } from "./ICoach";
import { IMatchDto } from "./IMatchDto";
import { IMediaShort } from "./IMedia";
import { IPlayer } from "./IPlayer";
import { IProduct } from "./IProduct";
import { IStaff } from "./IStaff";
import { LocaleType } from "./LocaleType";

export interface SearchResult {
  Matches?: IMatchDto[];
  Teams?: Team[];
  Players?: IPlayer[];
  Staff?: IStaff[];
  Coaches?: ICoach[];
  Bosses?: IStaff[];
  Tickets?: IMatchDto[];
  Info?: ISearchInfo[];
  Media?: IMediaShort[];
  Products?: IProduct[];
  Count: number;
}

export interface ISearchInfo {
  Id: string;
  PaginationKey: string[];
  Type: string;
  ImageUrl: string;
}
interface Team {
  Id: string;
  PaginationKey: string[];
  ImageUrl: string;
  FullName: LocaleType;
  Section: string;
}
