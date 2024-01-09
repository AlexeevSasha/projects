import { Space } from 'antd';
import { getDreamerWishTypeIcon } from '@entities/application/lib/getDreamerWishTypeIcon';
import type { Dreamer } from '@entities/dreamer';
import css from './DreamerCollapseTitle.module.scss';

interface IProps {
  id: number;
  title: string;
  dream_category: Dreamer['dream_category'];
}

export const DreamerCollapseTitle = ({ title, id, dream_category }: IProps) => {
  return (
    <Space style={{ justifyContent: 'space-between' }}>
      <div>{title}</div>
      <div className={css.dream} id={`collapse-${id}`} style={{ opacity: 0 }}>
        <p>{dream_category?.label}</p>
        {getDreamerWishTypeIcon(dream_category?.type || '1', { width: 24, height: 24 })}
      </div>
    </Space>
  );
};
