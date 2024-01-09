import type { FC, PropsWithChildren, ReactNode } from 'react';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Grid, Space } from 'antd';
import classNames from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './StatusHint.module.scss';

interface Props extends PropsWithChildren {
  status?: Omit<Status, 'success'>;
  title?: string;
  text?: ReactNode;
  borderless?: boolean;
}

export const StatusHint: FC<Props> = ({
  status = 'default',
  title,
  text,
  children,
  borderless = false,
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <div
      className={classNames(css.container, {
        [css.container_warning]: status === 'warning',
        [css.container_borderless]: borderless,
      })}
    >
      {status === 'default' ? <InfoCircleOutlined /> : <ExclamationCircleOutlined />}
      <Space size={16} direction={'vertical'}>
        {title && <Paragraph>{title}</Paragraph>}
        {text && <Paragraph level={breakpoint.md ? 6 : 5}>{text}</Paragraph>}
        {children}
      </Space>
    </div>
  );
};
