import { lang } from "../../../public/locales/lang";

export const goodsDeclination = (count: number, locale: string) => {
  if (locale === "en") return lang[locale].shop.goods;
  else {
    const goods = lang[locale].shop.goods;
    const lastDigit = count % 10;
    return goods + (lastDigit === 1 ? "" : lastDigit > 1 && lastDigit < 5 ? "а" : "ов");
  }
};
