import { EditOutlined } from '@ant-design/icons';
import type { Application } from '@entities/application';
import { DreamerHints, DreamerInfo } from '@features/dreamer';
import { APP_ROUTES } from '@shared/const';
import { Button } from '@shared/ui';

interface DreamerContactsCardProps
  extends Pick<Application, 'agent_phone' | 'agent_email' | 'settlement'> {
  isEdit?: boolean;
}

export const DreamerContactsCard = (props: DreamerContactsCardProps) => {
  return (
    <>
      <DreamerInfo
        info={[
          {
            name: 'Номер телефона',
            description: props.agent_phone,
          },
          {
            name: 'Email',
            description: props.agent_email,
            color: 'blue',
          },
          !props.isEdit
            ? {
                description: (
                  <Button
                    href={APP_ROUTES.PROFILE_SETTINGS.toString()}
                    style={{ marginTop: 16 }}
                    icon={<EditOutlined />}
                  >
                    Изменить контактные данные
                  </Button>
                ),
              }
            : null,
        ]}
        divider
      />
      <DreamerInfo
        title={'Адрес проживания'}
        info={[
          {
            description: props.settlement,
          },
        ]}
        hint={<DreamerHints text={'Регион — очень важная информация!'} />}
      />
    </>
  );
};
