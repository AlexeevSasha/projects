import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Popover } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './ApplicationCancel.module.scss';

interface IProps {
  button: ReactNode;
  onCancel: () => Promise<void>;
  withoutPopover?: boolean;
}

export const ApplicationCancel = ({ button, onCancel, withoutPopover }: IProps) => {
  const [open, setOpen] = useState(false);

  const showConfirm = useCallback(() => {
    setOpen(false);
    Modal.confirm({
      wrapClassName: css.modal,
      icon: <ExclamationCircleOutlined />,
      title: 'Отменить заявку',
      content:
        'Вы уверены, что хотите отменить? \n' +
        'Заявка будет снята с участия в акции. Вы сможете отредактировать и заново подать эту заявку после отмены',
      cancelText: 'Не отменять',
      okText: 'Отменить заявку',
      cancelButtonProps: { size: 'large' },
      okButtonProps: { size: 'large' },
      maskClosable: true,
      onOk() {
        return new Promise((resolve, reject) => {
          onCancel().then(resolve, reject);
        });
      },
    });
  }, []);

  if (withoutPopover)
    return (
      <div onClick={showConfirm} className={css.button}>
        {button}
      </div>
    );

  return (
    <Popover
      open={open}
      onOpenChange={(v) => setOpen(v)}
      arrow={false}
      placement='bottomLeft'
      rootClassName={css.popover}
      content={
        <Paragraph onClick={showConfirm} className={css.popover__item}>
          Отменить заявку
        </Paragraph>
      }
      trigger='click'
    >
      <div className={css.button}>{button}</div>
    </Popover>
  );
};
