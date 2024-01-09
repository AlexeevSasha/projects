import { LocaleType } from "./LocaleType";

export interface ICardServices {
  cardName: LocaleType;
  cardDescription: LocaleType;
  photo: string;
  path?: string;
}
