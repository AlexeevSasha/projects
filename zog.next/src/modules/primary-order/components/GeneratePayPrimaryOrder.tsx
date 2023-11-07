import { Modal } from "../../../common/components/modal/modal";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { IPrimaryOrder } from "../interfaces/PrimaryOrder";
import { Payment } from "../../payment/component/payment";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

type Props = Pick<IPrimaryOrder, "utm" | "form" | "name">;

export const GeneratePayPrimaryOrder = ({ utm, form, name }: Props) => {
  const { locale } = useRouter();
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        className={"h-5 w-5 text-gray-400 transition-colors hover:text-orange-500"}
        onClick={() => setShow(true)}
      >
        <CreditCardIcon />
      </button>

      {show && (
        <Modal
          title={getLanguage(locale).modal.generate_pay.title}
          description={name}
          content={<Payment.PaymentGenerate utm={utm} form={form} />}
          outsideClick={() => setShow(false)}
          classNames={"max-w-7xl"}
        />
      )}
    </div>
  );
};
