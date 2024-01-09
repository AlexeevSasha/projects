import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const countryValidator = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (value.length < 2 && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value.length > 50 && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  Promise.resolve();
