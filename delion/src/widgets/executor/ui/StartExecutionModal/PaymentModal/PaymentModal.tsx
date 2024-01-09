import { Divider, Grid, List, Modal, Typography } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { useCloudPayments } from '@features/payment';
import { useStores } from '@shared/lib';
import { BackButton, Button, Paragraph, Tag } from '@shared/ui';
import css from './PaymentModal.module.scss';

const { Title } = Typography;

type PaymentModalProps = {
  isOpened: boolean;
  onBack(): void;
  onCancel(): void;
};

export const PaymentModal = observer((props: PaymentModalProps) => {
  const { applicationS } = useStores();
  const breakpoints = Grid.useBreakpoint();
  const { isOpened, onCancel, onBack } = props;
  const { onCloudPay } = useCloudPayments(onCancel);

  return (
    <Modal
      title={
        <div className={css.modalHeader}>
          <BackButton onBack={onBack} />
          <Title level={5} className={css.modalTitle}>
            Стоимость исполнения
          </Title>
        </div>
      }
      open={isOpened}
      centered={!breakpoints.xs}
      onCancel={onCancel}
      footer={() => (
        <Button fullWidth type='primary' onClick={onCloudPay}>
          {`Оплатить ${applicationS.application.formattedTotalPriceAmount}`}
        </Button>
      )}
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
    >
      <List itemLayout='horizontal' split={false}>
        <List.Item
          extra={<Tag title={applicationS.application?.formattedPrice?.price_without_tax} />}
        >
          <Paragraph level={4}>Стоимость подарков</Paragraph>
        </List.Item>
        <Divider style={{ margin: 0 }} />
        <List.Item extra={<Tag title={applicationS.application?.formattedPrice?.transport_tax} />}>
          <Paragraph level={5}>Транспортные расходы</Paragraph>
        </List.Item>
        <List.Item
          extra={<Tag title={applicationS.application?.formattedPrice?.organization_tax} />}
        >
          <Paragraph level={5}>Комиссии партнеров</Paragraph>
        </List.Item>
        <Divider style={{ margin: '12px 0 24px' }} />
      </List>
    </Modal>
  );
});
