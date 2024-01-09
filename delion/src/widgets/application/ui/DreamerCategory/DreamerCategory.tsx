import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Form, Grid, Select } from 'antd';
import type { ModerationError } from '@entities/application';
import { FormBlock } from '@entities/application';
import type { DreamerCategoryOption } from '@entities/catalogue';
import { useStores } from '@shared/lib';
import { Divider, Hint } from '@shared/ui';
import { getDreamerCategoryHint } from '@widgets/application';
import { DreamerCategoryForm } from './DreamerCategoryForm/DreamerCategoryForm';

interface Props {
  form: FormInstance;
  errors?: ModerationError;
}

export const DreamerCategory: FC<Props> = ({ form, errors }) => {
  const { catalogueS, applicationS } = useStores();
  const [categories, setCategories] = useState<DreamerCategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DreamerCategoryOption>();
  const breakpoint = Grid.useBreakpoint();

  useEffect(() => {
    catalogueS.request.getDreamerCategories.request().then((res) => {
      if (!res?.data?.length) return setCategories([]);

      if (applicationS.application.is_new_region) {
        const newRegionCategories = res.data.filter((category) => category.from_donbass);

        if (newRegionCategories.length) {
          form.setFieldValue('category_id', newRegionCategories[0].value);
          setSelectedCategory(newRegionCategories[0]);
        }

        return setCategories(newRegionCategories);
      }

      setCategories(res.data.filter((category) => !category.from_donbass));
    });
  }, []);

  useEffect(() => {
    setSelectedCategory(applicationS.selectedDreamer?.category);
  }, [applicationS.selectedDreamer?.category]);

  const handleSelectChange = (_: DreamerCategoryOption['value'], option: DreamerCategoryOption) => {
    setSelectedCategory(option);
  };

  return (
    <>
      <FormBlock
        id='is_dreamer_category'
        title='Категория мечтателя'
        description='Укажите категорию мечтателя и прикрепите подтверждающие документы'
        hints={getDreamerCategoryHint(selectedCategory?.value)}
      >
        <Form.Item name={'category_id'}>
          <Select
            placeholder='Выберите категорию'
            options={categories}
            onSelect={handleSelectChange}
          />
        </Form.Item>
        {!breakpoint.md && !selectedCategory?.value && (
          <Hint
            key={'default-hint'}
            title={'Выберите категорию'}
            description={'Чтобы приложить документы надо сначала выбрать категорию мечтателя'}
          />
        )}
        {!!selectedCategory && <Divider marginBottom={12} />}
      </FormBlock>
      <DreamerCategoryForm
        category={selectedCategory}
        form={form}
        errors={errors?.document_front_file}
      />
    </>
  );
};
