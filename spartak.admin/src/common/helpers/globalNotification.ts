import { notification } from "antd";
import { theme } from "../../assets/theme/theme";
import { IRequestResponseError } from "../interfaces/IRequestResponseError";
import i18next from "i18next";
import getTranslateRequestError from "./getTranslateRequestError";
import { getTranslateValidationRequestError } from "./getTranslateValidationRequestError";

export const globalNotification = (msg: IRequestResponseError | string) => {
  let message;
  let backgroundColor;
  let borderColor;
  if (typeof msg === "string") {
    message = i18next.t(msg);
    backgroundColor = theme.colors.lightGreen;
    borderColor = theme.colors.lightGreen1;
  } else {
    message = msg.isValidatorError
      ? i18next.t(`back:validations.${msg.bodyError.type}`)
      : msg.bodyError.type
      ? getTranslateRequestError(msg)
      : getTranslateValidationRequestError(msg.bodyError.errors);
    backgroundColor = theme.colors.lightRed;
    borderColor = theme.colors.lightRed1;
  }
  notification.open({
    message: null,
    description: message,
    style: {
      display: "flex",
      alignItems: "center",
      paddingTop: 10,
      paddingRight: 40,
      width: 400,
      backgroundColor: backgroundColor,
      border: `1px solid ${borderColor}`,
    },
  });
};
