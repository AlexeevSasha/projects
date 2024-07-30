import type { Moment } from "moment";

export const changeDataFormatToISO = (date?: Moment, from?: boolean) => {
  if(!date) {
      return '';
  }
  const dateToDate = date.toDate();

  if(from){
    dateToDate.setHours(0,0,0,0);
  } else {
    dateToDate.setHours(23, 59, 59, 999);
  }

  return dateToDate.toISOString();
};
