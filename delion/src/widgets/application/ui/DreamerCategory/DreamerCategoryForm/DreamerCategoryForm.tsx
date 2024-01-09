import type { FC } from 'react';
import { Form, Input, type FormInstance, DatePicker, Space, Flex } from 'antd';
import dayjs from 'dayjs';
import { FormBlock, ModerationErrorHint } from '@entities/application';
import type { DreamerCategoryOption } from '@entities/catalogue';
import { DadataAutoComplete } from '@features/dadata';
import { RULE_FIO, RULE_REQUIRED } from '@shared/const/rules';
import { useStores } from '@shared/lib';
import { DragAndDrop, MaskedInput, Paragraph, PopupHint } from '@shared/ui';
import { getDreamerCategoryHint } from '@widgets/application';
import css from './DreamerCategoryForm.module.scss';

interface Props {
  category: DreamerCategoryOption | undefined;
  form: FormInstance;
  errors?: Option[];
}

export const DreamerCategoryForm: FC<Props> = ({ category, form, errors }) => {
  const { applicationS } = useStores();

  if (!category) return <></>;

  if (category.combatant_related) {
    return (
      <FormBlock
        errors={errors}
        title='Данные о родителе'
        description='Укажите данные родителя, который находится в непосредственном контакте с ребенком'
      >
        <Form.Item
          rules={[RULE_FIO, RULE_REQUIRED]}
          label={'ФИО'}
          name={'parent_fio'}
          id='parent_fio'
        >
          <Input placeholder='Иванов Сергей Дмитриевич' />
        </Form.Item>
        <Form.Item
          rules={[RULE_REQUIRED]}
          id='parent_birth_date'
          label='Дата рождения'
          name={'parent_birth_date'}
        >
          <DatePicker
            disabledDate={(now) => now > dayjs()}
            placeholder='Выберите дату'
            style={{ width: '100%' }}
            format={'DD.MM.YYYY'}
            inputReadOnly
          />
        </Form.Item>
        <DadataAutoComplete
          label={'Населенный пункт проживания родителя'}
          name='parent_settlement'
          form={form}
          placeholder='Ставрополь'
          to_bound={'settlement'}
          from_bound={'city'}
          defaultValue={applicationS.selectedDreamer?.parent_settlement}
          required
        />
        <DadataAutoComplete
          label={'Адрес регистрации родителя'}
          name='parent_address'
          form={form}
          placeholder='Город, улица, дом, квартира'
          to_bound={'house-flat'}
          from_bound={'city'}
          defaultValue={applicationS.selectedDreamer?.parent_address}
          required
        />
        <Form.Item label='СНИЛС родителя'>
          <Form.Item
            id='parent_snils_number'
            name={'parent_snils_number'}
            style={{ flex: 1 }}
            rules={[RULE_REQUIRED]}
          >
            <MaskedInput
              mask={'000-000-000 00'}
              pattern={/^\d{3}-\d{3}-\d{3} \d{2}$/}
              placeholder='000-000-000 00'
            />
          </Form.Item>
        </Form.Item>
      </FormBlock>
    );
  }

  return (
    <FormBlock errors={errors}>
      <Form.Item>
        <Space direction={'vertical'} size={16}>
          <Space direction={'vertical'} size={8}>
            <Flex justify={'space-between'}>
              <Paragraph level={4}>Документ</Paragraph>
              <PopupHint
                title=' '
                body={
                  <Flex vertical gap={12}>
                    {getDreamerCategoryHint(category.value)}
                  </Flex>
                }
              />
            </Flex>
            <Paragraph type={'secondary'}>
              Выберите или перетащите подтверждающий документ в ячейк
              {category.two_side_doc ? 'и' : 'у'} ниже
            </Paragraph>
          </Space>
          <div className={css.docBlock}>
            <DragAndDrop
              uploadName='document_front_file'
              name={'document_front_file_id'}
              form={form}
              label={category.two_side_doc ? 'Лицевая сторона' : undefined}
            />
            <ModerationErrorHint errors={errors} />
            {category.two_side_doc && (
              <DragAndDrop
                uploadName='document_back_file'
                name={'document_back_file_id'}
                form={form}
                label={'Оборотная сторона'}
              />
            )}
          </div>
        </Space>
      </Form.Item>
    </FormBlock>
  );
};
