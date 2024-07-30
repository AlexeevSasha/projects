import moment from 'moment';
import {formsConstantsValidation} from "../constants/formsConstantsValidation";

export const getFormatedDate = (date?: string, format: string = formsConstantsValidation.dateFormat) => {
  if (!date) {
    return '';
  }

  return moment(date).format(format);
};
