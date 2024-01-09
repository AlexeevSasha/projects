import i18next from "i18next";

export const validationDate = async (_: unknown, value: string) => {
  const date = new Date(value);
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18next.t("back:validations.Required")));
  }
  if (date.setMinutes(date.getMinutes() + 1) <= Date.now()) {
    return Promise.reject(
      new Error(
        i18next.t("back:validations.DateMustBeGreaterThenCurrentMoment")
      )
    );
  }

  return Promise.resolve();
};
