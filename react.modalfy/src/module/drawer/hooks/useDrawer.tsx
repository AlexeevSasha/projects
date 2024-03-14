import { useEffect, useMemo } from "react";
import { ActionDrawer } from "@/module/drawer/utils/actionDrawer";
import { drawerEvent } from "@/module/drawer/utils/drawerEvent";
import { IPopupParam } from "@/common/interfaces/popup";
import { PopupEventNames } from "@/common/interfaces/popupEventNames";

export const useDrawer = ({ previous, setPopupsCb }: IPopupParam) => {
  const drawer = useMemo(
    () =>
      new ActionDrawer({
        type: "drawer",
        popups: previous.current["drawer"],
        setPopups: setPopupsCb,
      }),
    [],
  );

  useEffect(() => {
    drawerEvent.on(PopupEventNames.OPEN_DRAWER, drawer.handlerAdd);
    drawerEvent.on(PopupEventNames.CLOSE_DRAWER, drawer.handlerRemove);

    return () => {
      drawerEvent.off(PopupEventNames.OPEN_DRAWER, drawer.handlerAdd);
      drawerEvent.off(PopupEventNames.CLOSE_DRAWER, drawer.handlerRemove);
    };
  }, []);
};
