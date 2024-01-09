import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const validationGoals = (_: RuleObject, value: number | string) =>
  ((value === undefined || value === null || (typeof value === "string" && !/[0-9]{1,}-[0-9]{1,}/.test(value))) &&
    Promise.reject(new Error(t("validations.goals")))) ||
  Promise.resolve();
