import { LocaleType } from "../../../api/dto/LocaleType";

export type ISubscriptionBanner = {
  backgroundImgL: string;
  backgroundImgM: string;
  backgroundImgS: string;
  title: LocaleType;
  description: LocaleType;
  buttonText: LocaleType;
  buttonLink: LocaleType;
  rightImg: string;
};
