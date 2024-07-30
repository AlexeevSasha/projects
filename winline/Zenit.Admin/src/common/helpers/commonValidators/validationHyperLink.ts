import i18n from "i18next";
import { formsConstantsValidation } from "../../constants/formsConstantsValidation";

export const validationHyperLink = async (_: unknown, value: string) => {
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18n.t("validations.required")));
  } else if (value && !/^https?:\/\/[^\/]{1}.+$/.test(value)) {
    return Promise.reject(new Error(i18n.t("validations.invalidUri")));
  } else if (value.length > formsConstantsValidation.link.max) {
    return Promise.reject(new Error(i18n.t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })));
  }

  return Promise.resolve();
};
