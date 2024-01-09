import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const requiredMinMax = (_: RuleObject, value: string, min: number, max: number) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (value.length < min && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value.length > max && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  Promise.resolve();

export const validationMinMaxOnly = (_: RuleObject, value: string, min: number, max: number) =>
  (value && value.length < min && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value && value.length > max && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  Promise.resolve();

export const quantityValidation = (_: RuleObject, value: number, min: number, max: number, errorJsonName: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (typeof value === "number" && (value < min || value > max) && Promise.reject(new Error(t(errorJsonName)))) ||
  Promise.resolve();
