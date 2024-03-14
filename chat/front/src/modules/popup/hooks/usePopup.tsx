import { useEffect } from "react";
import { EventBusNamesEnum } from "@/modules/popup/interfaces/eventBusNames";
import { useDrawer } from "@/modules/popup/hooks/useDrawer";
import { drawer } from "@/modules/popup/helpers/drawer";
import { IPopupParam } from "@/modules/popup/interfaces/popup";
import { useModal } from "@/modules/popup/hooks/useModal";
import { modal } from "@/modules/popup/helpers/modal";

export const usePopup = ({ setPopupsCb, previous }: IPopupParam) => {
  const { addDrawer, deleteDrawer } = useDrawer({ setPopupsCb, previous });
  const { addModal, deleteModal } = useModal({ setPopupsCb, previous });

  useEffect(() => {
    drawer.on(EventBusNamesEnum.OPEN_DRAWER, addDrawer);
    drawer.on(EventBusNamesEnum.CLOSE_DRAWER, deleteDrawer);
    modal.on(EventBusNamesEnum.OPEN_MODAL, addModal);
    modal.on(EventBusNamesEnum.CLOSE_MODAL, deleteModal);

    return () => {
      drawer.off(EventBusNamesEnum.OPEN_DRAWER, addDrawer);
      drawer.off(EventBusNamesEnum.CLOSE_DRAWER, deleteDrawer);
      modal.off(EventBusNamesEnum.OPEN_MODAL, addModal);
      modal.off(EventBusNamesEnum.CLOSE_MODAL, deleteModal);
    };
  }, []);
};
