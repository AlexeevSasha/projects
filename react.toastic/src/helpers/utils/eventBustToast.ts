import { EventBus } from './eventBus';
import { EventBusNames } from '../../interfaces/enum';
import { DetailsToastT, ToastT } from '../../interfaces/toast';
import { defaultDetailsToast } from './defaultDetails';

class EventBustToast extends EventBus {
  open(text: string, details?: ToastT) {
    this.emit(EventBusNames.OPEN, defaultDetailsToast.buildToast(text, details));
  }

  close(details: Pick<DetailsToastT, 'id' | 'position'>) {
    this.emit(EventBusNames.CLOSE, details);
  }

  error(text: string, details?: Omit<ToastT, 'type'>) {
    this.open(text, { ...details, type: 'error' });
  }

  success(text: string, details?: Omit<ToastT, 'type'>) {
    this.open(text, { ...details, type: 'success' });
  }

  info(text: string, details?: Omit<ToastT, 'type'>) {
    this.open(text, { ...details, type: 'info' });
  }

  warning(text: string, details?: Omit<ToastT, 'type'>) {
    this.open(text, { ...details, type: 'warning' });
  }
}

const eventBustToast = new EventBustToast();

type TypeToastT = {
  (text: string, details?: ToastT): void;
  error: typeof eventBustToast.error;
  success: typeof eventBustToast.success;
  warning: typeof eventBustToast.warning;
  info: typeof eventBustToast.info;
};
const toast = <TypeToastT>eventBustToast.open.bind(eventBustToast);
toast.error = eventBustToast.error.bind(eventBustToast);
toast.success = eventBustToast.success.bind(eventBustToast);
toast.warning = eventBustToast.warning.bind(eventBustToast);
toast.info = eventBustToast.info.bind(eventBustToast);

export { eventBustToast, toast };
