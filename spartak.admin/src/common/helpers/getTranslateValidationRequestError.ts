import i18next from "i18next";
import type { IError } from "../interfaces/IRequestResponseError";

export const getTranslateValidationRequestError = (errors: Record<string, IError[]> | undefined) => {
  return (
    errors &&
    Object.values(errors)
      .map((error, i) => error.map((elem) => `${Object.keys(errors)[i]}: ${i18next.t(`back:${elem.errorCode}`)}`))
      .join(", ")
  );
};
