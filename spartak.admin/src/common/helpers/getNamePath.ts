import { NamePath } from "antd/lib/form/interface";

export const getNamePath = (name: NamePath, additional: NamePath) =>
  [name, additional].flat().filter((value) => value !== "");
