import { GlobeAltIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";

export const Language = () => {
  const { push, pathname, query, locale } = useRouter();
  const lang = getLanguage(locale);

  const changeLocale = () => {
    const locale = lang.common.langSymbol === "en" ? "ru" : "en";
    push({ pathname, query }, undefined, { locale: locale });
    window.localStorage.setItem("locale", locale);
  };

  return (
    <div
      className={`mx-5 flex cursor-pointer items-center rounded py-3 pl-6 text-center text-gray-400 
                                transition-colors hover:bg-orange-100 hover:text-orange-500`}
      onClick={changeLocale}
    >
      <div className={"flex w-full items-center"}>
        <div className="mr-2">
          <GlobeAltIcon className={"h-5 w-5"} />
        </div>
        <div className={"flex w-full justify-between"}>
          <p className={"text-left"}>{lang.common.language}</p>
          <span className={"mr-4"}> {lang.common.langSymbol.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
