import { Form, Input } from 'antd';
import { FormBlock } from '@entities/application/@x/dreamer';
import { StatusHint } from '@shared/ui';

export const DreamerSurpriseWish = () => {
  return (
    <FormBlock>
      <Form.Item name={'dream_category_id'} style={{ display: 'none' }}>
        <Input style={{ display: 'none' }} />
      </Form.Item>
      <StatusHint text='В рамках акции можно не загадывать конкретное желание и выбрать категорию «Сюрприз».  При исполнении желания исполнители будут опираться на свои возможности и информацию о мечтателе.' />
    </FormBlock>
  );
};
