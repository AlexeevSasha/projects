import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { ReservedApplicationItemCard } from '@features/application/executor';
import { useStores } from '@shared/lib';
import css from './QRDreamCard.module.scss';

interface IProps {
  onTake: () => void;
  getDream: () => void;
}

export const QRDreamCard = observer(({ onTake, getDream }: IProps) => {
  const { executorS } = useStores();

  useEffect(() => {
    getDream();
  }, []);

  return (
    <div className={css.container}>
      {executorS.reservedApplication && (
        <ReservedApplicationItemCard
          reservedApplication={executorS.reservedApplication}
          onTake={onTake}
        />
      )}
    </div>
  );
});
