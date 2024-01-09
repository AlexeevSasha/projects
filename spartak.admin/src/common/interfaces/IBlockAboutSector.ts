import { LocaleType } from "./common";

export interface IBlockAboutSector {
  title?: LocaleType;
  img?: LocaleType;
  description?: LocaleType;
  blockParams?: { label?: LocaleType; value?: LocaleType }[];
}
