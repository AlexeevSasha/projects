import type { Application } from '@entities/application';
import { AppraisalTrusteeFeedback } from '@features/application/trustee';
import { DreamerInfo } from '@features/dreamer';

export const DreamerFeedbackCard = ({
  trustee_feedback,
}: Pick<Application, 'trustee_feedback'>) => {
  return (
    <DreamerInfo
      info={[
        {
          name: 'Если вы испытывали трудности при регистрации и подаче заявки на сайте, опишите какие?',
          description: trustee_feedback?.difficulties,
        },
        {
          name: 'Довольны ли вы тем, как исполнили желание, которое вы указали в заявке?',
          description:
            AppraisalTrusteeFeedback.find((el) => el.value == trustee_feedback?.mark)?.label || '',
        },
        {
          name: 'Оставьте короткий отзыв об акции и свои пожелания, при их наличии',
          description: trustee_feedback?.review,
        },
      ]}
    />
  );
};
