import type { TFilterTag } from '@entities/application/model/application';
import { dreamersCountFields } from '@features/application/partner';
import { CrossIcon } from '@shared/assets';
import { Paragraph } from '@shared/ui';
import css from './FilterTag.module.scss';

type TProps = {
  item: TFilterTag | TFilterTag[];
  onDelete: () => void;
};

export const FilterTag = (props: TProps) => {
  const { item, onDelete } = props;

  const getLabel = (tag: TFilterTag) => {
    return dreamersCountFields.includes(tag.formName) ? 'мечтателей' : '₽';
  };

  const renderLabel = () => {
    if (Array.isArray(item)) {
      return `${item[0].label} - ${item[1].label} ${getLabel(item[0])}`.trim();
    }

    if (item.formName.includes('min')) {
      return `от ${item.value} ${getLabel(item)}`.trim();
    }

    if (item.formName.includes('max')) {
      return `до ${item.value} ${getLabel(item)}`.trim();
    }

    return item.label;
  };

  return (
    <div className={css.tag}>
      <Paragraph>{renderLabel()}</Paragraph>
      <div onClick={onDelete} className={css.tag__delete}>
        <CrossIcon />
      </div>
    </div>
  );
};
