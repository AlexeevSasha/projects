export type UserPointsStatusT = {
  status: "Серебряный" | "Золотой" | "Платиновый";
  finishSum: number;
  currentSum: number;
  bonus: PointStatusBonusT[];
};

export type PointStatusBonusT = {
  type: "Delivery" | "Cashback" | "Discount";
  count: number;
};
