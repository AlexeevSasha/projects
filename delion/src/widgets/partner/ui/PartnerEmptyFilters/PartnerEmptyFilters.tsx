import { Typography } from 'antd';
import { Paragraph } from '@shared/ui';
import { ApplicationWelcomeMessage } from '@widgets/application';

type TProps = {
  onFilterButtonClick: () => void;
};

export const PartnerEmptyFilters = (props: TProps) => {
  const { onFilterButtonClick } = props;
  return (
    <ApplicationWelcomeMessage
      message={
        <>
          <Typography.Title level={4}>Настройте фильтр</Typography.Title>
          <Paragraph>
            Чтобы получить подходящие заявки,
            <br /> заполните параметры поиска
          </Paragraph>
        </>
      }
      buttonText='Настроить фильтр'
      onInitFlowClick={onFilterButtonClick}
    />
  );
};
