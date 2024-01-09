import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UploadFile } from 'antd';
import { Button, Divider, Form, Grid, Modal, Space, Typography } from 'antd';
import cx from 'classnames';
import type { Dreamer } from '@entities/dreamer';
import type { UploadReportParams } from '@features/application/executor/model/executor';
import { FileUpload, Paragraph, TextArea } from '@shared/ui';
import type { FileUploadProps } from '@shared/ui/Inputs/FileUpload/FileUpload';
import css from './AttachReportModal.module.scss';

const { Title } = Typography;

const executorCommentFieldLabel = 'Поделитесь коротким комментарием об исполненном желании:';

type AttachReportModalProps = {
  selectedDreamer?: Dreamer;
  isOpened: boolean;
  onSendReport(params: Omit<UploadReportParams, 'id'>): void;
  onCancel(): void;
};

export const AttachReportModal = (props: AttachReportModalProps) => {
  const [submittable, setSubmittable] = useState(false);
  const [form] = Form.useForm();
  const breakpoints = Grid.useBreakpoint();
  const { isOpened, selectedDreamer, onCancel } = props;

  const values = Form.useWatch([], form);

  const onFinish = useCallback(
    (values: {
      executor_report: {
        file: UploadFile<FileData>;
        fileList: UploadFile<FileData>[];
      };
      executor_comment: string;
    }) => {
      const reportIds = values.executor_report.fileList.map(
        (item) => item.response?.id,
      ) as number[];

      if (reportIds.length > 0) {
        props.onSendReport({ report_ids: reportIds, executor_comment: values.executor_comment });
      }
    },
    [props],
  );

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  const FileUploadField = useCallback(
    (props: Partial<FileUploadProps>) => {
      return (
        <FileUpload
          form={form}
          defaultFileList={selectedDreamer?.report ?? []}
          maxCount={5}
          formItemProps={{
            label: 'Прикрепите подтверждающее фото (максимум 5):',
            name: 'executor_report',
            rules: [{ required: true }],
          }}
          {...props}
        />
      );
    },
    [form, selectedDreamer],
  );

  const modalContent = useMemo(() => {
    if (selectedDreamer?.isDreamHasReportAttached) {
      return (
        <Space direction='vertical' size={16}>
          {selectedDreamer?.executor_comment && (
            <>
              <Paragraph className={css.previewLabel}>{executorCommentFieldLabel}</Paragraph>
              <Paragraph>{selectedDreamer?.executor_comment}</Paragraph>
            </>
          )}
          <Paragraph className={css.previewLabel}>Подтверждающее документы</Paragraph>
          <FileUploadField isPreview={true} formItemProps={{ label: null }} />

          <Divider />
          <Button type='primary' block onClick={onCancel}>
            Закрыть
          </Button>
        </Space>
      );
    } else {
      return (
        <Form onFinish={onFinish} form={form} layout='vertical'>
          <FileUploadField isPreview={false} />

          <Form.Item name={'executor_comment'} label={executorCommentFieldLabel}>
            <TextArea rows={3} placeholder='Оставьте комментарий' maxLength={1000} showCount />
          </Form.Item>

          <Space styles={{ item: { width: '100%' } }}>
            <Button type='primary' block htmlType='submit' disabled={!submittable}>
              Отправить
            </Button>
          </Space>
        </Form>
      );
    }
  }, [
    FileUploadField,
    form,
    onCancel,
    onFinish,
    selectedDreamer?.executor_comment,
    selectedDreamer?.isDreamHasReportAttached,
    submittable,
  ]);

  return (
    <Modal
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
      open={isOpened}
      title={
        <Title level={5}>
          {selectedDreamer?.isDreamHasReportAttached ? 'Отчет об исполнении' : 'Прикрепить отчёт'}
        </Title>
      }
      footer={null}
      onCancel={onCancel}
    >
      {modalContent}
    </Modal>
  );
};
