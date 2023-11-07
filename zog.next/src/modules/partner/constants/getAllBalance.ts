import { InvoiceInfoT } from "../interfaces/InvoiceInfoT";

export const getAllBalance = (partnerList: InvoiceInfoT[]) =>
  partnerList.reduce(
    (acc, test) => {
      acc.balance += +test.balance;
      acc.review += +test.underReview;
      return acc;
    },
    { balance: 0, review: 0 }
  );
