import { LocaleType } from "../../../api/dto/LocaleType";

export type IHomeMatchList = {
  title?: LocaleType;
  buttonText?: LocaleType;
  buttonLink?: LocaleType;
  opponentsLogos?: string[];
};
