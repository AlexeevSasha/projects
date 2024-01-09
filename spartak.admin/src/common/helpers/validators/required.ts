import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const required = (_: RuleObject, value: number | string) =>
  ((value === undefined ||
    value === null ||
    (typeof value === "number" && value < 0) ||
    (typeof value === "number" && !Number.isInteger(value))) &&
    Promise.reject(new Error(t("validations.required")))) ||
  Promise.resolve();

export const requiredWithoutMessage = (_: RuleObject, value: string | number) =>
  ((value === undefined ||
    value === null ||
    (typeof value === "number" && value < 0) ||
    (typeof value === "number" && !Number.isInteger(value))) &&
    Promise.reject(new Error(""))) ||
  Promise.resolve();
