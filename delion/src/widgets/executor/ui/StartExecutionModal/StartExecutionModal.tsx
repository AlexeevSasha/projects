import { Divider, Grid, List, Modal, Space, Typography } from 'antd';
import cx from 'classnames';
import { observer } from 'mobx-react';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import css from './StartExecutionModal.module.scss';

const { Title } = Typography;

export type StartExecutionModalProps = {
  isOpened: boolean;
  onInitOrgExecution(): void;
  onInitSelfExecution(): void;
  onCancel(): void;
};

const listDataSource = [
  { title: 'Вы оплачиваете подарок', step: 1 },
  { title: 'Мы закупим подарок, проверим на соответствие и упакуем', step: 2 },
  { title: 'Партнеры по доставке отправят подарок в новые субъекты РФ', step: 3 },
  { title: 'Волонтеры принесут подарок мечтателю', step: 4 },
  { title: 'Мы предоставим вам все необходимые отчеты о получении подарка', step: 5 },
];

export const StartExecutionModal = observer((props: StartExecutionModalProps) => {
  const { applicationS } = useStores();
  const breakpoints = Grid.useBreakpoint();

  const { isOpened, onCancel, onInitSelfExecution, onInitOrgExecution } = props;

  return (
    <Modal
      open={isOpened}
      onCancel={onCancel}
      centered={!breakpoints.xs}
      title={
        <Title level={5} style={{ margin: 0 }}>
          Исполнение через организаторов
        </Title>
      }
      width={breakpoints.xs ? '100%' : 416}
      className={cx(css.modal, { [css.isMobile]: breakpoints.xs })}
      footer={() => (
        <Space direction='vertical' size={12}>
          <Button type='primary' fullWidth onClick={onInitOrgExecution}>
            Продолжить
          </Button>
          {applicationS.application.is_changing_execution_type ? (
            <Button type='default' fullWidth onClick={onInitSelfExecution}>
              Я сам выполню это желание
            </Button>
          ) : null}
        </Space>
      )}
    >
      <Space direction='vertical' className={css.content}>
        <Paragraph level={4}>
          Эту заявку можно выполнить через организаторов «Ёлки желаний»
        </Paragraph>
        <List
          dataSource={listDataSource}
          split={false}
          renderItem={(item) => (
            <List.Item>
              <Space align='center' size={8}>
                <div className={css.step}>
                  <Paragraph>{item.step}</Paragraph>
                </div>
                {item.title}
              </Space>
            </List.Item>
          )}
        />
        <Divider />
      </Space>
    </Modal>
  );
});
