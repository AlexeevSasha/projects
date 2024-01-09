import { useCallback } from 'react';
import { Spin } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { QRDreamCard } from '@widgets/qr';
import { useCheckQR } from '../lib/hook/useCheckQR';

export const QRApplicationPage = observer(() => {
  const { executorS } = useStores();
  const { loading, uuid } = useCheckQR();
  const { push } = useRouter();

  const onTake = useCallback(() => {
    executorS.takeDreamPublicByUuid(uuid).then((res) => {
      res && push({ pathname: APP_ROUTES.EXECUTOR_APPLICATION.toString(), query: { id: res.id } });
    });
  }, []);

  const getDream = useCallback(() => {
    executorS.getDreamPublicByUuid(uuid).then((res) => {
      !res && push('/');
    });
  }, []);

  return (
    <Spin spinning={loading} style={{ width: '100%' }}>
      {!loading && <QRDreamCard getDream={getDream} onTake={onTake} />}
    </Spin>
  );
});
