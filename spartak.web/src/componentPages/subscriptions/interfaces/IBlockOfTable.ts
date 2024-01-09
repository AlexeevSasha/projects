import { LocaleType } from "../../../api/dto/LocaleType";

export type IBlockOfTable = {
  title: LocaleType;
  sections: {
    headCol1: LocaleType;
    headCol2: LocaleType;
    headCol3: LocaleType;
    row: { col1: LocaleType; col2: LocaleType; col3: LocaleType }[];
  }[];
};
