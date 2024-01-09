import { observer } from 'mobx-react';
import { APP_ROOT_ROUTES, APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Applications } from '@widgets/application';

export const ExecutorApplicationsPage = observer(() => {
  const { executorS } = useStores();

  return (
    <Applications
      baseRoleRoute={APP_ROOT_ROUTES.EXECUTOR}
      store={executorS}
      isLoading={executorS.request.getExecutorApplications.loader}
      anotherApplicationsRoute={APP_ROUTES.EXECUTOR_FIND_APPLICATIONS}
    />
  );
});
