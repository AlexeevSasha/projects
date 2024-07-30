import {formsConstantsValidation} from "../../constants/formsConstantsValidation";

export const isValidEmail = (value: string): boolean => {
  return (
    !!value &&
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z][a-z0-9-]+(\.[a-z0-9]+)*\.[a-z]{2,6}$/gi.test(value) &&
    value.length <= formsConstantsValidation.default.max
  );
};
