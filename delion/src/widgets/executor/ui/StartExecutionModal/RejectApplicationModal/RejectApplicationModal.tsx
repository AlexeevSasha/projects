import { useCallback, useEffect, useState } from 'react';
import { Form, Grid, Modal, Space, Typography } from 'antd';
import cx from 'classnames';
import { RejectApplicationReason } from '@entities/application';
import { Button, Paragraph, Select, TextArea } from '@shared/ui';
import { RejectApplicationFormConfig } from './const/rejectApplicationFormConfig';
import css from './RejectApplicationModal.module.scss';

const { Title } = Typography;

const { reason, comment } = RejectApplicationFormConfig;

type RejectApplicationModalProps = {
  isOpened: boolean;
  onConfirm(values: { reason: RejectApplicationReason; comment?: string }): void;
  onCancel(): void;
};

export const RejectApplicationModal = (props: RejectApplicationModalProps) => {
  const [form] = Form.useForm();
  const [isCommentFieldRequired, setCommentFieldRequired] = useState(false);
  const [isSubmittable, setSubmittable] = useState(false);
  const breakpoints = Grid.useBreakpoint();

  const values = Form.useWatch([], form);

  const { isOpened, onCancel, onConfirm } = props;

  const handleSelect = useCallback((value: RejectApplicationReason) => {
    if (value === RejectApplicationReason.OTHER) {
      setCommentFieldRequired(true);
    } else {
      setCommentFieldRequired(false);
    }
  }, []);

  useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  return (
    <Modal
      open={isOpened}
      centered={!breakpoints.xs}
      title={<Title level={5}>Отказаться от заявки</Title>}
      onCancel={onCancel}
      footer={null}
      className={cx(css.modal, { [css.is_fixed]: breakpoints.xs })}
    >
      <Space direction='vertical' size={24}>
        <Paragraph>
          Вы уверены? Если вы откажетесь от трех заявок, вы потеряете возможность добавлять заявки
        </Paragraph>
        <Space
          styles={{ item: { width: '100%' } }}
          style={{ flexDirection: breakpoints.xs ? 'column-reverse' : 'row' }}
        >
          <Form onFinish={onConfirm} form={form}>
            <Space direction='vertical' size={12}>
              <Form.Item name={reason.name} rules={reason.rules}>
                <Select
                  allowClear
                  options={reason.options}
                  placeholder={reason.placeholder}
                  onSelect={handleSelect}
                />
              </Form.Item>
              <Form.Item name={comment.name} rules={[{ required: isCommentFieldRequired }]}>
                <TextArea rows={comment.rows} placeholder={comment.placeholder} />
              </Form.Item>
              <Space styles={{ item: { width: '100%' } }}>
                <Button block onClick={onCancel}>
                  Отменить
                </Button>
                <Button block type='primary' danger htmlType='submit' disabled={!isSubmittable}>
                  Отказаться
                </Button>
              </Space>
            </Space>
          </Form>
        </Space>
      </Space>
    </Modal>
  );
};
