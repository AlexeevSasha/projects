import { paymentUrl } from "./paymentSystems";
import { generateQuery } from "../../../common/constants/generateQuery";

interface ILinkPayArg {
  system: string;
  price: string;
  utm: string;
  form: string;
  currency: string;
  successUrl?: string;
}

export const getLinkPay = ({ system, utm, form, price, currency, successUrl }: ILinkPayArg) => {
  let url;

  switch (system) {
    case "stripe":
      url = paymentUrl.stripe + generateQuery({ price, utm, form, currency, successUrl });
      break;
    case "robokassa":
      url = paymentUrl.robokassa + generateQuery({ price, utm, form });
      break;
  }

  return url;
};
