import { createPortal } from "react-dom";
import { Modal } from "../../../../common/components/modal/modal";
import { useCallback, useState } from "react";
import { IPaymentBanner, IPaymentForm } from "../../interfaces/Payment";
import { PaymentForm } from "./paymentForm";
import { changePaymentBanner } from "../../../../api/payment";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  paymentBanner: IPaymentBanner;
  updateBanner: (banner: IPaymentBanner) => void;
}

export const ChangePayment = ({ paymentBanner, updateBanner }: IProps) => {
  const { locale } = useRouter();
  const [show, setShow] = useState(false);
  const onClose = useCallback(() => setShow(false), []);

  const onSubmit = async (file: File, body: IPaymentForm) => {
    const response = await changePaymentBanner(body, paymentBanner.id, file);
    if (response) {
      updateBanner(response);
      onClose();
    }
  };

  return (
    <div className={" w-full  "}>
      <div>
        <button
          type={"button"}
          onClick={() => setShow(true)}
          className={
            "mt-2 w-full bg-green-600 p-2 font-bold text-white transition-colors hover:bg-green-800"
          }
        >
          {getLanguage(locale).common.change}
        </button>
        {show &&
          createPortal(
            <Modal
              title={getLanguage(locale).setting.pay.change_banner}
              content={
                <PaymentForm
                  onClose={onClose}
                  onSubmit={onSubmit}
                  initialValues={paymentBanner}
                  edit
                />
              }
              outsideClick={onClose}
            />,
            document.getElementById("portal") as HTMLDivElement
          )}
      </div>
    </div>
  );
};
