import { UserRoles } from '@entities/user';
import { IndexPage } from 'src/pages/trustee/index-page';

const Page = () => <IndexPage />;

Page.auth = {
  roles: UserRoles.DREAMER,
};
export default Page;
