import { get } from "../baseRequest";
import { generateODataQuerySystemLog } from "../../core/oDataQueryBuilders/systemLog/generateODataQuerySystemLog";
import { deSerializerJSON } from "../../common/helpers/deSerializerJSON";
import type { ISystemLogFilters, ISystemLogItem } from "../dto/systemLog/ISystemLog";
import camelcaseKeys from "camelcase-keys";

export const getSystemLog = async (body: ISystemLogFilters) => {
  const response = await get(`${process.env.REACT_APP_ADMIN}/odata/Audit?${generateODataQuerySystemLog(body)}&includeDeleted=false`);
  const formattedSystemLogs = camelcaseKeys(response.value);
  const data = deSerializerJSON("dataChanges", formattedSystemLogs);

  return { data, count: response["@odata.count"] };
};
