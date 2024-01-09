import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDrawer } from '../hook/useDrawer';

interface IRootPopup {
  drawer: Map<string, ReactNode>;
}

export const PopupRootContainer = () => {
  const [popups, setPopups] = useState<IRootPopup>({ drawer: new Map() });

  const setPopupsCb = useCallback((name: string, map: Map<string, ReactNode>) => {
    setPopups((prev) => ({ ...prev, [name]: map }));
  }, []);

  useDrawer({ popups: popups.drawer, setPopups: setPopupsCb });

  if (typeof window !== 'object') return null;
  return createPortal(
    Object.values(popups).map((values) => (values.size ? Array.from(values.values()) : null)),
    document.body,
  );
};
