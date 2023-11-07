import { NextRouter } from "next/router";

export const setLanguage = (route: NextRouter) => {
  const storage = window.localStorage.getItem("locale");
  if (!storage || route.locale === storage) return;
  route.push({ pathname: route.pathname, query: route.query }, undefined, { locale: storage });
};
