import type { ReactNode } from 'react';
import { Divider, Grid, Space } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { ApplicationFeedbackForm } from '@features/application/executor';
import type { LeaveFeedbackParams } from '@features/application/executor/model/executor';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import css from './ApplicationFeedback.module.scss';

export type ApplicationFeedbackProps = {
  header: ReactNode;
};

export const ApplicationFeedback = observer(({ header }: ApplicationFeedbackProps) => {
  const router = useRouter();
  const { executorS, applicationS } = useStores();
  const breakpoints = Grid.useBreakpoint();

  const onConfirm = (values: Omit<LeaveFeedbackParams, 'id'>) => {
    const applicationId: number = Number(router.query.id);
    if (isNaN(applicationId)) return;
    executorS.leaveFeedback({ id: applicationId, ...values }).then((isSuccessful) => {
      if (isSuccessful) {
        router.push({
          pathname: APP_ROUTES.EXECUTOR_FIND_APPLICATIONS.toString(),
          query: { id: applicationId },
        });
      }
    });
  };

  return (
    <Space styles={{ item: { width: '100%' } }} direction='vertical'>
      <div className={css.wrapper}>
        {header}
        {!breakpoints.xs && <Divider style={{ margin: 0 }} />}
        <div className={css.content}>
          <ApplicationFeedbackForm
            initialValue={applicationS.application.feedback}
            onCancel={() => router.back()}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </Space>
  );
});
