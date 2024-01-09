import { useEffect } from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { messageError, useStores } from '@shared/lib';

export const ProfileConfirmEmail = () => {
  const { userS } = useStores();
  const { query, replace } = useRouter();

  useEffect(() => {
    if (query.id) {
      userS.verifyEmail(query.id as string).finally(() => replace('/'));
    } else {
      messageError('Произошла ошибка');
      replace('/');
    }
  }, [query?.id]);

  return <Spin style={{ minHeight: '100vh' }} />;
};
