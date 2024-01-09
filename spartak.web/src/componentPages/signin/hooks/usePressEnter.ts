import { useEffect } from "react";

export const usePressEnter = (handleSubmit: () => void) => {
  function enterKeyPressed(event: any) {
    if (event.keyCode == 13) {
      handleSubmit();
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", enterKeyPressed);

    return () => document.removeEventListener("keypress", enterKeyPressed);
  }, [handleSubmit]);

  return;
};
