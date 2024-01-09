import { useEffect } from 'react';
import { Divider, Form, Grid, Space } from 'antd';
import type { Feedback } from '@entities/application/model/application';
import { Button, TextArea } from '@shared/ui';
import { feedbackFormConfig } from '../../const/feedbackFormConfig';
import type { LeaveFeedbackParams } from '../../model/executor';

type ApplicationFeedbackFormProps = {
  onCancel(): void;
  onConfirm(values: Omit<LeaveFeedbackParams, 'id'>): void;
  initialValue?: Feedback;
};

const maxTextLength = 1000;

export const ApplicationFeedbackForm = (props: ApplicationFeedbackFormProps) => {
  const { onCancel, onConfirm, initialValue } = props;
  const breakpoints = Grid.useBreakpoint();
  const [form] = Form.useForm();

  useEffect(() => {
    initialValue && form.setFieldsValue(initialValue);
  }, [initialValue]);

  return (
    <Form form={form} onFinish={onConfirm} layout='vertical' scrollToFirstError labelAlign='left'>
      <Form.Item
        rules={[{ required: true }]}
        name={'difficulties'}
        labelAlign='right'
        label={feedbackFormConfig.difficulties.label}
      >
        <TextArea maxLength={maxTextLength} placeholder='Опишите трудности подробно' rows={5} />
      </Form.Item>
      <Form.Item name={'independent_text'} label={feedbackFormConfig.independent_text.label}>
        <TextArea maxLength={maxTextLength} placeholder='Опишите трудности подробно' rows={3} />
      </Form.Item>
      <Form.Item name={'organization_text'} label={feedbackFormConfig.organization_text.label}>
        <TextArea maxLength={maxTextLength} placeholder='Опишите трудности' rows={3} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        name={'site_proposal'}
        label={feedbackFormConfig.site_proposal.label}
      >
        <TextArea maxLength={maxTextLength} placeholder='Опишите тут' rows={3} />
      </Form.Item>
      <Form.Item
        name={'promotion_proposal'}
        label={feedbackFormConfig.promotion_proposal.label}
        rules={[{ required: true }]}
      >
        <TextArea maxLength={maxTextLength} placeholder='Опишите тут' rows={3} />
      </Form.Item>
      <Form.Item name={'questions'} label={feedbackFormConfig.questions.label}>
        <TextArea maxLength={maxTextLength} placeholder='Опишите тут' rows={3} />
      </Form.Item>
      <Divider />
      <Space styles={{ item: { width: breakpoints.lg ? 'initial' : '100%' } }}>
        <Button onClick={onCancel} block>
          Отменить
        </Button>
        <Button type='primary' htmlType='submit' block>
          Отправить
        </Button>
      </Space>
    </Form>
  );
};
