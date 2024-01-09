import { Space } from 'antd';
import { getNosologyIcon } from '@features/dreamer';
import { Tag } from '@shared/ui';
import css from './DreamersAccordionNosologies.module.scss';

export type DreamersAccordionNosologoiesProps = {
  nosology: Option[];
};

export const DreamersAccordionNosologoies = (props: DreamersAccordionNosologoiesProps) => {
  const { nosology } = props;

  return (
    <Space size={4} className={css.nosologyWrapper} wrap>
      {nosology.map((item) => {
        return (
          <Tag
            className={css.nosology}
            key={item.value}
            icon={getNosologyIcon(item.value)}
            title={item.label}
          />
        );
      })}
    </Space>
  );
};
