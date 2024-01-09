import { t } from "i18next";

export const statuses = () => [
  { value: "New", label: t("kids.statuses.new") },
  { value: "Refusal", label: t("kids.statuses.refusal") },
  { value: "Processed", label: t("kids.statuses.processed") },
  { value: "Repeatedly", label: t("kids.statuses.repeatedly") },
  { value: "Important", label: t("kids.statuses.important") },
  { value: "Reprocessed", label: t("kids.statuses.reprocessed") },
];
