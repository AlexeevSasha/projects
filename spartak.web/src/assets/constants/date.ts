import { lang } from "../../../public/locales/lang";
import { getDayOfWeek } from "./getDayOfWeek";

export const formatDate = (date: string | undefined, formatString: string, locale: string, isItTimer?: boolean) => {
  if (!date) return "invalid date";

  let newDate;
  if (isItTimer) {
    newDate = new Date(date.split("Z")[0]);
  } else {
    newDate = new Date(+new Date(date.split("Z")[0]) + 10800000);
  }

  if (newDate.getDate() && locale) {
    return formatString
      .replace("dddd", padZero(Math.floor(+newDate / 1000 / 60 / 60 / 24))) //дни для таймеров
      .replace("dd", padZero(newDate.getDate()))
      .replace("DD", padZero(newDate.getDate() - 1))
      .replace("mmmm", lang[locale].monthList.default[newDate.getMonth()])
      .replace("MMMM", lang[locale].monthList.declination[newDate.getMonth()])
      .replace("MM", padZero(newDate.getMonth() + 1))
      .replace("yyyy", String(newDate.getFullYear()))
      .replace("yy", String(newDate.getFullYear()).substring(2))
      .replace("HH", padZero(newDate.getHours()))
      .replace("mm", padZero(newDate.getMinutes()))
      .replace("ss", padZero(newDate.getSeconds()))
      .replace("ww", getDayOfWeek(+padZero(newDate.getDay()), locale));
  } else {
    return "invalid date";
  }
};

const padZero = (n: number): string => (n < 10 ? `0${n}` : String(n));
const yearPadZero = (n: number): string =>
  n < 1000 ? (n < 100 ? (n < 10 ? `000${n}` : `00${n}`) : `0${n}`) : String(n);

export const getDaysInMonth = (month: number) => new Date(+new Date(2022, month + 1) - 1).getDate();

export const getDateFromString = (dateString = "") => {
  if (dateString === null || dateString.includes("0001-01-01")) return undefined;
  const arr = dateString.split("T")[0].split("-");
  const value = dateString ? new Date() : undefined;
  value?.setFullYear(+arr[0], +arr[1] - 1, +arr[2]);
  return value;
};

export const getTimeZoneOffset = (date = new Date()) => date.getTimezoneOffset() * 60 * 1000;

// убрал getTimeZoneOffset так как в карточке матча были 2 лишних часа
export const getUtcDateNow = () => Date.now(); /*+ getTimeZoneOffset()*/

export const toISOString = (date?: Date) =>
  date ? `${yearPadZero(date.getFullYear())}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}` : "";

export const getYearsOld = (_birthDate: string) => {
  if (_birthDate.includes("0001-01-01")) return 0;
  const today = new Date();
  const birthDate = new Date(_birthDate);
  const days = today.getDate() - birthDate.getDate();
  const months = today.getMonth() - birthDate.getMonth() - (days < 0 ? 1 : 0);
  const years = today.getFullYear() - birthDate.getFullYear() - (months < 0 ? 1 : 0);

  return years;
};

export const getTimeToTimer = (date: number, format: string) => {
  let newMiliseconds = date;
  const days = Math.floor(newMiliseconds / 1000 / 60 / 60 / 24);
  newMiliseconds -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(newMiliseconds / 1000 / 60 / 60);
  newMiliseconds -= hours * 1000 * 60 * 60;

  const min = Math.floor(newMiliseconds / 1000 / 60);
  newMiliseconds -= min * 1000 * 60;

  const sec = Math.floor(newMiliseconds / 1000);

  return format
    .replace("dddd", padZero(days))
    .replace("HH", padZero(hours))
    .replace("mm", padZero(min))
    .replace("ss", padZero(sec));
};

export const millisecondsInDay = 1000 * 60 * 60 * 24;

export const getDaysLeft = (date: string) => (+new Date(date) - Date.now()) / millisecondsInDay;
