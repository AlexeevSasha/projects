import i18next from "i18next";

export const validationDate = async (_: unknown, value: string) => {
  const date = new Date(value);
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18next.t("validations.required")));
  }
  if (date.setMinutes(date.getMinutes() + 1) <= Date.now()) {
    return Promise.reject(new Error(i18next.t("validations.dateMustBeGreaterThenCurrentMoment")));
  }

  return Promise.resolve();
};
