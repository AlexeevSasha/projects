import type { Application } from '@entities/application';
import { APP_ROUTES } from '@shared/const';
import { Button } from '@shared/ui';
import { ApplicationFeedbackModal } from '../../ApplicationFeedbackModal/ApplicationFeedbackModal';

export const ApplicationFeedbackButton = ({
  trustee_feedback,
}: Pick<Application, 'trustee_feedback'>) => {
  const feedbackButton = () => {
    return (
      <Button
        href={trustee_feedback ? `${APP_ROUTES.TRUSTEE_APPLICATION_DREAMS}?open=true` : undefined}
        fullWidth
        block
        type={trustee_feedback ? 'default' : 'primary'}
      >
        {trustee_feedback ? 'Просмотреть отзыв' : 'Оставить отзыв'}
      </Button>
    );
  };

  return trustee_feedback ? (
    feedbackButton()
  ) : (
    <ApplicationFeedbackModal button={feedbackButton()} />
  );
};
