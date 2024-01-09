import { useEffect, useMemo } from 'react';
import { EventBusNames } from '@shared/lib';
import type { IActionPopup } from '@shared/lib/actionPopup';
import { drawer } from '@shared/ui/popup';
import { ActionDrawer } from '@shared/ui/popup';

export const useDrawer = ({ popups, setPopups }: Omit<IActionPopup, 'type'>) => {
  const drawerAction = useMemo(() => new ActionDrawer({ popups, setPopups, type: 'drawer' }), []);

  useEffect(() => {
    drawer.on(EventBusNames.OPEN_DRAWER, drawerAction.handlerAdd);
    drawer.on(EventBusNames.CLOSE_DRAWER, drawerAction.handlerRemove);

    return () => {
      drawer.off(EventBusNames.OPEN_DRAWER, drawerAction.handlerAdd);
      drawer.off(EventBusNames.CLOSE_DRAWER, drawerAction.handlerRemove);
    };
  }, []);
};
