import { Divider, Grid, Modal, Space } from 'antd';
import cx from 'classnames';
import { Button, DisclaimerMessage, Paragraph } from '@shared/ui';
import css from './ReminderSelfExecuteModal.module.scss';

export type ReminderSelfExecuteModalProps = {
  isOpened: boolean;
  isReminderWithoutActions: boolean;
  onConfirmOrganizationExecution(): void;
  onConfirmSelfExecution(): void;
  onCancel(): void;
};

export const ReminderSelfExecuteModal = (props: ReminderSelfExecuteModalProps) => {
  const breakpoints = Grid.useBreakpoint();

  const {
    isOpened,
    isReminderWithoutActions,
    onCancel,
    onConfirmOrganizationExecution,
    onConfirmSelfExecution,
  } = props;

  const actions = isReminderWithoutActions ? (
    <Button type='primary' fullWidth onClick={onCancel}>
      Понятно
    </Button>
  ) : (
    <>
      <Button type='primary' fullWidth onClick={onConfirmSelfExecution}>
        Приступить к исполнению
      </Button>
      <Button type='default' fullWidth onClick={onConfirmOrganizationExecution}>
        Исполнить через организаторов
      </Button>
    </>
  );

  return (
    <Modal
      title='Информация для вас'
      open={isOpened}
      width={breakpoints.xs ? '100%' : 416}
      onCancel={onCancel}
      footer={() => (
        <Space direction='vertical' size={12}>
          {actions}
        </Space>
      )}
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
    >
      <Divider />
      <Space direction='vertical' align='center' size={24}>
        <Paragraph level={4} style={{ display: 'inline-block', textAlign: 'center' }}>
          Свяжитесь с контактным лицом и уточните все, что нужно знать о выполнении желания. После
          этого можете приступать к выполнению
        </Paragraph>
        <DisclaimerMessage
          className={css.disclaimer}
          color='primary'
          disclaimer='Будьте внимательны! В заявке может быть сразу несколько мечтателей. Вы должны исполнить желания всех, либо отказаться от заявки'
        />
      </Space>
      <Divider />
    </Modal>
  );
};
