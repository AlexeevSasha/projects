import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const i18next = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: document.querySelector("html")?.lang,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

fetch(`${process.env.REACT_APP_API}${process.env.REACT_APP_API_LOCALES}`)
  .then(async (response) => response.json())
  .then((data) => {
    i18n.addResourceBundle("ru", "back", data);
  });

export default i18n;
