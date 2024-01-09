import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const birthdayValidator = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (+new Date(value) < +new Date("1900") && Promise.reject(new Error(t("validations.birthday")))) ||
  Promise.resolve();
