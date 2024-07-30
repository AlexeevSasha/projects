import i18n from "i18next";

export const validationColor = async (_: unknown, value: string) => {
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18n.t("validations.required")));
  } else if (value && !/#[a-f0-9]{6}\b/gi.test(value)) {
    return Promise.reject(new Error(i18n.t("validations.invalidColorFormat")));
  }

  return Promise.resolve();
};
