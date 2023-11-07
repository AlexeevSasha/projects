import { IPaymentBanner } from "../../interfaces/Payment";
import { Loading } from "../../../../common/components/loading/loading";
import { useState } from "react";
import { DeletePayment } from "./deletePayment";
import { paymentCurrencyOption, paymentSystemOption } from "../../constants/paymentOptions";
import { ChangePayment } from "./changePayment";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";

interface IProps {
  paymentBanner: IPaymentBanner;
  updateBanner: (banner: IPaymentBanner) => void;
  deleteBanner: (id: string) => void;
}

export const PaymentBanner = ({ paymentBanner, updateBanner, deleteBanner }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [loading, setLoading] = useState(true);

  return (
    <div className={"relative "}>
      <div
        className={`border p-2 hover:border-orange-500  ${
          loading ? "pointer-events-none opacity-30" : ""
        }`}
      >
        <div className={"flex flex-col items-center  justify-between gap-2 lg:flex-row"}>
          <div className={"max-w-lg overflow-hidden  drop-shadow-md"}>
            <img
              onLoad={() => setLoading(false)}
              className={"h-full w-full  object-contain"}
              key={paymentBanner.url}
              src={paymentBanner.url}
              alt="banners"
            ></img>
          </div>
          <div style={{ flex: 1, width: "100%", padding: "10px" }}>
            <div className={"mb-2"}>
              <strong className={"mr-1"}>{lang.setting.pay.currency}:</strong>
              {paymentCurrencyOption.find((el) => el.value == paymentBanner.currency)?.label || "₽"}
            </div>
            <div className={"mb-2"}>
              <strong className={"mr-1"}>{lang.table.sum}:</strong> {paymentBanner.sum}
            </div>
            <div>
              <strong className={"mr-1"}>{lang.setting.pay.system}:</strong>
              {paymentSystemOption.find((el) => el.value == paymentBanner.system)?.label}
            </div>
            {paymentBanner.successUrl ? (
              <div>
                <strong className={"mr-1"}>{lang.setting.pay.redirection}:</strong>{" "}
                {paymentBanner.successUrl}
              </div>
            ) : null}
          </div>
          <div>
            <ChangePayment updateBanner={updateBanner} paymentBanner={paymentBanner} />
            <DeletePayment id={paymentBanner.id} deleteBanner={deleteBanner} />
          </div>
        </div>
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
};
