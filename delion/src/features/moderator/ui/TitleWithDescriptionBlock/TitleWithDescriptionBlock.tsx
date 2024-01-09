import type { ReactNode } from 'react';
import { Space } from 'antd';
import classNames from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './TitleWithDescriptionBlock.module.scss';

interface IProps {
  description: string;
  title?: string;
  icon?: ReactNode;
  isBorder?: boolean;
}

export const TitleWithDescriptionBlock = ({
  description,
  title,
  icon = null,
  isBorder,
}: IProps) => {
  return (
    <Space
      size={icon ? 'middle' : 'small'}
      className={classNames(css.container, {
        [css.container__small]: !icon,
        [css.border]: isBorder,
      })}
      direction={'vertical'}
    >
      {title ? (
        <Paragraph level={icon ? 2 : 4} strong>
          {title}
        </Paragraph>
      ) : null}
      <Space align={'start'}>
        {icon && <div className={css.icon}>{icon}</div>}
        <Paragraph level={icon ? 5 : 4}>{description}</Paragraph>
      </Space>
    </Space>
  );
};
