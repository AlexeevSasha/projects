import type { ReactElement } from 'react';
import { Space } from 'antd';
import Image from 'next/image';
import welcomeImageUrl from '@shared/assets/contacts-hint.svg';
import { Button } from '@shared/ui';
import css from './ApplicationWelcomeMessage.module.scss';

export type ApplicationWelcomeMessageProps = {
  image?: {
    src: string;
    height: number;
    alt: string;
  };
  message: ReactElement;
  buttonText?: string;
  onInitFlowClick?(): void;
};

export const ApplicationWelcomeMessage = (props: ApplicationWelcomeMessageProps) => {
  const {
    image = { src: welcomeImageUrl, height: 200, alt: 'Приветственная иллюстрация' },
    message,
    buttonText,
    onInitFlowClick,
  } = props;

  const buttonRenderCondition = buttonText && onInitFlowClick;

  return (
    <Space direction='vertical' size={16} className={css.container}>
      <Image height={image.height} src={image.src} alt={image.alt} />
      <div>{message}</div>
      {buttonRenderCondition && (
        <Button type='primary' onClick={onInitFlowClick}>
          {buttonText}
        </Button>
      )}
    </Space>
  );
};
