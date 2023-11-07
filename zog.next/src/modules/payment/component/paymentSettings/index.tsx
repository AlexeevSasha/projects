import { useState } from "react";
import { AddPayment } from "./addPayment";
import { IPaymentBanner } from "../../interfaces/Payment";
import { PaymentBanner } from "./paymentBanner";

interface IProps {
  paymentBanners: IPaymentBanner[];
}

export const PaymentSetting = ({ paymentBanners }: IProps) => {
  const [payLists, setPayLists] = useState(paymentBanners);

  const addBanner = (banner: IPaymentBanner) => {
    setPayLists((prev) => [...prev, banner]);
  };

  const updateBanner = (banner: IPaymentBanner) => {
    setPayLists((prev) => prev.map((el) => (el.id === banner.id ? banner : el)));
  };

  const deleteBanner = (id: string) => setPayLists((prev) => prev.filter((el) => el.id !== id));

  return (
    <div className={"p-4"}>
      <AddPayment addBanner={addBanner} />
      <div className={payLists.length ? "mt-10 flex flex-col gap-2" : ""}>
        {payLists.map((el) => (
          <PaymentBanner
            deleteBanner={deleteBanner}
            updateBanner={updateBanner}
            key={el.id}
            paymentBanner={el}
          />
        ))}
      </div>
    </div>
  );
};
