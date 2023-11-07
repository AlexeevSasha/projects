import { generateId } from "../../../common/constants/generateId";

export const getCustomNamePhoto = (name: string) => {
  const index = name.lastIndexOf(".");
  return name.slice(0, index) + `_drive${generateId()}` + name.slice(index);
};
