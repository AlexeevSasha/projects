import dayjs from 'dayjs';
import { pluralizeYears } from './pluralize';

export const timestampToTime = (timestamp: number, format = 'mm:ss') => {
  return dayjs.unix(timestamp).format(format);
};

export const getAge = (birthDay: string): string => {
  const day = parseInt(birthDay?.substring(0, 2));
  const month = parseInt(birthDay?.substring(3, 5));
  const year = parseInt(birthDay?.substring(6, 10));

  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0
  let age = today.getFullYear() - birthDate?.getFullYear();
  const m = today.getMonth() - birthDate?.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate?.getDate())) {
    age--;
  }
  return `${age} ${pluralizeYears(age)}`;
};
