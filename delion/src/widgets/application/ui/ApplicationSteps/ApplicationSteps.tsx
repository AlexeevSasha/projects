import type { FC } from 'react';
import { ProfileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Grid, Menu, Typography } from 'antd';
import type { ModerationError } from '@entities/application/model/application';
import type { Dreamer, DreamerSection } from '@entities/dreamer';
import { DreamerSteps, DreamerWarningModal } from '@features/dreamer';
import { useStores } from '@shared/lib';
import { StatusButton } from '@shared/ui';
import css from './ApplicationSteps.module.scss';

const { Title } = Typography;

type Props = {
  contact_status?: Status;
  onSectionClick: (section: DreamerSection | 'contacts') => void;
  onDreamerClick: (dreamer: Dreamer) => void;
  section: DreamerSection | 'contacts';
  errors?: ModerationError[];
  onDreamerAdd: () => void;
};

export const ApplicationSteps: FC<Props> = ({
  contact_status = 'default',
  onSectionClick,
  section,
  onDreamerClick,
  onDreamerAdd,
  errors = [],
}) => {
  const { applicationS } = useStores();
  const breakpoint = Grid.useBreakpoint();

  const getDreamerError = (dreamer: Dreamer) => {
    return errors.find((error) => error.dreamer_id === dreamer.id);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: '#000',
          },
        },
      }}
    >
      <div className={css.container}>
        <Title level={breakpoint.md ? 2 : 5} className={css.container__title}>
          Заполните информацию
        </Title>
        <StatusButton
          status={contact_status}
          onClick={() => {
            onSectionClick('contacts');
          }}
          icon={<ProfileOutlined />}
        >
          Контакты
        </StatusButton>
        <Divider />
        {!!applicationS.application.dreamers.length && (
          <Menu
            disabled={contact_status === 'default'}
            mode='inline'
            openKeys={
              applicationS.selectedDreamer?.id ? [applicationS.selectedDreamer.id.toString()] : []
            }
            selectedKeys={
              applicationS.selectedDreamer?.id
                ? [`${section}-${applicationS.selectedDreamer?.id}`]
                : []
            }
            className={css.container__menu}
          >
            {applicationS.application.dreamers.map((dreamer, index) => (
              <DreamerSteps
                errors={getDreamerError(dreamer)}
                onSectionClick={onSectionClick}
                onDreamerClick={() => {
                  onDreamerClick(dreamer);
                }}
                dreamer={dreamer}
                title={
                  dreamer.first_name || dreamer.last_name
                    ? `${dreamer.first_name} ${dreamer.last_name}`
                    : `Новый мечтатель ${index + 1}`
                }
                key={dreamer.id}
              />
            ))}
          </Menu>
        )}
        <Button onClick={onDreamerAdd} disabled={contact_status === 'default'} block>
          + Новый мечтатель
        </Button>
      </div>
      <DreamerWarningModal />
    </ConfigProvider>
  );
};
