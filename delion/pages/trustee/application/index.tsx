import { UserRoles } from '@entities/user';
import { DraftPage } from '@pages/trustee/draft-page';

const Page = () => <DraftPage />;

Page.auth = {
  roles: UserRoles.DREAMER,
};

export default Page;
