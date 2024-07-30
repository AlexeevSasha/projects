import { Locale } from "antd/es/locale-provider";
import ru_RU from "antd/lib/locale/ru_RU";
import en_US from "antd/lib/locale/en_US";

export const languages = [
  { lang: "ru", title: "Русский", antd: ru_RU },
  { lang: "en", title: "English", antd: en_US }
];

export const localeAntd = (lang?: string): Locale => {
  const locale = { lang: ru_RU };

  languages.forEach((el) => {
    if (el.lang === lang) {
      locale.lang = el.antd;
    }
  });

  return locale.lang;
};
