import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../../../../common/components/modal/modal";
import { deleteImage } from "../../../../api/order";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  photoId: string;
  photoName: string;
  id: string;
}

export const DeleteImageOrder = ({ photoId, photoName, id }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    await deleteImage(id, photoId, photoName);
    window.location.reload();
    setShow(false);
  };

  return (
    <div>
      <div
        onClick={() => setShow(true)}
        className={
          "mb-2 flex cursor-pointer justify-center font-bold text-red-600 hover:bg-red-500 hover:text-white"
        }
      >
        {lang.common.delete.toLowerCase()}
      </div>
      {show &&
        createPortal(
          <Modal
            loading={loading}
            title={lang.modal.application.you_sure_delete_photo}
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
                  onClick={onDelete}
                >
                  {lang.modal.application.delete_photo}
                </button>
              </div>
            }
            outsideClick={() => setShow(false)}
          />,
          document.getElementById("portal") as HTMLElement
        )}
    </div>
  );
};
