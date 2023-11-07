import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement, forwardRef } from "react";
import { layoutDashMenuLinks } from "../constants/menuLinks";
import { ShowFor } from "./showFor";
import { Logout } from "../../../common/components/logout/logout";
import { Language } from "../../../common/components/language";
import { getLanguage } from "../../../../public/locales/lang";

export const LayoutSideBar = forwardRef<HTMLDivElement, object>((_, ref) => {
  const { pathname, locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <div ref={ref} className="fixed z-10 flex h-full w-56 flex-col bg-white shadow-sm">
      <div className="z-10 mt-6 mb-6 flex justify-center">
        <picture>
          <img className="h-auto w-32" src="/logo.png" alt="Amrita" />
        </picture>
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        {layoutDashMenuLinks(lang).map((item) => {
          const icon = cloneElement(item.icon, { className: "h-5 w-5" });
          return (
            <ShowFor auth={item.roles ?? []} key={item.href}>
              <Link href={item.href}>
                <div
                  className={`mx-5 mb-3 flex cursor-pointer items-center rounded py-3 pl-6 text-center transition-colors 
                                ${
                                  pathname == item.href
                                    ? "bg-orange-100 text-orange-500"
                                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                                }`}
                >
                  <div className="mr-2">{icon}</div>
                  <div>
                    <p className={"text-left"}>{item.title}</p>
                  </div>
                </div>
              </Link>
            </ShowFor>
          );
        })}
      </div>

      <div>
        <hr className="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <Language />
        <Logout />
      </div>
    </div>
  );
});

LayoutSideBar.displayName = "LayoutSideBar";
