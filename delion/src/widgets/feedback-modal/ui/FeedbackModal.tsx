import { useEffect } from 'react';
import { Flex, Grid, Modal } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { FeedbackForm } from '@features/feedback-form';
import type { FeedbackFormValues } from '@features/feedback-form';
import { useStores } from '@shared/lib';
import css from './FeedbackModal.module.scss';

export type ApplicationFeedbackProps = {
  isOpened: boolean;
};

export const FeedbackModal = observer(({ isOpened }: ApplicationFeedbackProps) => {
  const { userS, catalogueS, modalS } = useStores();
  const breakpoints = Grid.useBreakpoint();

  const onClose = () => {
    modalS.closeFeedbackModal();
  };

  const onConfirm = (values: FeedbackFormValues) => {
    userS
      .sendFeedback({
        title: values?.title,
        text: values?.text,
        category: values?.category,
        file_ids: values?.files?.fileList?.map((file) => file.response.id),
        email: values?.email,
      })
      .then((isSuccessful) => {
        if (isSuccessful) {
          onClose();
        }
      });
  };

  useEffect(() => {
    if (!catalogueS?.feedbackCategories && isOpened) {
      catalogueS.getFeedbackCategories();
    }
  }, [catalogueS, isOpened]);

  return (
    <Modal
      centered={!breakpoints.xs}
      open={isOpened}
      onCancel={onClose}
      title='Обратная связь'
      footer={null}
      width={breakpoints.xs ? '100%' : 600}
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
      destroyOnClose
    >
      <Flex className={css.content} vertical gap={24}>
        {/*<DisclaimerMessage*/}
        {/*  color='primary'*/}
        {/*  className={css.disclaimer}*/}
        {/*  disclaimer={*/}
        {/*    <Flex align='center' gap={4} vertical={breakpoints.xs}>*/}
        {/*      Вы можете также связаться с нами по телефону*/}
        {/*      <a href='tel:+7 800 456-25-32'>+7 800 456-25-32</a>*/}
        {/*    </Flex>*/}
        {/*  }*/}
        {/*/>*/}
        <FeedbackForm onCancel={onClose} onConfirm={onConfirm} />
      </Flex>
    </Modal>
  );
});
