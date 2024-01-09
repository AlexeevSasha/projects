import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const playerNumberValidator = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (isNaN(+value) && Promise.reject(new Error(t("validations.onlyNumbers")))) ||
  (+value < 1 && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (+value > 99 && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  Promise.resolve();
