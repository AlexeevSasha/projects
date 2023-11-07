export type UserPointsTransactionT = {
  id: string;
  type: "payment" | "additional";
  orderNumber: string;
  date: string;
  sum: number;
};
