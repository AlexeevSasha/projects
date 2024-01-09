import { formatDate } from "./date";

export const fromToDate = (locale: string, start?: string, end?: string) => {
  return `c ${formatDate(start, "dd MMMM", locale) + " по " + formatDate(end, "dd MMMM", locale)}`;
};
