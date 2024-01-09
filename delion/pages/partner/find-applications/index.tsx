import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { PartnerFindApplicationsPage } from '@pages/partner';

const Page = () => <PartnerFindApplicationsPage />;

Page.auth = {
  roles: UserRoles.PARTNER,
};

export default observer(Page);
