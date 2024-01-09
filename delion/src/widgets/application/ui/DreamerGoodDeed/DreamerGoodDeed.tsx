import { useEffect, useState, type FC } from 'react';
import type { FormInstance } from 'antd';
import { Form, Input, Select } from 'antd';
import { useWatch } from 'rc-field-form';
import { FormBlock } from '@entities/application';
import { RULE_MAX_LENGTH, RULE_URL } from '@shared/const/rules';
import { useStores } from '@shared/lib';
import { StatusHint } from '@shared/ui';

interface Props {
  form: FormInstance;
}

export const DreamerGoodDeed: FC<Props> = ({ form }) => {
  const { catalogueS, applicationS } = useStores();
  const [goodDeeds, setGoodDeeds] = useState<Option[]>([]);
  const [noDeedValue, setNoDeedValue] = useState<Option['value']>();
  const [isNoDeed, setIsNoDeed] = useState(true);
  const deedCategory = useWatch('good_deed_category_id', form);

  useEffect(() => {
    catalogueS.request.getGoodDeedCategories.request().then((res) => {
      const deeds = res?.data || [];

      const noDeed = deeds.find((deed) => deed.label.includes('нет доброго'));
      setNoDeedValue(noDeed?.value);

      setGoodDeeds(deeds);
    });
  }, [catalogueS.request.getGoodDeedCategories]);

  useEffect(() => {
    setIsNoDeed(deedCategory === noDeedValue);
    if (deedCategory && deedCategory === noDeedValue) {
      form.resetFields(['good_deed_url', 'good_deed_description']);
    }
  }, [deedCategory, form, noDeedValue]);

  const disableField =
    isNoDeed || !deedCategory || applicationS.selectedDreamer?.is_approved_moderation;

  return (
    <FormBlock
      id={'is_good_deed'}
      title={'Доброе дело'}
      description={
        <span>
          Во время заявочной кампании мы предлагаем мечтателям по желанию совершить «доброе дело» и
          рассказать об этом в социальных сетях. <br />А мы поделимся об этом в наших официальных
          группах.
        </span>
      }
    >
      <Form.Item
        label='Категория доброго дела'
        id='good_deed_category_id'
        name={'good_deed_category_id'}
      >
        <Select options={goodDeeds} placeholder='Выберите категорию' />
      </Form.Item>
      <StatusHint text='Если Мечтатель не совершил «Доброе дело» укажите в категории доброго дела вариант «Нет доброго дела»' />
      <Form.Item
        id='good_deed_description'
        name={'good_deed_description'}
        label='Описание доброго дела'
        rules={[RULE_MAX_LENGTH(500)]}
      >
        <Input.TextArea placeholder='Опишите доброе дело' disabled={disableField} />
      </Form.Item>
      <Form.Item
        id='good_deed_url'
        name={'good_deed_url'}
        rules={[RULE_URL, RULE_MAX_LENGTH(500)]}
        label='Ссылка на публикацию доброго дела в социальных сетях'
      >
        <Input placeholder='Ссылка' disabled={disableField} />
      </Form.Item>
    </FormBlock>
  );
};
