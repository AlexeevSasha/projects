import type { ISystemLogItem } from "../../api/dto/systemLog/ISystemLog";

type TKeys = "dataChanges";

export const deSerializerJSON = (key: TKeys, collection: ISystemLogItem[]) => {
  return collection.map((item) => {
    if (item[key]) {
      try {
        item[key] = JSON.parse(`${item[key]}`);

        return item as unknown as ISystemLogItem;
      } catch {
        return item as unknown as ISystemLogItem;
      }
    } else {
      return item as ISystemLogItem;
    }
  });
};
