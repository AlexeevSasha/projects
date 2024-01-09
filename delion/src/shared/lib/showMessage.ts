import type React from 'react';
import type { ArgsProps } from 'antd/es/message/interface';
import { messageS } from '@shared/model';

export const messageOpen = (argProps: ArgsProps) => {
  messageS.message?.open({
    ...argProps,
    duration: 3,
  });
};

export const messageSuccess = (content: React.ReactNode) => {
  messageOpen({ content, type: 'success' });
};

export const messageError = (content: React.ReactNode) => {
  messageOpen({ content, type: 'error' });
};
