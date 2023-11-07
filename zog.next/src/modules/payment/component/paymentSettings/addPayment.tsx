import { PlusIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { Modal } from "../../../../common/components/modal/modal";
import { PaymentForm } from "./paymentForm";
import { addPaymentBanner } from "../../../../api/payment";
import { IPaymentBanner, IPaymentForm } from "../../interfaces/Payment";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  addBanner: (banner: IPaymentBanner) => void;
}

export const AddPayment = ({ addBanner }: IProps) => {
  const { locale } = useRouter();
  const [show, setShow] = useState(false);
  const onClose = useCallback(() => setShow(false), []);

  const onSubmit = async (file: File, body: IPaymentForm) => {
    const currency = body.system === "robokassa" ? "₽" : body.currency;
    const response = await addPaymentBanner(file, { ...body, currency });
    if (response) {
      addBanner(response);
      onClose();
    }
  };

  return (
    <div>
      <button
        className={
          "flex items-center gap-2  rounded-lg bg-green-600 p-3 py-2 font-bold  text-white transition-colors hover:bg-green-800 "
        }
        onClick={() => setShow(true)}
      >
        <div className={" h-5 w-5"}>
          <PlusIcon />
        </div>
        {getLanguage(locale).setting.pay.add_new_pay}
      </button>

      {show && (
        <Modal
          title={getLanguage(locale).setting.pay.add_new_pay}
          content={<PaymentForm onClose={() => setShow(false)} onSubmit={onSubmit} />}
          outsideClick={onClose}
        />
      )}
    </div>
  );
};
