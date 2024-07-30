import i18next from "i18next";

export const rules = (required?: boolean, max?: number, type?: string): object[] => {
  const validator = [];
  validator.push({ required, message: i18next.t("validations.required") });

  if (max) {
    validator.push({ max, message: i18next.t("validations.maxLengthExceeded", { max }) });
  }
  if (type) {
    validator.push({ type, message: i18next.t("validations.invalidEmail") });
  }

  return validator;
};
