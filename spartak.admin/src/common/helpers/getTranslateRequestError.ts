import i18next from "i18next";
import { IRequestResponseError } from "../interfaces/IRequestResponseError";

function getTranslateRequestError(msg: IRequestResponseError) {
  // const val = "back:errors.EntityNotFoundException.EmployeeInfoQQQQQQQQ"; for test!!!
  const val = `back:${msg.bodyError.type}`;
  if (msg.status === 500) {
    return msg.bodyError.message;
  }

  const withoutNamespace = val.split(":")[1];
  const arrayFromTypes = withoutNamespace.split(".");
  const message =
    arrayFromTypes.length == 3 && i18next.t(val) === withoutNamespace
      ? `${arrayFromTypes[0]}.${arrayFromTypes[1]}.Default`
      : val;

  return i18next.t(message);
}

export default getTranslateRequestError;
