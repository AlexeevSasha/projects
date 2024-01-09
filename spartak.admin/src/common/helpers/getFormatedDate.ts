import moment from "moment";

export const formatInMoscowDate = (
  date?: string,
  { withTime, format = "DD/MM/YYYY", utc = true }: { withTime?: boolean; format?: string; utc?: boolean } = {}
): string => {
  const dateStringWithoutTimezon = date?.split("Z")[0];

  if (!dateStringWithoutTimezon || dateStringWithoutTimezon === "0001-01-01T00:00:00") {
    return "";
  }

  const dateMoscowInMiliseconds = +new Date(dateStringWithoutTimezon) + (utc ? 10800000 : 0);

  return moment(dateMoscowInMiliseconds).format(withTime ? "DD/MM/YYYY HH:mm" : format);
};
