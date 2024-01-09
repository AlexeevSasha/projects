import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd';
import { Divider, Form, Space } from 'antd';
import type { TrusteeUploadReport } from '@features/application/trustee/model/trustee';
import { Button, FileUpload, Paragraph, TextArea } from '@shared/ui';
import css from './TrusteeReportForm.module.scss';

interface ReportForm {
  report_ids: {
    file: UploadFile<FileData>;
    fileList: UploadFile<FileData>[];
  };
  report_text: string;
}

interface TrusteeReportFormProps {
  onSubmit: (values: TrusteeUploadReport) => void;
  onCancel: () => void;
}

export const TrusteeReportForm = ({ onSubmit, onCancel }: TrusteeReportFormProps) => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm<ReportForm>();

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      (value) => setDisabled(!value.report_ids.fileList.length),
      () => setDisabled(true),
    );
  }, [values]);

  const onFinish = (values: ReportForm) => {
    const { report_text, report_ids } = values;
    const reportIds = report_ids.fileList.map((item) => item.response?.id) as number[];

    onSubmit({ report_text, report_ids: reportIds });
  };

  return (
    <Form form={form} onFinish={onFinish} layout={'vertical'} scrollToFirstError>
      <FileUpload
        form={form}
        defaultFileList={[]}
        maxCount={5}
        isPreview={false}
        acceptType={['.jpg', '.jpeg', '.png', '.pdf']}
        formItemProps={{
          label: 'Прикрепите подтверждающее фото (максимум 5):',
          name: 'report_ids',
          rules: [{ required: true }],
          help: (
            <Paragraph level={6} className={css.helpText}>
              Файлы JPG, PNG, PDF размером не более 5 МБ
            </Paragraph>
          ),
        }}
      />
      <Divider />
      <Form.Item
        rules={[{ required: true }]}
        name={'report_text'}
        label={'Поделитесь коротким комментарием об исполненном желании:'}
      >
        <TextArea maxLength={1000} placeholder='Короткий комментарий' rows={5} />
      </Form.Item>
      <Space size={16}>
        <Button onClick={onCancel}>Отменить</Button>
        <Button disabled={disabled} type='primary' htmlType='submit'>
          Отправить
        </Button>
      </Space>
    </Form>
  );
};
