import { Divider, Form, Space, Input } from 'antd';
import { observer } from 'mobx-react';
import { EMAIL_VALIDATION_REGEXP } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, FileUpload, Paragraph, Select, TextArea } from '@shared/ui';
import type { FeedbackFormValues } from '../model/feedback-form';
import css from './FeedbackForm.module.scss';

type ApplicationFeedbackFormProps = {
  onCancel(): void;
  onConfirm(values: FeedbackFormValues): void;
};

export const FeedbackForm = observer((props: ApplicationFeedbackFormProps) => {
  const { catalogueS } = useStores();
  const { onCancel, onConfirm } = props;
  const [form] = Form.useForm();

  return (
    <Form onFinish={onConfirm} form={form} layout='vertical' scrollToFirstError labelAlign='left'>
      <Form.Item
        rules={[{ required: true }]}
        name={'category'}
        labelAlign='right'
        label='Категория проблемы'
      >
        <Select
          showSearch
          placeholder='Выберите категорию'
          options={catalogueS?.feedbackCategories ?? []}
          filterOption={(input, option) => ((option?.label as string) ?? '').includes(input)}
        />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name={'title'} label='Заголовок'>
        <Input placeholder='Ссылка' maxLength={100} />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name={'text'} label='Опишите вашу проблему'>
        <TextArea
          maxLength={1000}
          placeholder='Опишите свою проблему подробно. В том числе как воспроизвести эту проблему, на каком устройстве и в каком браузере она проявляется'
          rows={5}
        />
      </Form.Item>
      <Form.Item
        label='Почта для связи'
        rules={[
          { required: true },
          { pattern: EMAIL_VALIDATION_REGEXP, message: 'Введите корректный email' },
        ]}
        name='email'
      >
        <Input placeholder='Ваша почта' />
      </Form.Item>
      <FileUpload
        form={form}
        maxCount={5}
        formItemProps={{
          label: 'Загрузите фото или скриншот (необязательно)',
          name: 'files',
          help: (
            <Paragraph level={6} className={css.helpText}>
              Файлы JPG, JPEG, PNG, PDF, SVG, DOC, DOCX размером не более 10 МБ
            </Paragraph>
          ),
        }}
        defaultFileList={[]}
      />

      <Divider />
      <Space size={16} styles={{ item: { width: '100%' } }}>
        <Button onClick={onCancel} block>
          Отменить
        </Button>
        <Button type='primary' htmlType='submit' block>
          Отправить
        </Button>
      </Space>
    </Form>
  );
});
