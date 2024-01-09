import { Form, Input } from 'antd';
import { FormBlock } from '@entities/application';

export const AddressForm = () => {
  return (
    <FormBlock
      title='Адрес проживания'
      description='Укажите фактический регион и населенный пункт проживания ребенка. Важно указать полное название города (села) на русском языке'
    >
      <Form.Item name={'locality'} label={'Населенный пункт'}>
        <Input placeholder='Ставрополь' />
      </Form.Item>
    </FormBlock>
  );
};
