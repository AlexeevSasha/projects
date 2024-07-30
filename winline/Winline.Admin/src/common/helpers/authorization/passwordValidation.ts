import {formsConstantsValidation} from "../../constants/formsConstantsValidation";

export const isValidPassword = (value: string) =>
  /[A-Z]/.test(value) &&
  /[a-z]/.test(value) &&
  /[0-9]/.test(value) &&
  /^[a-z0-9]*$/gi.test(value) &&
  value.length >= formsConstantsValidation.password.min &&
  value.length <= formsConstantsValidation.password.max;
