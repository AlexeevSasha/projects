import { IPaymentBanner } from "../interfaces/Payment";
import { getLinkPay } from "../constants/getLinkPay";

interface IProps {
  paymentBanner: IPaymentBanner;
  utm: string;
  form: string;
}

export const PaymentBannerCard = ({ paymentBanner, utm, form }: IProps) => {
  const url = getLinkPay({
    price: paymentBanner.sum,
    system: paymentBanner.system,
    currency: paymentBanner.currency,
    successUrl: paymentBanner.successUrl,
    utm,
    form,
  });

  if (!url) return null;

  return (
    <a href={url} className={" cursor-pointer "}>
      <div
        style={{ maxHeight: "400px" }}
        className={"h-full max-w-lg  overflow-hidden drop-shadow-md"}
      >
        <img
          className={"h-full w-full object-contain  "}
          key={paymentBanner.url}
          src={paymentBanner.url}
          alt="banners"
        ></img>
      </div>
    </a>
  );
};
