import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Divider, Modal } from 'antd';
import { observer } from 'mobx-react';
import type { TrusteeFeedback } from '@entities/application';
import { TrusteeFeedbackForm } from '@features/application/trustee';
import { messageSuccess, useStores } from '@shared/lib';

interface IProps {
  button: ReactNode;
}

export const ApplicationFeedbackModal = observer(({ button }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trusteeS, userS } = useStores();

  const onSubmit = useCallback(
    (values: TrusteeFeedback) => {
      if (!userS.user?.dream_application_id) {
        return messageSuccess('ID заявки отсутствует');
      }
      trusteeS.feedback(userS.user?.dream_application_id, values).then((res) => {
        res && setIsModalOpen(false);
      });
    },
    [userS.user?.dream_application_id],
  );

  const onCancel = useCallback(() => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: 'Отменить отправку отзыва',
      content: (
        <>
          Вы уверены что хотите отменить? <br />
          Вы потеряете весь текст, который добавили в отзыв
        </>
      ),
      cancelText: 'Не отменять',
      okText: 'Отменить отправку',
      cancelButtonProps: { size: 'large' },
      okButtonProps: { size: 'large' },
      maskClosable: true,
      onOk() {
        setIsModalOpen(false);
      },
    });
  }, []);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>{button}</div>
      <Modal
        destroyOnClose
        width={1000}
        centered
        title='Отзыв'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Divider />
        <TrusteeFeedbackForm onSubmit={onSubmit} onCancel={onCancel} />
      </Modal>
    </>
  );
});
