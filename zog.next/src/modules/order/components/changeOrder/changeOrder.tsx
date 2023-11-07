import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../../../common/components/modal/modal";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { OrderT } from "../../interfaces/OrderT";
import { FormChangeOrder } from "./formChangeOrder";
import { updateOrder } from "../../../../api/order";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  order: OrderT;
  updateClientList: (order: OrderT) => void;
}

export const ChangeOrder = ({ order, updateClientList }: IProps) => {
  const { locale } = useRouter();
  const [data, setData] = useState({} as OrderT);
  const [showModal, setShowModal] = useState(false);
  const onClose = useCallback(() => setShowModal(false), []);

  useEffect(() => {
    setData(order);
  }, [order]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateOrder(order.id, data).then((res) => {
      if (res) {
        updateClientList(res);
        setShowModal(false);
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
      >
        <PencilSquareIcon />
      </button>
      {showModal && (
        <Modal
          title={getLanguage(locale).modal.application.change_application}
          description={order.name + " - " + order.email}
          content={
            <FormChangeOrder
              order={data}
              setOrder={setData}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          }
          outsideClick={onClose}
          classNames={"max-w-md"}
        />
      )}
    </div>
  );
};
