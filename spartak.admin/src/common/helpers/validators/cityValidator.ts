import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const cityValidator = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) || Promise.resolve();
