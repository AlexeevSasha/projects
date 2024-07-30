import i18next from "i18next";

export const validationWithSpaces = async (_: unknown, value: string, max: number) => {
  if (!value || value.length === 0 || /^\s*$/.test(value)) {
    return Promise.reject(new Error(i18next.t("validations.required")));
  } else if (value.length > max) {
    return Promise.reject(new Error(i18next.t("validations.maxLengthExceeded", { max })));
  }

  return Promise.resolve();
};
