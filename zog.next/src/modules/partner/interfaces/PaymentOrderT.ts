export type PaymentOrderT = {
  id: string;
  createdAt: string;
  updatedAt: string;
  bankName: string;
  cardNumber: string;
  name: string;
  count: number;
  status: string;
  partnerEmail: string;
};

export type ShortPaymentOrderT = {
  bankName: string;
  cardNumber: string;
  name: string;
  count: number;
  saveCardInfo: boolean;
};
