import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Cookie from 'mobx-cookie';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import type { UserRoles } from '@entities/user';
import { useStores } from '@shared/lib';

interface PageAccessProps {
  children: ReactNode;
  roles?: UserRoles | UserRoles[];
  redirectTo?: string;
}

export const PageAccess = observer(({ children, roles, redirectTo }: PageAccessProps) => {
  const { userS } = useStores();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const redirect = () => router.replace(redirectTo || '/').then(() => setLoading(false));

  const accessRoles = (userRole: UserRoles[]) => {
    if (!roles) return true;
    const availableRoles = Array.isArray(roles) ? roles : [roles];
    return userRole.some((role) => availableRoles.includes(role));
  };

  useEffect(() => {
    const refresh = new Cookie('refreshToken').value;
    if (!refresh) {
      roles?.length ? redirect() : setLoading(false);
    } else {
      if (userS?.user) {
        const hasAccess = accessRoles(userS.user?.groups || []);
        hasAccess ? setLoading(false) : redirect();
      }
    }
  }, [userS?.user]);

  return (
    <Spin style={{ maxHeight: '100%' }} spinning={loading}>
      {loading ? <div style={{ height: '100vh' }} /> : children}
    </Spin>
  );
});
