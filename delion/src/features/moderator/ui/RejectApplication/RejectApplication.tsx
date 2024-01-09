import { useState } from 'react';
import { Divider, Input, Modal, Space } from 'antd';
import { DrawerCloseIcon } from '@shared/assets/icons/CloseIcon';
import { Button, Paragraph } from '@shared/ui';
import css from './RejectApplication.module.scss';

interface IProps {
  onReject: (reason: string) => Promise<void>;
}

export const RejectApplication = ({ onReject }: IProps) => {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  //actions modal
  const onOpen = () => setVisible(true);
  const onCancel = () => {
    setLoading(false);
    setVisible(false);
    setReason('');
  };

  const onFinish = async () => {
    setLoading(true);
    await onReject(reason);
    onCancel();
  };

  return (
    <>
      <Button onClick={onOpen} fullWidth danger>
        Отказаться
      </Button>
      <Modal
        footer={null}
        closeIcon={false}
        className={css.modal}
        centered
        open={visible}
        onCancel={onCancel}
        destroyOnClose
      >
        <div>
          <Space className={css.modal__header}>
            <Paragraph level={4} strong>
              Отказаться
            </Paragraph>
            <div onClick={onCancel} className={css.modal__close}>
              <DrawerCloseIcon />
            </div>
          </Space>
          <Space className={css.modal__content} direction={'vertical'}>
            <Paragraph>Причина</Paragraph>
            <Input.TextArea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              autoSize={{ minRows: 3 }}
              maxLength={250}
              placeholder={'Укажите причину отказа'}
            />
          </Space>
          <Divider />
          <Space className={css.modal__footer} size={'middle'}>
            <Button
              rootClassName={css.modal__button__cancel}
              type={'default'}
              onClick={onCancel}
              fullWidth
            >
              Отменить
            </Button>
            <Button
              loading={loading}
              disabled={!reason.trim()}
              rootClassName={css.modal__button__reject}
              type='primary'
              danger
              onClick={onFinish}
              fullWidth
            >
              Отказаться
            </Button>
          </Space>
        </div>
      </Modal>
    </>
  );
};
