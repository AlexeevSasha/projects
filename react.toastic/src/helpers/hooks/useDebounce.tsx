import { useCallback, useState } from 'react';

interface IProps {
  cb: () => void;
  delay: number;
  animation: string;
}

export const useDebounce = ({ animation, cb, delay }: IProps) => {
  const [closingAnimate, setClosingAnimate] = useState({});

  const closeToast = useCallback(() => {
    setClosingAnimate({ animation: animation?.replace('Open', 'Close') + ' forwards' });
    setTimeout(() => cb(), delay);
  }, []);

  return { closingAnimate, closeToast };
};
