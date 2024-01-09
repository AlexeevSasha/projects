import { formatDate } from "../assets/constants/date";

export const showHours = (date: string, locale: string) => {
  const verificationTime = new RegExp(/23:00:00Z/);
  const showTime = verificationTime.test(date) ? "dd MMMM" : "dd MMMM, HH:mm";

  let localDateTime = new Date(date);
  const moscowTimeOffset = -180;
  localDateTime = new Date(localDateTime.getTime() + (moscowTimeOffset - localDateTime.getTimezoneOffset()) * 60000);

  return formatDate(localDateTime.toISOString(), showTime, locale);
};
