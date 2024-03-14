import { PositionT } from './position';
import { ThemeT } from './theme';
import { TypeT } from './type';
import { TransitionT } from './transition';
import { StyleT } from './style';

export type ToastT = {
  position?: PositionT;
  theme?: ThemeT;
  type?: TypeT;
  transition?: TransitionT;
  title?: string;
  timeout?: number;
  icon?: JSX.Element;
  hiddenIcon?: boolean;
  animateIcon?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  style?: StyleT;
};

export type DetailsToastT = ToastT & {
  text: string;
  id: string;
};
