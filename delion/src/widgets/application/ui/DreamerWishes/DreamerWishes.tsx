import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, Grid, Space } from 'antd';
import type { ModerationError } from '@entities/application';
import { FormBlock } from '@entities/application';
import { useStores } from '@shared/lib';
import { Hint } from '@shared/ui';
import css from './DreamerWishes.module.scss';
import { type WishItem, WishList } from './DreamerWishList';
import { WishCard } from './WishCard/WishCard';

interface Props {
  form: FormInstance;
  errors?: ModerationError;
  nextBlock: ReactNode;
}

const SURPRISE_TYPE = 3;

export const DreamerWishes: FC<Props> = ({ form, errors, nextBlock }) => {
  const {
    applicationS: { selectedDreamer },
    catalogueS,
  } = useStores();
  const [selectedWish, setSelectedWish] = useState<WishItem>();
  const breakpoints = Grid.useBreakpoint();

  useEffect(() => {
    form.setFieldValue('wish_type', selectedWish?.id);
  }, [selectedWish]);

  useEffect(() => {
    setSelectedWish(
      WishList(errors).find((wish) => selectedDreamer?.dream_category?.type === wish.id),
    );
  }, [selectedDreamer?.id]);

  const handleWishChange = useCallback(
    (wish: WishItem) => {
      if (wish.id !== selectedWish?.id) {
        form.setFields([
          {
            name: 'dream_category_id',
            value: null,
          },
          {
            name: 'present_link_1',
            value: '',
          },
          {
            name: 'present_link_2',
            value: '',
          },
          {
            name: 'theme_id',
            value: null,
          },
          {
            name: 'theme_specification_id',
            value: null,
          },
          {
            name: 'dream_description',
            value: '',
          },
        ]);
      }
      if (wish.id === SURPRISE_TYPE) {
        catalogueS.request.getDreamCategories.request().then((res) => {
          const categories = res?.data
            ? res.data.filter((category) => category.type === SURPRISE_TYPE)
            : [];

          if (categories.length) {
            form.setFieldValue('dream_category_id', categories[0].value);
          }
        });
      }
      setSelectedWish(wish);
    },
    [catalogueS.request.getDreamCategories, selectedWish?.id, selectedDreamer?.id],
  );

  return (
    <>
      <FormBlock
      id={'is_dream'}
        title='Желание мечтателя'
        hints={
          !selectedWish && (
            <Hint
              title='Выберите тип подарка'
              description='Чтобы продолжить, надо выбрать категорию подарка для мечтателя.'
            />
          )
        }
      >
        <Form.Item name={'wish_type'}>
          <div className={css.wishList}>
            {WishList(errors).map((wish) => (
              <WishCard
                onClick={() => handleWishChange(wish)}
                selected={wish.id === selectedWish?.id}
                key={wish.id}
                disabled={selectedDreamer?.is_approved_moderation}
                {...wish.card}
              />
            ))}
          </div>
        </Form.Item>
      </FormBlock>
      {selectedWish && (
        <>
          <Space direction={'vertical'} size={8}>
            {selectedWish.content}
            {breakpoints.md && <FormBlock>{nextBlock}</FormBlock>}
          </Space>
        </>
      )}
    </>
  );
};
