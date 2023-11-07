import { UserPointsStatusT } from "modules/profile/interfaces/userPointsStatus";

export const userPointsStatusMock: UserPointsStatusT = {
  status: "Золотой",
  finishSum: 5000,
  currentSum: 4500,
  bonus: [
    {
      type: "Delivery",
      count: 2,
    },
    {
      type: "Cashback",
      count: 5,
    },
    {
      type: "Discount",
      count: 20,
    },
  ],
};
