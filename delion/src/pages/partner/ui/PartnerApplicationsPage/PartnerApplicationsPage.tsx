import { observer } from 'mobx-react';
import { APP_ROOT_ROUTES, APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Applications } from '@widgets/application';

export const PartnerApplicationsPage = observer(() => {
  const { partnerS } = useStores();

  return (
    <Applications
      baseRoleRoute={APP_ROOT_ROUTES.PARTNER}
      store={partnerS}
      isLoading={partnerS.request.getPartnerApplications.loader}
      anotherApplicationsRoute={APP_ROUTES.PARTNER_FIND_APPLICATIONS}
    />
  );
});
