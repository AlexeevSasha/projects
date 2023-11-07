import { useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../../../../common/components/modal/modal";
import { FileOrderForm } from "./FileOrderForm";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  addFiles: (files: File[]) => void;
}

export const AddImageOrder = ({ addFiles }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [show, setShow] = useState(false);

  const onSubmit = async (files: File[]) => {
    await addFiles(files);
    setShow(false);
  };

  return (
    <div>
      <div
        onClick={() => setShow(true)}
        className={
          "m-2 flex cursor-pointer justify-center bg-blue-500 p-2 font-bold text-white hover:bg-blue-700 "
        }
      >
        {lang.common.add_photo}
      </div>
      {show &&
        createPortal(
          <Modal
            title={lang.modal.application.add_new_photo}
            content={
              <FileOrderForm onSubmit={onSubmit} multiInput onClose={() => setShow(false)} />
            }
            outsideClick={() => setShow(false)}
          />,
          document.getElementById("portal") as HTMLElement
        )}
    </div>
  );
};
