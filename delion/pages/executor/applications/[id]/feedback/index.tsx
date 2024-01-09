import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { FeedbackPage } from '@pages/executor';

const Page = () => <FeedbackPage />;

Page.auth = {
  roles: UserRoles.EXECUTOR,
};

export default observer(Page);
