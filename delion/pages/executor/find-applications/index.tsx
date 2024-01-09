import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { FindApplicationsPage } from '@pages/executor';

const Page = () => <FindApplicationsPage />;

Page.auth = {
  roles: UserRoles.EXECUTOR,
};

export default observer(Page);
