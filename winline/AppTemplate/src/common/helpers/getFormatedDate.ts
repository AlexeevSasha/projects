import moment from "moment";
import i18n from "i18next";
import { formsConstantsValidation } from "../constants/formsConstantsValidation";
import { dateControl } from "./dateControl";

export const getFormatedDate = (date?: string, format: string = formsConstantsValidation.dateFormat) => {
  if (!date) {
    return "";
  }

  return moment(date).format(format);
};

export const getFullFormatedDate = (date?: string) => {
  if (!date) {
    return "";
  }

  if (dateControl(date)) {
    return i18n.t("marketing.story.indefinitely").toLowerCase();
  }

  const dateToDay = new Date(date);
  if (dateToDay.getFullYear() <= 2000) {
    return "-";
  }

  return moment(date).format("DD/MM/YYYY HH:mm");
};
