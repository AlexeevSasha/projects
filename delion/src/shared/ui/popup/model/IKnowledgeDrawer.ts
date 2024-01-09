import type { IKnowledgeData } from '@shared/const';

export interface IKnowledgeDrawer {
  id: string;
  dataSource: IKnowledgeData[];
  title?: string;
  activeId?: number;
}
