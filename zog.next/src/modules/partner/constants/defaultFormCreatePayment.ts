import { ShortPaymentOrderT } from "../interfaces/PaymentOrderT";

export const defaultFormCreatePayment: ShortPaymentOrderT = {
  bankName: "",
  cardNumber: "",
  count: 0,
  name: "",
  saveCardInfo: false,
};
