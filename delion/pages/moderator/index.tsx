import { observer } from 'mobx-react';
import type { GetServerSideProps } from 'next';
import { UserRoles } from '@entities/user';
import { ModeratorPage } from '@pages/moderator';

interface IProps {
  fromDream?: boolean;
}

const Page = (props: IProps) => <ModeratorPage {...props} />;

Page.auth = {
  roles: UserRoles.MODERATOR,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers.referer || '';
  return {
    props: { fromDream: /\/moderator\/dream$/.test(referer) },
  };
};

export default observer(Page);
