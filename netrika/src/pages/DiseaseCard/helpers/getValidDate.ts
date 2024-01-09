import moment from "moment/moment";

export const getValidDate = (date: Date | string) => {
  if (!date || moment(date).year() < 1500) return "";
  return moment(date).format("DD.MM.YYYY");
};
