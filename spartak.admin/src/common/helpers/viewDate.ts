export const viewDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Date(+date + date.getTimezoneOffset() * 60000 + 10800000);
};
