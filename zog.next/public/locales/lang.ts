import { en } from "./en/en";
import { ru } from "./ru/ru";

const defaultLocale = "ru";

type LangT = { [key in "ru" | "en"]: typeof ru };
export const lang: LangT = {
  ru: ru,
  en: en,
};

export const getLanguage = (locale: string | undefined): typeof ru => {
  if (!locale) return lang[defaultLocale];
  if (locale in lang) return lang[locale as keyof LangT];
  return lang[defaultLocale];
};
