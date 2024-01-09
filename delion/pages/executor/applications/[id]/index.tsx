import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { ApplicationPage } from '@pages/executor';

const Page = () => <ApplicationPage />;

Page.auth = {
  roles: UserRoles.EXECUTOR,
};

export default observer(Page);
