export interface IPaymentForm {
  sum: string;
  currency: string;
  system: string;
  successUrl: string;
}

export interface IPaymentBanner {
  id: string;
  createdAt: string;
  image_id: string;
  url: string;
  sum: string;
  currency: string;
  system: string;
  successUrl: string;
}
