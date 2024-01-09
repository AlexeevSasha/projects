import { RefObject, useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (e: Event) => void) => {
  const listener = (e: Event) => {
    if (!ref?.current || ref.current.contains(e.target as HTMLElement)) return;

    handler(e);
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
};
