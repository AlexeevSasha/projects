import i18next from "i18next";
import { formsConstantsValidation } from "../../constants/formsConstantsValidation";

export const validationName = async (_: unknown, value: string) => {
  const entity = formsConstantsValidation.entity.default;
  const s = value?.split(" ");
  if (!value || value.length === 0) {
    return Promise.reject(new Error(i18next.t("validations.required")));
  } else if (value.length < entity.min) {
    return Promise.reject(new Error(i18next.t("validations.minLengthLessLocal")));
  } else if (!/^[А-ЯA-Z][A-ZА-Я\s'\.`]*[А-ЯA-Z\.]$/i.test(value) || /(\s\s|''|``|--|\.\.)/.test(value)) {
    return Promise.reject(new Error(i18next.t("validations.invalidNameLocal")));
  } else if (s.length > entity.wmax) {
    return Promise.reject(new Error(i18next.t("validations.maxWordLengthExceeded")));
  } else if (s.some((item) => item.length > entity.max)) {
    return Promise.reject(new Error(i18next.t("validations.maxLengthExceededLocal")));
  }

  return Promise.resolve();
};
