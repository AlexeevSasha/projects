import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { PartnerApplicationsPage } from '@pages/partner';

const Page = () => <PartnerApplicationsPage />;

Page.auth = {
  roles: UserRoles.PARTNER,
};

export default observer(Page);
