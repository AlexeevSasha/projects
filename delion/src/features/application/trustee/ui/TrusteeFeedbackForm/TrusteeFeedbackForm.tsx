import { useEffect, useState } from 'react';
import { Divider, Form, Space, Radio } from 'antd';
import type { TrusteeFeedback } from '@entities/application';
import { Button, TextArea } from '@shared/ui';
import css from './TrusteeFeedbackForm.module.scss';

const feedbackMarkOptions = [
  { label: 'Да, полностью доволен', value: 1 },
  { label: 'Частично доволен', value: 2 },
  { label: 'Совершенно не доволен', value: 3 },
  { label: 'Желание не было исполнено', value: 4 },
];

interface FeedbackFormProps {
  onSubmit: (values: TrusteeFeedback) => void;
  onCancel: () => void;
}

export const TrusteeFeedbackForm = ({ onSubmit, onCancel }: FeedbackFormProps) => {
  const [form] = Form.useForm<TrusteeFeedback>();
  const [disabled, setDisabled] = useState(true);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setDisabled(false),
      () => setDisabled(true),
    );
  }, [values]);

  return (
    <Form onFinish={onSubmit} form={form} layout='vertical' scrollToFirstError>
      <Form.Item
        rules={[{ required: true }]}
        name={'difficulties'}
        label={
          'Если вы испытывали трудности при регистрации и подаче заявки на сайте, опишите какие??'
        }
      >
        <TextArea maxLength={1000} placeholder='Опишите трудности подробно' rows={5} />
      </Form.Item>
      <Form.Item
        label={'Довольны ли вы тем, как исполнили желание, которое вы указали в заявке?'}
        rules={[{ required: true }]}
        name={'mark'}
      >
        <Radio.Group className={css.radio} options={feedbackMarkOptions} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name={'review'}
        label={'Оставьте короткий отзыв об акции и свои пожелания, при их наличии'}
      >
        <TextArea maxLength={1000} placeholder='Отзыв об акции' rows={5} />
      </Form.Item>
      <Divider />
      <Space size={16}>
        <Button onClick={onCancel}>Отменить</Button>
        <Button disabled={disabled} type='primary' htmlType='submit'>
          Отправить
        </Button>
      </Space>
    </Form>
  );
};
