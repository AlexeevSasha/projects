export type SaleT = {
  id: string;
  image: string;
  title: string;
  date: string;
  label: string;
  type?: "sale" | "promocode";
};

export type SaleDetailsT = {
  id: string;
  image: string;
  participation?: string;
  labels: { title: string; color: string }[];
  title: string;
  description: string;
  termsOfSale: string;
};
