import { getDreamerWishTypeIcon } from '@entities/application/lib/getDreamerWishTypeIcon';
import type { Dreamer } from '@entities/dreamer';
import { Paragraph } from '@shared/ui';
import css from './DreamerWishBox.module.scss';

export const DreamerWishBox = ({ dream_category }: Pick<Dreamer, 'dream_category'>) => {
  return (
    <div className={css.container}>
      {getDreamerWishTypeIcon(dream_category.type || '1', { width: 40, height: 40 })}
      <Paragraph>{dream_category.label}</Paragraph>
    </div>
  );
};
