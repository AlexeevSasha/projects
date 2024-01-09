import { LogFilters, LogType } from "common/interfaces/systemLog";
import { BaseApiService } from "./BaseApiService";

class SystemLogRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  fetchByFilter = async (filter: LogFilters) => {
    const res = await this.get(`odata/Audit?${this.getODataQuery({ ...filter, withOutDeletedUtc: true })}`);

    return { items: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: LogType["Id"]) => {
    const res = await this.get(`odata/Audit?$filter=Id eq ${id}`);

    return res.value[0];
  };
}

export const systemLogRepository = new SystemLogRepository();
