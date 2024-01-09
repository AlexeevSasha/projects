import type { DrawerProps } from 'antd';
import type { IActionPopup } from '@shared/lib/actionPopup';
import { ActionPopup } from '@shared/lib/actionPopup';
import type { IKnowledgeDrawer, DetailsT } from '@shared/ui/popup';
import { KnowledgeDrawer } from '@shared/ui/popup';
import { PopupDrawer } from '@shared/ui/popup/ui/PopuDrawer';

export class ActionDrawer extends ActionPopup {
  constructor(options: IActionPopup) {
    super(options);
    this.handlerAdd = this.handlerAdd.bind(this);
    this.handlerRemove = this.handlerRemove.bind(this);
  }

  private getDrawer(type: DetailsT['type'], id: string, detail: unknown) {
    switch (type) {
      case 'knowledge':
        return <KnowledgeDrawer key={id} {...(detail as IKnowledgeDrawer)} id={id} />;
      default:
        return <PopupDrawer key={id} id={id} details={detail as DrawerProps} />;
    }
  }

  handlerAdd({ detail }: { detail: DetailsT }) {
    const { id, type, ...attr } = detail;
    const map = this.popups;
    map.set(id, this.getDrawer(type, id, attr));
    this.setPopups('drawer', map);
  }
}
