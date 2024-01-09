import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const urlValidator = (_: RuleObject, value?: string) =>
  (value?.length && value.length < 2 && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value?.length && value.length > 1000 && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  Promise.resolve();
