import { LocaleType } from "../../../api/dto/LocaleType";

export type ISpecialOffers = {
  title: LocaleType;
  list: { whiteImage: string; darkImage: string; description: LocaleType }[];
  warningText: LocaleType;
};
