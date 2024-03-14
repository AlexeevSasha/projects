import { useEffect, useMemo } from "react";
import { ActionModal } from "@/module/modal/utils/actionModal";
import { modalEvent } from "@/module/modal/utils/modalEvent";
import { IPopupParam } from "@/common/interfaces/popup";
import { PopupEventNames } from "@/common/interfaces/popupEventNames";

export const useModal = ({ previous, setPopupsCb }: IPopupParam) => {
  const modal = useMemo(
    () =>
      new ActionModal({
        type: "modal",
        popups: previous.current["modal"],
        setPopups: setPopupsCb,
      }),
    [],
  );

  useEffect(() => {
    modalEvent.on(PopupEventNames.OPEN_MODAL, modal.handlerAdd);
    modalEvent.on(PopupEventNames.CLOSE_MODAL, modal.handlerRemove);

    return () => {
      modalEvent.off(PopupEventNames.OPEN_MODAL, modal.handlerAdd);
      modalEvent.off(PopupEventNames.CLOSE_MODAL, modal.handlerRemove);
    };
  }, []);
};
