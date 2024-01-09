import { useState, useEffect, useCallback } from "react";

export const useWindowSize = (asyncron = false) => {
  const isClient = typeof window === "object";

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(() => getSize());
  let timerId: NodeJS.Timeout;

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    function handleResize() {
      if (asyncron) {
        timerId && clearTimeout(timerId);
        timerId = setTimeout(() => {
          setWindowSize(getSize());
        }, 100);
      } else {
        setWindowSize(getSize());
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [getSize, isClient, asyncron]);

  return windowSize;
};
