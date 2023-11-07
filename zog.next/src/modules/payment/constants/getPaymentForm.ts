import { IPaymentForm } from "../interfaces/Payment";

export const transformPaymentForm = (values: IPaymentForm): IPaymentForm => {
  const isRobokassa = values.system === "robokassa";
  const currency = isRobokassa ? "rub" : values.currency;
  const successUrl = isRobokassa ? "" : values.successUrl;

  return { ...values, currency, successUrl };
};
