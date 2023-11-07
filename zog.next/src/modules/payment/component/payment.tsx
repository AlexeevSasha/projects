import { PaymentGenerate } from "./paymentGenerate";
import { PaymentCardManual } from "./PaymentCardManual";
import { PaymentSetting } from "./paymentSettings";
import { PaymentBannerCard } from "./paymentBannerCard";
import { TinkoffCard } from "./tinkoff/TinkoffCard";

export const Payment = () => {
  return <></>;
};

Payment.PaymentGenerate = PaymentGenerate;
Payment.PaymentBannerCard = PaymentBannerCard;
Payment.PaymentCardManual = PaymentCardManual;
Payment.PaymentSetting = PaymentSetting;
Payment.TinkoffCard = TinkoffCard;
