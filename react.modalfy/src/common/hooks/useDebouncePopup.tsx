import { useCallback, useState } from "react";

interface IProps {
  cb: () => void;
  delay: number;
}

export const useDebouncePopup = ({ cb, delay }: IProps) => {
  const [isClose, setIsClose] = useState(false);

  const closeModal = useCallback(() => {
    setIsClose(true);
    setTimeout(() => cb(), delay);
  }, []);

  return { isClose, closeModal };
};
