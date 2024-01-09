import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { ExecutorApplicationsPage } from '@pages/executor';

const Page = () => <ExecutorApplicationsPage />;

Page.auth = {
  roles: UserRoles.EXECUTOR,
};

export default observer(Page);
