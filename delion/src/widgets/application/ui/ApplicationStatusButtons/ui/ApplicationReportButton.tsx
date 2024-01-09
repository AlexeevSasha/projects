import { APP_ROUTES } from '@shared/const';
import { Button } from '@shared/ui';
import { ApplicationReportModal } from '../../ApplicationReportModal/ApplicationReportModal';

interface IProps {
  title: string;
  isView: boolean;
}

export const ApplicationReportButton = ({ title, isView }: IProps) => {
  const reportButton = () => {
    return (
      <Button
        href={isView ? `${APP_ROUTES.TRUSTEE_APPLICATION_DREAMS}?open=true` : undefined}
        fullWidth
        block
        type={isView ? 'default' : 'primary'}
      >
        {isView ? 'Просмотреть отчет' : title}
      </Button>
    );
  };

  return isView ? reportButton() : <ApplicationReportModal button={reportButton()} />;
};
