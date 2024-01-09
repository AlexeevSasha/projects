import type { ReactNode } from 'react';
import type { DrawerProps } from 'antd';
import { generateId } from '@shared/const/generateId';
import { EventBus, EventBusNames } from '@shared/lib/eventBus';
import type { DetailsT, IKnowledgeDrawer } from '@shared/ui/popup';

class DrawerEvent extends EventBus<DetailsT> {
  constructor() {
    super();
  }

  openKnowledge(option: Omit<IKnowledgeDrawer, 'id'>) {
    this.emit(EventBusNames.OPEN_DRAWER, { id: generateId(), ...option, type: 'knowledge' });
  }

  open(children: ReactNode, option?: Omit<DrawerProps, 'children'>) {
    const id = generateId();
    this.emit(EventBusNames.OPEN_DRAWER, { id, ...option, children });

    return id;
  }

  close(id?: string) {
    this.emit<{ id?: string }>(EventBusNames.CLOSE_DRAWER, { id });
  }
}

export const drawer = new DrawerEvent();
