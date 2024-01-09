import type { TagProps as AntdTagProps } from 'antd/es/tag';
import { Tag as AntdTag } from 'antd/lib';
import cx from 'classnames';
import { calculateProgress } from '@shared/lib';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import css from './Tag.module.scss';

export type TagProps = AntdTagProps & {
  titleColor?: string;
  type?: 'default' | 'success' | 'organization' | 'blue';
  progress?: {
    total?: number;
    count?: number;
    title?: string;
    color?: 'organization' | 'warning' | 'blue';
  };
};

export const Tag = (props: TagProps) => {
  const { titleColor, type = 'default', ...rest } = props;

  if (props.progress) {
    const { count = 2, total = 10, title = 'Исполнено', color = 'blue' } = props.progress;

    const calculations = calculateProgress(count, total);
    const emptyCount = calculations.completed === 0;

    return (
      <AntdTag className={css.tagWithProgress}>
        <div className={cx(css.progress, css[color])}>
          <div
            className={css.shrinker}
            style={{
              width: emptyCount ? 0 : `${calculations.donePercentage}%`,
              minWidth: emptyCount ? 0 : '20%',
            }}
          />
          <Paragraph level={6} className={css.tagTitle}>{`${title} ${count} / ${total}`}</Paragraph>
        </div>
      </AntdTag>
    );
  }

  return (
    <AntdTag {...rest} className={cx(css.tag, css[type], rest.className)}>
      <Paragraph level={6} className={css.tagTitle} style={{ color: titleColor }}>
        {props.title}
      </Paragraph>
    </AntdTag>
  );
};
