import { loyaltyEn } from "./loyaltyEn";
import { loyaltyRu } from "./loyaltyRu";

export const langLoyalty: { [key: string]: typeof loyaltyRu } = {
  ru: loyaltyRu,
  en: loyaltyEn,
};
