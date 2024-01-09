import { formsConstantsValidation } from "../../constants/formsConstantsValidation";
import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const isValidEmail = (value: string): boolean => {
  return (
    !!value &&
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z][a-z0-9-]+(\.[a-z0-9]+)*\.[a-z]{2,6}$/gi.test(value) &&
    value.length <= formsConstantsValidation.default.max
  );
};

export const validationEmail = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z][a-z0-9-]+([a-z0-9]+)*\.[a-z]{2,6}$/gi.test(value) &&
    Promise.reject(new Error(t("validations.InvalidName")))) ||
  Promise.resolve();
