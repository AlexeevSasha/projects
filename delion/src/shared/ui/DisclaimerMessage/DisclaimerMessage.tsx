import type { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import cx from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './DisclaimerMesage.module.scss';

type DisclaimerMessageProps = {
  color: 'warning' | 'organization' | 'primary';
  disclaimer: ReactNode;
  className?: string;
};

export const DisclaimerMessage = (props: DisclaimerMessageProps) => {
  const { color, disclaimer, className } = props;

  return (
    <Space className={cx(css.disclaimer, css[color], className)}>
      <InfoCircleOutlined className={css.icon} />
      <Paragraph className={css.disclaimerContent}>{disclaimer}</Paragraph>
    </Space>
  );
};
