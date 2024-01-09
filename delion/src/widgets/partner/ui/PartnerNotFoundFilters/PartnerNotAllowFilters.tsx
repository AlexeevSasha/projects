import { Typography } from 'antd';
import { Paragraph } from '@shared/ui';
import { ApplicationWelcomeMessage } from '@widgets/application';

export const PartnerNotAllowFilters = () => {
  const onSendApplicationButtonClick = () => {};

  return (
    <ApplicationWelcomeMessage
      message={
        <>
          <Typography.Title level={4}>Вы не можете брать новые заявки</Typography.Title>
          <Paragraph>
            Вы взяли, но ещё не исполнили максимальное количество заявок,
            <br /> если хотите взять ещё, исполните желание, которые взяли или <br />
            оставьте запрос
          </Paragraph>
        </>
      }
      buttonText='Оставить запрос'
      onInitFlowClick={onSendApplicationButtonClick}
    />
  );
};
