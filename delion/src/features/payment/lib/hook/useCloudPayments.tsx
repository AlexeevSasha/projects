import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import { Cloudpayments } from '@shared/const/cloudpayments';
import { messageSuccess, useStores } from '@shared/lib';

export const useCloudPayments = (callback: () => void) => {
  const { query, replace } = useRouter();
  const { applicationS } = useStores();

  const onCloudPay = useCallback(() => {
    new Cloudpayments().pay(
      {
        amount: Number(applicationS.application.total_amount),
        currency: 'RUB',
        skin: 'classic',
        accountId: Date.now().toString(),
        description:
          'Благотворительное пожертвование для исполнения новогоднего желания участника(-ов) акции "Ёлка желаний"',
        data: {
          application_id: applicationS.application.id,
        },
      },
      {
        onSuccess: () => {
          replace({
            pathname: APP_ROUTES.EXECUTOR_APPLICATION.toString(),
            query: { id: query.id, success: true },
          });
          messageSuccess('Возврат средств доступен в течение 24 часов с момента оплаты');
        },
        onComplete: (data) => {
          data.success && callback();
        },
      },
    );
  }, [applicationS.application]);

  return { onCloudPay };
};
