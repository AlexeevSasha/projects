import { useMemo } from 'react';
import { Space } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { Dreamer } from '@entities/dreamer';
import { MaterialWish, NoMaterialWish, SurpriseWish } from './ui/DreamerWishType';

interface IProps {
  dreamer: Dreamer;
  name: NamePath;
}

export const DreamerWish = ({ dreamer, name }: IProps) => {
  const render = useMemo(() => {
    switch (dreamer.dream_category.type) {
      case 1:
        return <MaterialWish dreamer={dreamer} name={name} />;
      case 2:
        return <NoMaterialWish dreamer={dreamer} name={name} />;
      case 3:
        return <SurpriseWish />;
      default:
        return null;
    }
  }, [dreamer.dream_category.type]);

  return (
    <Space size={'middle'} direction={'vertical'}>
      {render}
    </Space>
  );
};
