import { ToastT } from './toast';
import { StyleT } from './style';

export type ConfigStyleT = {
  light?: { info?: StyleT; success?: StyleT; warning?: StyleT; error?: StyleT; default?: StyleT };
  dark?: { info?: StyleT; success?: StyleT; warning?: StyleT; error?: StyleT; default?: StyleT };
  colored?: {
    info?: StyleT;
    success?: StyleT;
    warning?: StyleT;
    error?: StyleT;
    default?: StyleT;
  };
};

export type ConfigToastType = Omit<ToastT, 'style'> & {
  style?: ConfigStyleT;
};
