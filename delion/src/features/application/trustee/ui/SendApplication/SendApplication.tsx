import { type FC } from 'react';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button } from '@shared/ui';

export const SendApplication: FC = () => {
  const { applicationS } = useStores();

  return (
    <Button
      block
      type='primary'
      htmlType='submit'
      disabled={!applicationS.isFullFilled}
      href={APP_ROUTES.TRUSTEE_APPLICATION_DREAMS}
    >
      Отправить заявку
    </Button>
  );
};
