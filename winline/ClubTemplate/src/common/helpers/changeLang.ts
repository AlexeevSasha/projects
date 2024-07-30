import i18n from "i18next";

export const changeLang = async (lang: string) =>
  await fetch(`${process.env.REACT_APP_API}${process.env.REACT_APP_STATIC}/locales/${lang}/${process.env.REACT_APP_API_LOCALE}`)
    .then(async (response) => {
      return response.json();
    })
    .then((data) => {
      i18n.addResourceBundle(`${lang}`, process.env.REACT_APP_API_LOCALE_NS as string, data);
    });
