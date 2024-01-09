import i18next from "i18next";
import { formsConstantsValidation } from "../../constants/formsConstantsValidation";

export const validationHyperLink = async (_: unknown, value: string, shoodValidate: boolean = true) => {
  const max = 2048;
  if (shoodValidate) {
    if (!value || value.length === 0) {
      return Promise.reject(new Error(i18next.t("back:validations.Required")));
    } else if (value && value.length > max) {
      return Promise.reject(new Error(i18next.t("back:validations.MaxLengthExceeded", { max })));
    } else if (value && !/https?:\/\//.test(value)) {
      return Promise.reject(new Error(i18next.t("back:validations.UriMustBeAbsolute")));
    }
  }

  return Promise.resolve();
};
