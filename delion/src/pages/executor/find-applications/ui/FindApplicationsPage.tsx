import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { NotificationSidebar } from '@features/sidebar/ui';
import { APP_ROOT_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { ApplicationHeader, FindApplications, ReservedApplicationItem } from '@widgets/executor';
import { ApplicationPageTypes } from '@widgets/executor/model/ApplicationPageTypes';
import type { FindApplicationFormValues } from '@widgets/executor/model/FindApplicationFormValues';
import { ApplicationLayout } from '@widgets/layout';

export const FindApplicationsPage = observer(() => {
  const { userS, executorS } = useStores();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: FindApplicationFormValues) => {
    executorS.getPublicAvailableApplication({
      amount_max: values?.price_max,
      amount_min: values?.price_min,
      no_suprises: values?.suprises,
      settlement: values?.place.data.fias_id,
    });
  };

  useEffect(() => {
    setIsLoading(executorS.request.getPublicAvailableApplication.loader);
  }, [executorS.request.getPublicAvailableApplication.loader, userS.user]);

  const { reservedApplication } = executorS;

  return (
    <ApplicationLayout
      header={
        <ApplicationHeader
          id={ApplicationPageTypes.FIND_APPLICATIONS}
          baseRoleRoute={APP_ROOT_ROUTES.EXECUTOR}
        />
      }
      content={
        reservedApplication ? (
          <ReservedApplicationItem {...reservedApplication} />
        ) : (
          <FindApplications onFinish={onFinish} />
        )
      }
      isLoading={isLoading}
      contentBackground={reservedApplication ? 'transparent' : 'white'}
      sidebar={<NotificationSidebar />}
    />
  );
});
