import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { FormItemProps } from 'antd';
import { Flex, Form, Select } from 'antd';
import type { DreamCategory } from '@entities/catalogue/@x/dreamer';
import { useStores } from '@shared/lib';
import { PopupHint, StatusHint } from '@shared/ui';

interface Props extends FormItemProps {
  dreamCategoryId?: number;
  onChange: (category: DreamCategory) => void;
}

export const DreamSubcategorySelect: FC<Props> = ({ dreamCategoryId, onChange, ...props }) => {
  const { catalogueS } = useStores();
  const [categories, setCategories] = useState<DreamCategory[]>([]);
  const [subcategory, setSubcategory] = useState<DreamCategory>();

  useEffect(() => {
    catalogueS.request.getDreamCategories.request().then((res) => {
      const categories = res?.data
        ? res.data.filter((category) => category.type === dreamCategoryId)
        : [];

      setCategories(categories);
    });
  }, [catalogueS, dreamCategoryId]);

  return (
    <>
      <Flex justify={'space-between'} style={{ width: '100%' }}>
        <span style={{ width: '100%' }}>Подкатегория</span>
        {!!subcategory?.hint && (
          <PopupHint
            title={<StatusHint borderless key={'wish-subcategory-info'} title={subcategory.hint} />}
          />
        )}
      </Flex>
      <Form.Item {...props} id='dream_category_id' name={'dream_category_id'}>
        <Select
          placeholder={'Выберите подкатегорию'}
          options={categories}
          onChange={(_, option) => {
            if (Array.isArray(option)) return;

            onChange(option);
            setSubcategory(option);

            catalogueS.dreamCategory = option;
          }}
        />
      </Form.Item>
    </>
  );
};
