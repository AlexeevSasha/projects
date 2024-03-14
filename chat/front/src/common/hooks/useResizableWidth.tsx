import { RefObject, useCallback, useEffect, useState } from "react";

export const useResizableWidth = (ref: RefObject<HTMLElement>) => {
  const [activeEvent, setActiveEvent] = useState(false);
  const [width, setWidth] = useState(250);

  const handlerMouseDown = useCallback(() => {
    setActiveEvent(true);

    function onMouseMove(event: MouseEvent) {
      if (event.clientX >= 250 && event.clientX <= 900) {
        setWidth(event.clientX);
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseUp() {
      setActiveEvent(false);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
  }, []);

  useEffect(() => {
    ref?.current?.addEventListener("mousedown", handlerMouseDown);

    return () => {
      ref.current?.removeEventListener("mousedown", handlerMouseDown);
    };
  }, [ref]);

  return { activeEvent, width };
};
