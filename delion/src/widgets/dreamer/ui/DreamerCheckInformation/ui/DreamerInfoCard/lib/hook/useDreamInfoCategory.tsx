import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import type { Dreamer } from '@entities/dreamer';
import { DreamerInfo } from '@features/dreamer';
import { Button } from '@shared/ui';

const parent = (dreamer: Dreamer) => [
  {
    name: 'ФИО',
    description: dreamer.parent_fio,
  },
  {
    name: 'Дата рождения',
    description: dayjs(dreamer.parent_birth_date || '').format('D MMMM YYYY'),
  },
  {
    name: 'Населенный пункт проживания родителя',
    description: dreamer.parent_settlement,
  },
  {
    name: 'Адрес регистрации родителя',
    description: dreamer.parent_address,
  },
];

const twoDocs = (dreamer: Dreamer) => [
  {
    name: 'Лицевая сторона',
    description: (
      <Button
        key={'desc_front'}
        style={{ padding: 0, fontSize: '14px', height: 'auto' }}
        type={'text'}
        href={dreamer.document_front_file?.file}
        target={'_blank'}
      >
        Открыть фото
      </Button>
    ),
  },
  {
    name: 'Оборотная сторона',
    description: (
      <Button
        key={'desc_back'}
        style={{ padding: 0, fontSize: '14px', height: 'auto' }}
        type={'text'}
        href={dreamer.document_back_file?.file}
        target={'_blank'}
      >
        Открыть фото
      </Button>
    ),
  },
];

const docs = (dreamer: Dreamer) => [
  {
    name: 'Подтверждающий документ',
    description: (
      <Button
        key={'desc_back'}
        style={{ padding: 0, fontSize: '14px', height: 'auto' }}
        type={'text'}
        href={dreamer.document_front_file.file}
        target={'_blank'}
      >
        Открыть фото
      </Button>
    ),
  },
];

export const useDreamInfoCategory = (dreamer: Dreamer) => {
  const info = useMemo(() => {
    if (dreamer.category.combatant_related) {
      return parent(dreamer);
    } else if (dreamer.category.two_side_doc) {
      return twoDocs(dreamer);
    } else return docs(dreamer);
  }, [dreamer]);

  return (
    <DreamerInfo
      title={'Категория мечтателя'}
      info={[
        {
          name: 'Категория',
          description: dreamer.category?.label,
        },
        ...info,
      ]}
      divider
    />
  );
};
