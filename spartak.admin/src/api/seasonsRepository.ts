import { SeasonsResponse } from "common/interfaces/dictionary";
import { BaseApiService } from "./BaseApiService";

class SeasonsRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchAllSeasons = async () => {
    const res = await this.get<SeasonsResponse["seasons"]>(`MatchClient/GetAllSeasons`);

    return { seasons: res, count: res.length };
  };
}

export const seasonsRepository = new SeasonsRepository();
