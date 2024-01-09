import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { Application } from '@entities/application';
import { ReservedApplicationItemCard } from '@features/application/executor';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { BackButton } from '@shared/ui';
import css from './ReservedApplicationItem.module.scss';

export const ReservedApplicationItem = (props: Application) => {
  const router = useRouter();
  const { executorS } = useStores();

  const handleRejectDream = useCallback(() => {
    executorS.getPublicAvailableApplication();
  }, [executorS]);

  const handleTakeDream = useCallback(
    (id: number) => {
      executorS.takeApplication({ id }).then((isSuccessfully) => {
        if (isSuccessfully) {
          router.replace(APP_ROUTES.EXECUTOR_APPLICATIONS);
        }
      });
    },
    [executorS, router],
  );

  return (
    <div className={css.container}>
      <div className={css.block}>
        <BackButton
          className={css.backButton}
          onBack={() => {
            executorS.setReservedApplication(null);
          }}
        />
        <ReservedApplicationItemCard
          reservedApplication={props}
          onReject={handleRejectDream}
          onTake={handleTakeDream}
        />
      </div>
    </div>
  );
};
