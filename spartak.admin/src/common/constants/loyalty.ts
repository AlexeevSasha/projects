import { t } from "i18next";

export enum LoyaltyStatus {
  scheduled = "scheduled",
  published = "published",
  completed = "completed",
  outofstock = "outofstock",
}

export const getLoyaltyStatuses = () =>
  Object.keys(LoyaltyStatus).map((value) => ({ value, label: t(`loyalty.statuses.${value}`) }));
