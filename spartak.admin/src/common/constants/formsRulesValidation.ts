import i18next from "i18next";

export const rules = (
  required?: boolean,
  max?: number,
  type?: string
): object[] => {
  const validator = [];
  validator.push({ required, message: i18next.t("back:validations.Required") });

  if (max) {
    validator.push({
      max,
      message: i18next.t("back:validations.MaxLengthExceeded", { max }),
    });
  }
  if (type) {
    validator.push({
      type,
      message: i18next.t("back:validations.InvalidEmail"),
    });
  }

  return validator;
};
