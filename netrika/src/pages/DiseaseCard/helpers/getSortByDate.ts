import moment from "moment/moment";

export const getSortByDate = <T>(array: T[], field: keyof T, order: "asc" | "desc" = "desc"): T[] => {
  if (!array || !Array.isArray(array)) return [];
  return array.sort((a, b) => {
    const dateA = moment(a[field], "YYYY-MM-DD");
    const dateB = moment(b[field], "YYYY-MM-DD");

    return order === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
  });
};
