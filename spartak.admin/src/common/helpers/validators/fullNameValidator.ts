import { RuleObject } from "antd/lib/form";
import { t } from "i18next";

export const fullNameValidator = (_: RuleObject, value: string, noNumbers?: boolean) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (value.length <= 2 && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value.length >= 100 && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  ((noNumbers
    ? !/^[a-zA-Zа-яё()А-ЯЁ\s\-]+$/i.test(value)
    : !/^[a-zA-Zа-яё()А-ЯЁ0-9\s\-]+$/i.test(value) ||
      /(\s\s|''|``|--|\.\.)/.test(value) ||
      value.trim().length !== value.length) &&
    Promise.reject(new Error(t("validations.InvalidName")))) ||
  // (value?.split(" ").length > 3 && Promise.reject(new Error(t("validations.MaxWordLengthExceeded")))) ||
  Promise.resolve();

export const fullNameTournamentValidator = (_: RuleObject, value: string) =>
  (!value && Promise.reject(new Error(t("validations.required")))) ||
  (value.length <= 2 && Promise.reject(new Error(t("validations.MinLengthLess")))) ||
  (value.length >= 100 && Promise.reject(new Error(t("validations.MaxLengthExceeded")))) ||
  ((!/^[a-zA-Zа-яё()А-ЯЁ0-9.\s\-]+$/i.test(value) ||
    /(\s\s|''|``|--|\.\.)/.test(value) ||
    value.trim().length !== value.length) &&
    Promise.reject(new Error(t("validations.InvalidName")))) ||
  // (value?.split(" ").length > 3 && Promise.reject(new Error(t("validations.MaxWordLengthExceeded")))) ||
  Promise.resolve();
