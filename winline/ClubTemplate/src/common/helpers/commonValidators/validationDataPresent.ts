import moment from "moment";

export const validationDataPresent = (value: string) => {
  const date = moment(value);

  return +date<(Date.now() - 100);
};
