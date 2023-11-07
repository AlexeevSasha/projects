import { UserT } from "../../user/interfaces/UserT";

export type InvoiceInfoT = {
  id: string;
  createdAt: string;
  updatedAt: string;
  partnerId: string;
  totalCount: string;
  balance: string;
  underReview: string;
  approve: string;
  user: Pick<UserT, "email" | "name">;
};
