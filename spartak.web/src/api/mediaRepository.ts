import { BaseFilters, ODateResponce } from "../common/interfaces/common";
import { BaseApiService } from "./BaseApiService";
import { ICategory } from "./dto/ICategory";
import { IMedia } from "./dto/IMedia";

export interface IMediaFilters extends BaseFilters {
  currentPage?: number;
  MediaType?: string;
  IsDraft?: "false" | "true";
  MediaStatus?: string;
  PublishDateTimeGt?: string;
  PublishDateTimeLt?: string;
  MediaCategoryId?: string;
  TeamsIds?: string;
  Id?: string;
  NotId?: string;
  PlayersIds?: string;
  MatchId?: string;
  PublishDateTime?: boolean;
  pageSize?: number;
  MediaHeader?: string;
  Section?: "None" | "Academy" | "Site";
}

class MediaRepository extends BaseApiService {
  constructor() {
    super("media/");
  }
  fetchMedia = (filter: IMediaFilters = {}, select?: string[]) =>
    this.get<ODateResponce<IMedia>>(
      `odata/ClientMedia${this.getODataQuery(filter)}${select ? "&$select=" + select.join(",") : ""}`,
      { value: [] }
    );
  // fetchMediaCategories = () => this.get<ODateResponce<ICategory>>("/MediaCategory?filter=DeletedUtc eq null");
  fetchMediaCategories = ({ section, mediaType }: { section: string; mediaType: string }) =>
    this.get<ICategory[]>(`ClientMedia/Categories?section=${section}&mediaType=${mediaType}&api-version=1.0`);

  fetchMvpMedia = (filter: IMediaFilters = {}, select?: string[]) =>
    this.get<ODateResponce<IMedia>>(
      `odata/ClientMvpMedia${this.getODataQuery(filter)}${select ? "&$select=" + select.join(",") : ""}`,
      []
    );
}

export const mediaRepository = new MediaRepository();
