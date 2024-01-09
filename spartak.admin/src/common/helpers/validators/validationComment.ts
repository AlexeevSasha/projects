import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const validationComment = (_: RuleObject, value: string) =>
  (value?.length > 320 && Promise.reject(new Error(t("validations.valueSizeValidation")))) || Promise.resolve();

export const validationCommentRequired = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (value?.length > 320 && Promise.reject(new Error(t("validations.valueSizeValidation")))) ||
  Promise.resolve();
