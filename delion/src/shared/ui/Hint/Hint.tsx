import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { Space } from 'antd';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import css from './Hint.module.scss';

export interface HintProps extends PropsWithChildren {
  title?: string;
  description?: string;
  style?: CSSProperties;
}

export const Hint: FC<HintProps> = ({ title, description, children, style }) => {
  return (
    <Space size={8} className={css.container} direction='vertical' style={style}>
      {title && <Paragraph level={5}>{title}</Paragraph>}
      {description && <Paragraph level={6}>{description}</Paragraph>}
      {children}
    </Space>
  );
};
