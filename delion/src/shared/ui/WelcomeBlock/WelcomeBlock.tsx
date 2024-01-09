import type { ReactNode } from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import welcomeImage from '@shared/assets/img-dreamer.svg';
import { Paragraph } from '@shared/ui';
import css from './WelcomeBlock.module.scss';

interface IWelcomeBlockProps {
  title: string;
  description: string | ReactNode;
  button: ReactNode;
  children?: ReactNode;
  img?: string;
}

export const WelcomeBlock = (props: IWelcomeBlockProps) => {
  return (
    <div className={css.container}>
      <Image height={200} src={props.img || welcomeImage} alt='Приветственная иллюстрация' />
      <div>
        <Typography.Title level={4}>{props.title}</Typography.Title>
        <Paragraph className={css.description}>{props.description}</Paragraph>
      </div>
      {props.button}
      {props.children}
    </div>
  );
};
