import { useEffect, useMemo } from "react";
import { ActionModal } from "../../helpers/action/actionModal";
import { IPopupParam } from "../../interfaces/popup/IPopup";
import { modalEvent } from "../../helpers/event/modalEvent";
import { PopupEventEnum } from "../../interfaces/popup/PopupEventEnum";

export const useDrawer = ({ previous, setPopupsCb }: IPopupParam) => {
  const drawer = useMemo(
    () =>
      new ActionModal({
        type: "drawer",
        popups: previous.current["drawer"],
        setPopups: setPopupsCb,
      }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    modalEvent.on(PopupEventEnum.OPEN_DRAWER, drawer.handlerAdd);
    modalEvent.on(PopupEventEnum.CLOSE_DRAWER, drawer.handlerRemove);

    return () => {
      modalEvent.off(PopupEventEnum.OPEN_DRAWER, drawer.handlerAdd);
      modalEvent.off(PopupEventEnum.CLOSE_DRAWER, drawer.handlerRemove);
    };
    // eslint-disable-next-line
  }, []);
};
