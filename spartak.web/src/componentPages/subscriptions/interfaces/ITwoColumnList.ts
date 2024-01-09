import { LocaleType } from "../../../api/dto/LocaleType";

export type ITwoColumnList = {
  title: LocaleType;
  list: { text: LocaleType }[];
};
