import { useEffect, useMemo } from "react";
import { ActionModal } from "../../helpers/action/actionModal";
import { IPopupParam } from "../../interfaces/popup/IPopup";
import { modalEvent } from "../../helpers/event/modalEvent";
import { PopupEventEnum } from "../../interfaces/popup/PopupEventEnum";

export const useModal = ({ previous, setPopupsCb }: IPopupParam) => {
  const modal = useMemo(
    () =>
      new ActionModal({
        type: "modal",
        popups: previous.current["modal"],
        setPopups: setPopupsCb,
      }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    modalEvent.on(PopupEventEnum.OPEN_MODAL, modal.handlerAdd);
    modalEvent.on(PopupEventEnum.CLOSE_MODAL, modal.handlerRemove);

    return () => {
      modalEvent.off(PopupEventEnum.OPEN_MODAL, modal.handlerAdd);
      modalEvent.off(PopupEventEnum.CLOSE_MODAL, modal.handlerRemove);
    };
    // eslint-disable-next-line
  }, []);
};
