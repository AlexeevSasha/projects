export interface IStripePayment {
  success_url: string;
  price: number;
  currency: string;
  form?: string;
  utm?: string;
}
