import { Modal } from "../../../common/components/modal/modal";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";

interface IProps {
  user: InvoiceInfoT["user"];
  onDelete: () => void;
}

export const DeletePartnerInvoice = ({ onDelete, user }: IProps) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
        onClick={() => setShow(true)}
      >
        <TrashIcon />
      </button>

      {show && (
        <Modal
          title={"Вы точно хотите удалить счёт партнёра?"}
          description={`${user.name ? user.name + " - " : ""}${user.email}`}
          content={
            <div className="mb-2 flex items-center justify-center rounded-b border-t border-solid border-slate-200 pt-6 pl-6 pr-6">
              <button
                className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShow(false)}
              >
                Отмена
              </button>
              <button
                className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                type="submit"
                onClick={onDelete}
              >
                Удалить счёт партнёра
              </button>
            </div>
          }
          outsideClick={() => setShow(false)}
          classNames={"max-w-md"}
        />
      )}
    </div>
  );
};
