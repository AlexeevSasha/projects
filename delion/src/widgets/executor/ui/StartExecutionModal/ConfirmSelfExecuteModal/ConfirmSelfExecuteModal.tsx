import { Grid, Modal, Space } from 'antd';
import cx from 'classnames';
import { Button, Paragraph } from '@shared/ui';
import css from './ConfirmSelfExecuteModal.module.scss';

export type ConfirmSelfExecuteModalProps = {
  isOpened: boolean;
  onConfirm(): void;
  onCancel(): void;
};

export const ConfirmSelfExecuteModal = (props: ConfirmSelfExecuteModalProps) => {
  const breakpoints = Grid.useBreakpoint();

  const { isOpened, onCancel, onConfirm } = props;

  return (
    <Modal
      title='Исполнить самому'
      open={isOpened}
      centered={!breakpoints.xs}
      width={breakpoints.xs ? '100%' : 400}
      className={cx({ [css.isMobile]: breakpoints.xs })}
      onCancel={onCancel}
      footer={
        <Space
          style={{ flexDirection: breakpoints.xs ? 'column-reverse' : 'row' }}
          styles={{ item: { width: '100%' } }}
          direction={breakpoints.xs ? 'vertical' : 'horizontal'}
          size={12}
        >
          <Button fullWidth type='default' onClick={onCancel}>
            Отменить
          </Button>
          <Button fullWidth type='primary' onClick={onConfirm}>
            Исполнить самому
          </Button>
        </Space>
      }
    >
      <Space>
        <Paragraph>
          Вы уверены? В новом регионе очень сложно будет организовать доставку и вручение подарка.
          Может, лучше доверить это организаторам акции?
        </Paragraph>
      </Space>
    </Modal>
  );
};
