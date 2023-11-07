import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

export const Logout = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [show, setShow] = useState(false);

  const onLogout = () => {
    signOut({ redirect: false }).then(() => localStorage.clear());
  };

  return (
    <div>
      <div
        className={`mx-5 mb-3 flex cursor-pointer items-center rounded py-3 pl-6 text-center text-gray-400 
                                transition-colors hover:bg-orange-100 hover:text-orange-500`}
        onClick={() => setShow(true)}
      >
        <div className="mr-2">
          <ArrowLeftOnRectangleIcon className={"h-5 w-5"} />
        </div>
        <div>
          <p className={"text-left"}>{lang.common.menu.exit}</p>
        </div>
      </div>

      {show &&
        createPortal(
          <Modal
            title={lang.modal.exit.title}
            outsideClick={() => setShow(false)}
            content={
              <div className="mb-2 flex items-center justify-center rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
                <button
                  className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                  type="button"
                  onClick={() => setShow(false)}
                >
                  {lang.common.cancel}
                </button>
                <button
                  className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                  type="submit"
                  onClick={onLogout}
                >
                  {lang.common.comeOut}
                </button>
              </div>
            }
            classNames={"max-w-md"}
          />,
          document.getElementById("portal") as HTMLDivElement
        )}
    </div>
  );
};
