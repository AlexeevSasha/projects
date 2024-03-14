import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePopup } from "@/modules/popup/hooks/usePopup";
import { IRootPopup } from "@/modules/popup/interfaces/popup";
import { usePrevious } from "@/common/hooks/usePrevious";

export const RootPopup = () => {
  const [popups, setPopups] = useState<IRootPopup>({ drawer: new Map() });
  const previous = usePrevious(popups);

  const setPopupsCb = useCallback(
    (name: keyof IRootPopup, map: Map<number, JSX.Element>) => {
      setPopups((prev) => ({ ...prev, [name]: map }));
    },
    [previous],
  );

  usePopup({ setPopupsCb, previous });

  return createPortal(
    Object.entries(popups).map(([key, value]) => <div key={key}>{Array.from(value.values())}</div>),
    document.getElementById("portal") as HTMLElement,
  );
};
