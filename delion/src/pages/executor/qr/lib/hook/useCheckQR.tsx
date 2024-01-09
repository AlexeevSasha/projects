import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserRoles } from '@entities/user';
import { APP_ROUTES } from '@shared/const';
import { messageError, useStores } from '@shared/lib';

export const useCheckQR = () => {
  const [loading, setLoading] = useState(true);
  const { userS } = useStores();
  const { query, push } = useRouter();

  useEffect(() => {
    if (!userS.user) {
      push(
        {
          pathname: APP_ROUTES.LOGIN.toString(),
          query: { redirect: `${APP_ROUTES.QR_WISH}${query.id}` },
        },
        APP_ROUTES.LOGIN.toString(),
      );
    } else if (userS.user.userRole !== UserRoles.EXECUTOR) {
      setTimeout(() => messageError('Доступно только пользователям в роли Исполнитель'), 0);
      push('/');
    } else {
      setLoading(false);
    }
  }, []);

  return { loading, uuid: query.id.toString() };
};
