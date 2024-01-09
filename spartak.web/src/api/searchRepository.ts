import { BaseApiService } from "./BaseApiService";
import { SearchResult } from "./dto/search";

export type SearchFilter = {
  SearchPhrase?: string;
  CategoryTypes?: string;
  Page: number;
  Size: number;
};

class SearchRepository extends BaseApiService {
  constructor(url: string) {
    super(url);
    this.url = url;
  }

  fetchSearch = (filter: SearchFilter) => this.get<SearchResult>(`Search/Query?${this.queryParams(filter)}`, {});
}

export const searchRepository = new SearchRepository(`${process.env.NEXT_PUBLIC_BACK_URL}/search/`);
