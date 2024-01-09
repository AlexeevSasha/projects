import type { GetServerSideProps } from 'next';
import { UserRoles } from '@entities/user';
import { DreamsPage } from '@pages/trustee/dreams-page';

interface IProps {
  fromTrustee?: boolean;
}

const Page = (props: IProps) => <DreamsPage {...props} />;

Page.auth = {
  roles: UserRoles.DREAMER,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer || '';
  return {
    props: { fromTrustee: /\/trustee$/.test(referer) && !!context.query?.open },
  };
};

export default Page;
