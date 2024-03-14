import { Constants } from '../../interfaces/enum';
import { rootVariables } from '../constants/rootVariables';
import { TypeT } from '../../interfaces/type';

const getColor = (color: string) => {
  return `var(${Constants.ROOTS_NAME}${color})`;
};
export const getColorBy = (value: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return getColor(rootVariables[value]);
};
export const getColorByType = (type?: TypeT, color?: string): string => {
  switch (type) {
    case 'success':
      return `green_${color}`;
    case 'error':
      return `red_${color}`;
    case 'warning':
      return `yellow_${color}`;
    case 'info':
      return `blue_${color}`;
    default:
      return 'white';
  }
};
