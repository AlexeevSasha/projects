import { lang } from "../../../public/locales/lang";

export const getDayOfWeek = (number: number, locale: string) => {
  switch (number) {
    case 0o0:
      return lang[locale].monthList.dayOfWeek["0"];
    case 0o1:
      return lang[locale].monthList.dayOfWeek["1"];
    case 0o2:
      return lang[locale].monthList.dayOfWeek["2"];
    case 0o3:
      return lang[locale].monthList.dayOfWeek["3"];
    case 0o4:
      return lang[locale].monthList.dayOfWeek["4"];
    case 0o5:
      return lang[locale].monthList.dayOfWeek["5"];
    case 0o6:
      return lang[locale].monthList.dayOfWeek["6"];
    default:
      return "Validation Error";
  }
};
