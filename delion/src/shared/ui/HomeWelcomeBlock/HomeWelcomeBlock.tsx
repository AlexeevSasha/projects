import type { ReactNode } from 'react';
import React from 'react';
import { Grid, Space, Typography } from 'antd';
import cx from 'classnames';
import Image from 'next/image';
import { Paragraph } from '@shared/ui';
import css from './HomeWelcomeBlock.module.scss';

type TProps = {
  title: string;
  subtitle: string;
  button: ReactNode;
  image: string;
  locked?: boolean;
};
export const HomeWelcomeBlock = (props: TProps) => {
  const { subtitle, title, button, image, locked } = props;
  const breakpoints = Grid.useBreakpoint();
  return (
    <Space direction='vertical' className={css.container} align='center'>
      <Image height={160} src={image} alt='Иллюстрация приветствия' />
      <Typography.Title level={breakpoints.xs ? 5 : 4}>{title}</Typography.Title>
      <Paragraph className={cx(css.subtitle, { [css.isMobile]: breakpoints.xs })}>
        {subtitle}
      </Paragraph>
      {button}
      {locked && <div className={css.overlay} />}
    </Space>
  );
};
