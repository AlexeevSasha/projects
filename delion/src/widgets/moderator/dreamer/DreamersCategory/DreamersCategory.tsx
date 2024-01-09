import { useMemo } from 'react';
import { Space } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { Dreamer } from '@entities/dreamer';
import { Paragraph } from '@shared/ui';
import { dreamersCategory } from './lib/dreamersCategory';

interface IProps {
  dreamer: Dreamer;
  name: NamePath;
}

export const DreamersCategory = ({ dreamer, name }: IProps) => {
  const render = useMemo(() => {
    if (dreamer.category.combatant_related) {
      return dreamersCategory['parent'](dreamer, name);
    } else if (dreamer.category.two_side_doc) {
      return dreamersCategory['twoDocs'](dreamer, name);
    } else return dreamersCategory['docs'](dreamer, name);
  }, []);

  return (
    <Space size={'middle'} direction={'vertical'}>
      <Paragraph style={{ paddingLeft: 8 }} strong level={4}>
        Категория мечтателя
      </Paragraph>
      <Space size={'middle'} direction={'vertical'}>
        {render}
      </Space>
    </Space>
  );
};
