import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { getStorageLanguage } from "./common/helpers/storageLanguage";
import { changeLang } from "./common/helpers/changeLang";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ru", "en"],
    lng: getStorageLanguage(),
    fallbackLng: "ru",
    detection: {
      order: ["localStorage", "cookie"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }
  });

const lang = getStorageLanguage();
changeLang(lang);

export default i18n;
