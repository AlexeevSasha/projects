import { Moment } from "moment";

export const toISOString = (moment: Moment) => {
  const format = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]";

  return moment.format(format);
};
