import { useCallback } from "react";
import { IPopupParam } from "@/modules/popup/interfaces/drawer";
import { Drawer } from "@/modules/popup/components/drawer/Drawer";

export const useDrawer = ({ previous, setPopupsCb }: IPopupParam) => {
  const addDrawer = useCallback(
    ({ detail }) => {
      const map = previous.current["drawer"];
      map.set(detail.id, <Drawer {...detail} key={detail.id} />);
      setPopupsCb("drawer", map);
    },
    [previous],
  );

  const deleteDrawer = useCallback(
    ({ detail }) => {
      const map = previous.current["drawer"];
      map.delete(detail.id);
      setPopupsCb("drawer", map);
    },
    [previous],
  );

  return { addDrawer, deleteDrawer };
};
