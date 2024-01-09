import {useCallback} from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Grid, Modal, Space } from 'antd';
import { observer } from 'mobx-react';
import {useStores} from "@shared/lib";
import {Button, Paragraph} from '@shared/ui';
import css from './PaymentCancelModal.module.scss';

type Props = {
  isOpened: boolean;
  onCancel(): void;
};

export const PaymentCancelModal = observer(({ isOpened, onCancel }: Props) => {
  const {  executorS } = useStores();
  const breakpoints = Grid.useBreakpoint();


  const onReturnPay = useCallback(async () => {
   const response  =  await executorS.cancelPayment();
   response && onCancel();
  }, [])

  return (
    <Modal closeIcon={false} open={isOpened} centered={!breakpoints.xs} onCancel={onCancel} footer={null}>
      <div className={css.container}>
        <ExclamationCircleOutlined className={css.container__icon} />
        <Space direction={'vertical'}>
          <Paragraph strong level={4}>Вернуть оплату</Paragraph>
          <Paragraph>Вы уверены? Вы не сможете исполнить эту заявку если вернете деньги сейчас</Paragraph>
          <Space className={css.buttons} align={'center'}>
            <Button fullWidth type='default' onClick={onCancel}>
              Отменить
            </Button>
            <Button fullWidth danger type='primary' onClick={onReturnPay}>
              Вернуть оплату
            </Button>
          </Space>
        </Space>
      </div>
    </Modal>
  );
});


