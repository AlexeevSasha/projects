import React, { useMemo } from 'react';
import { Space } from 'antd';
import type { Dreamer } from '@entities/dreamer';
import { DreamerHints, DreamerInfo } from '@features/dreamer';
import { MaterialWishIcon, NonMaterialWishIcon, SurpriseWishIcon } from '@shared/assets';
import { Button, Paragraph } from '@shared/ui';
import css from '../../DreamersInfoCard.module.scss';

const materialWish = (dreamer: Dreamer) => [
  {
    name: 'Подкатегория',
    description: dreamer.dream_category.label,
  },
  {
    name: 'Ссылка на подарок из первого источника',
    description: (
      <Button
        style={{ padding: 0, fontSize: '14px', height: 'auto' }}
        type={'text'}
        href={dreamer.present_link_1}
        target={'_blank'}
        textLink
      >
        {dreamer.present_link_1}
      </Button>
    ),
  },
  {
    name: 'Ссылка на подарок из второго источника',
    description: (
      <Button
        style={{ padding: 0, fontSize: '14px', height: 'auto' }}
        type={'text'}
        href={dreamer.present_link_2}
        target={'_blank'}
        textLink
      >
        {dreamer.present_link_2}
      </Button>
    ),
  },
];

const noMaterialWish = (dreamer: Dreamer) => [
  {
    name: 'Подкатегория',
    description: dreamer.dream_category.label,
  },
  {
    name: 'Тематика желания',
    description: dreamer.theme.label,
  },
  {
    name: 'Описание желания',
    description: dreamer.dream_description,
  },
];

const typeWish = {
  '1': {
    title: 'Материальное',
    icon: <MaterialWishIcon width={20} height={20} />,
    info: materialWish,
    hint: <DreamerHints text={'Убедитесь, что ссылки рабочие'} />,
  },
  '2': {
    title: 'Нематериальное',
    icon: <NonMaterialWishIcon width={20} height={20} />,
    info: noMaterialWish,
    hint: null,
  },
  '3': {
    title: 'Подарок-сюрприз',
    icon: <SurpriseWishIcon width={20} height={20} />,
    info: () => [],
    hint: null,
  },
};

export const useDreamInfoWish = (dreamer: Dreamer) => {
  const wish = useMemo(() => typeWish[dreamer?.dream_category?.type], [dreamer]);

  return (
    <DreamerInfo
      title={'Желание мечтателя'}
      info={[
        {
          name: 'Категория',
          description: (
            <Space>
              <div className={css.icon}>{wish.icon}</div>
              <Paragraph>{wish.title}</Paragraph>
            </Space>
          ),
        },
        ...wish.info?.(dreamer),
      ]}
      hint={wish.hint}
    />
  );
};
