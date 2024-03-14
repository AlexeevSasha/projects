import { useEffect, useState } from 'react';
import { useToast } from '../helpers/hooks/useToast';
import { getPositionToast } from '../helpers/utils/getPositionToast';
import { ConfigToastType } from '../interfaces/config';
import { defaultDetailsToast } from '../helpers/utils/defaultDetails';
import { PositionT } from '../interfaces/position';

export const ToastContainer = ({ config }: { config?: ConfigToastType }) => {
  const [toasts, setToasts] = useState<Map<PositionT, JSX.Element[]>>(new Map());

  useToast({ setToasts });

  useEffect(() => {
    defaultDetailsToast.setDetails(config);
  }, [config]);

  return (
    <div className={'ToasticContainer'}>
      {Array.from(toasts.entries()).map(([position, elem]) => {
        return elem.length ? (
          <div
            key={position}
            style={{
              position: 'fixed',
              ...getPositionToast[position],
              zIndex: 'var(--react-toastic-zindex)',
            }}
          >
            {elem}
          </div>
        ) : null;
      })}
    </div>
  );
};
