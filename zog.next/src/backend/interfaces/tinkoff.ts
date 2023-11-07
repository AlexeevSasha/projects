export interface ITinkoffResponse {
  id: string;
  status: "signed" | "approved" | "rejected" | "canceled";
  created_at: string;
  demo: boolean;
  committed: boolean;
  first_payment: number;
  order_amount: number;
  credit_amount: number;
  product: string;
  term: number;
  monthly_payment: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  loan_number: string;
  email: string;
  signing_type: string;
  chosenBank: string;
}
