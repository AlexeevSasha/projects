import type { useAppProps } from 'antd/es/app/context';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { makeAutoObservable } from 'mobx';

class MessageStore {
  message: MessageInstance | null = null;
  notification: NotificationInstance | null = null;
  modal: useAppProps['modal'] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMessage(instance: MessageInstance) {
    this.message = instance;
  }

  setNotification(instance: NotificationInstance) {
    this.notification = instance;
  }

  setModal(instance: useAppProps['modal']) {
    this.modal = instance;
  }
}

export const messageS = new MessageStore();
