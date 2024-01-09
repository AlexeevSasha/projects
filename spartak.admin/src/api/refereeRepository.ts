import { BaseResponce } from "common/interfaces/common";
import { Referee } from "common/interfaces/referee";
import { BaseApiService } from "./BaseApiService";

class RefereeRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchAll = async () => (await this.get<BaseResponce<Referee[]>>("odata/Referee")).value;
}

export const refereeRepository = new RefereeRepository();
