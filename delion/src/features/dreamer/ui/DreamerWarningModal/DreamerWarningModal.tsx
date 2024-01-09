import { useMemo, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Flex, Grid, Modal, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './DreamerWarningModal.module.scss';

export const DreamerWarningModal = observer(() => {
  const { trusteeS, applicationS } = useStores();
  const breakpoints = Grid.useBreakpoint();
  const [waitStatus, setWaitStatus] = useState(false);

  const handleDeleteDreamer = async () => {
    try {
      setWaitStatus(true);
      if (applicationS.deletingDreamer) await trusteeS.deleteDreamer(applicationS.deletingDreamer);
      setWaitStatus(false);
    } catch (error) {
      applicationS.setDeletingDreamer(undefined);
      setWaitStatus(false);
    }
  };

  const name = useMemo(() => {
    if (applicationS.deletingDreamer?.last_name && applicationS.deletingDreamer?.first_name) {
      return `${applicationS.deletingDreamer.first_name} ${applicationS.deletingDreamer.last_name}`;
    } else {
      return `${applicationS.deletingDreamer?.id}`;
    }
  }, [
    applicationS.deletingDreamer?.first_name,
    applicationS.deletingDreamer?.id,
    applicationS.deletingDreamer?.last_name,
  ]);

  return (
    <Modal
      className={css.modal}
      footer={null}
      closeIcon={false}
      centered
      open={!!applicationS.deletingDreamer}
      style={breakpoints.xs ? { maxWidth: '100%', padding: 20 } : { maxWidth: 400 }}
    >
      <Flex gap={16} align='flex-start' style={{ marginBottom: 24 }}>
        <InfoCircleOutlined style={{ fontSize: 24 }} className={css.icon} />
        <Flex vertical gap={8}>
          <Typography.Title level={5} style={{ margin: 0, fontSize: 16, lineHeight: '24px' }}>
            Удалить мечтателя
          </Typography.Title>
          <Paragraph level={5}>
            Вы уверены, что хотите удалить мечтателя <span className={css.dreamer}>{name}</span>? Вы
            не сможете восстановить сведения о мечтателе после удаления
          </Paragraph>
        </Flex>
      </Flex>
      <Flex
        gap={breakpoints.xs ? 12 : 16}
        style={breakpoints.xs ? { flexDirection: 'column-reverse' } : { marginLeft: 40 }}
      >
        <Button
          disabled={waitStatus}
          fullWidth={breakpoints.xs}
          type='default'
          onClick={() => applicationS.setDeletingDreamer(undefined)}
          style={{ borderRadius: 8 }}
        >
          Отменить
        </Button>
        <Button
          disabled={waitStatus}
          fullWidth
          type='primary'
          onClick={handleDeleteDreamer}
          style={{ borderRadius: 8 }}
        >
          Удалить
        </Button>
      </Flex>
    </Modal>
  );
});
