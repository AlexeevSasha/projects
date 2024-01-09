import { useState } from "react";

export const useTimeout = (delay: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  return function(callback: () => void) {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(callback, delay));
  };
};
