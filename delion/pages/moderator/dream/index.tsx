import { observer } from 'mobx-react';
import { UserRoles } from '@entities/user';
import { ModeratorDreamPage } from '@pages/moderator';

const Page = () => <ModeratorDreamPage />;

Page.auth = {
  roles: UserRoles.MODERATOR,
};

export default observer(Page);
