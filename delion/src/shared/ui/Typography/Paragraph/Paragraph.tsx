import type { FC } from 'react';
import { Typography } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import classNames from 'classnames';
import css from './Paragraph.module.scss';

interface Props extends TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Paragraph: FC<Props> = ({ level = 5, className, ...props }) => {
  return (
    <Typography.Text {...props} className={classNames(className, css.text, css[`text_${level}`])} />
  );
};
