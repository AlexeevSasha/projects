import { CSSProperties, useEffect, useRef } from 'react';

type Props = {
  timeout?: number;
  closeToast: () => void;
  style: CSSProperties;
};

export const Progress = ({ timeout, closeToast, style }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref?.current?.addEventListener('animationend', closeToast);
    return () => {
      ref?.current?.addEventListener('animationend', closeToast);
    };
  }, []);

  if (timeout === undefined) return null;
  return (
    <div
      className={'Toastic__progress'}
      style={{ animationDuration: `${timeout}ms`, ...style }}
      ref={ref}
    />
  );
};
