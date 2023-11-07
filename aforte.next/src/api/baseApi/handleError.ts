import { AxiosError } from "axios";
import { isClient } from "common/constants/variables";
// import { ErrorResponse } from "common/interfaces/api";

export const handleError = async (e: unknown) => {
  const err = e as AxiosError<any>;
  if (isClient) {
    const evt = new CustomEvent("requestError", { bubbles: true, cancelable: true, detail: e });
    document.dispatchEvent(evt);

    switch (err.response?.status) {
      case 400:
        console.log("serverErrors.argumentsError");
        break;
      case 401:
        console.log("serverErrors.notAuthenticated");
        break;
      case 403:
        console.log("serverErrors.notAuthorized");
        break;
      case 408:
        console.log("serverErrors.timeOut");
        break;
      case 409:
        console.log("serverErrors.databaseWrite");
        break;
      case 412:
        console.log("serverErrors.businessLayer");
        break;
      case 429:
        console.log("serverErrors.limitExceeded");
        break;
      case 499:
        console.log("serverErrors.cancelOperation");
        break;
      case 500:
        console.log("serverErrors.serverError");
        break;
      case 502:
        console.log("serverErrors.externalUnexpected");
        break;
      case 503:
        console.log("serverErrors.serviceUnavailable");
        break;
      case 504:
        console.log("serverErrors.externalNotResponding");
        break;

      default:
        console.log(err.message || "serverErrors.unknownError");
        break;
    }
  } else {
    console.log(`\x1b[37m Error: ${e}`);
  }

  throw { error: { status: err.response?.status, data: err.response?.data || err.message } };
};
