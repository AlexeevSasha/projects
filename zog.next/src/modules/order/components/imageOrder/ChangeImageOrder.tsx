import { useState } from "react";
import { Modal } from "../../../../common/components/modal/modal";
import { createPortal } from "react-dom";
import { FileOrderForm } from "./FileOrderForm";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  name: string;
  photoId: string;
  changeFile: (file: File, photoId: string, name: string) => void;
}

export const ChangeImageOrder = ({ changeFile, photoId, name }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [show, setShow] = useState(false);

  const onSubmit = async (files: File[]) => {
    await changeFile(files[0] as File, photoId, name);
    setShow(false);
  };

  return (
    <div>
      <div
        onClick={() => setShow(true)}
        className={"mb-2 flex cursor-pointer justify-center font-bold hover:bg-orange-200 "}
      >
        {lang.common.change.toLowerCase()}
      </div>
      {show &&
        createPortal(
          <Modal
            title={lang.modal.application.add_new_photo}
            content={<FileOrderForm onSubmit={onSubmit} onClose={() => setShow(false)} />}
            outsideClick={() => setShow(false)}
          />,
          document.getElementById("portal") as HTMLElement
        )}
    </div>
  );
};
