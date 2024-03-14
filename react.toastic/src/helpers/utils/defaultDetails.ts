import { ConfigStyleT, ConfigToastType } from '../../interfaces/config';
import { ToastT } from '../../interfaces/toast';
import { ThemeT } from '../../interfaces/theme';
import { TypeT } from '../../interfaces/type';

class DefaultDetailsToast {
  private details: ConfigToastType;
  private globalStyle: ConfigStyleT;
  constructor() {
    this.details = {
      position: 'top-right',
      theme: 'light',
      transition: 'slide',
      title: '',
      timeout: 5000,
      hiddenIcon: false,
      animateIcon: false,
    };
    this.globalStyle = {};
  }

  getConfigStyle(theme?: ThemeT, type?: TypeT) {
    return this.globalStyle[theme || 'light']?.[type || 'default'] || {};
  }

  setDetails(details?: ConfigToastType) {
    if (!details) return;
    const { style, ...other } = details;
    this.details = { ...this.details, ...other };
    this.globalStyle = style || {};
  }

  buildToast(text: string, details?: ToastT) {
    return {
      text,
      id: 'id_' + Date.now().toString(36),
      ...this.details,
      ...details,
    };
  }
}

export const defaultDetailsToast = new DefaultDetailsToast();
