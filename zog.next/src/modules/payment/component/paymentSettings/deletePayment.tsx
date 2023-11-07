import { useState } from "react";

import { useRouter } from "next/router";

import { createPortal } from "react-dom";
import { getLanguage } from "../../../../../public/locales/lang";
import { Modal } from "../../../../common/components/modal/modal";
import { deletePaymentBanner } from "../../../../api/payment";

interface IProps {
  deleteBanner: (id: string) => void;
  id: string;
}

export const DeletePayment = ({ deleteBanner, id }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onClick = async () => {
    setLoading(true);
    await deletePaymentBanner(id, deleteBanner);
    setShow(false);
  };

  return (
    <div className={" w-full "}>
      <div>
        <button
          type={"button"}
          onClick={() => setShow(true)}
          className={
            "mt-2 w-full bg-red-400 p-2 font-bold text-white transition-colors hover:bg-red-700"
          }
        >
          {lang.setting.banners.delete_banner}
        </button>
        {show &&
          createPortal(
            <Modal
              loading={loading}
              title={lang.setting.banners.you_sure_delete_banner}
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
                    onClick={onClick}
                  >
                    {lang.setting.banners.delete_banner}
                  </button>
                </div>
              }
              outsideClick={() => setShow(false)}
            />,
            document.getElementById("portal") as HTMLDivElement
          )}
      </div>
    </div>
  );
};
