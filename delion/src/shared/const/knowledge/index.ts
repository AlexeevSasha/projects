import type { ReactNode } from 'react';

export interface IKnowledgeData {
  id: number;
  title: string;
  description: ReactNode;
}

export { moderatorKnowledge } from './moderator/moderatorKnowledge';
export { moderatorKnowledgePopover } from './moderator/moderatorKnowledgePopover';
export { dreamerKnowledge } from './dreamer/dreamerKnowledge';
export { dreamerKnowledgeMap } from './dreamer/dreamerKnowledgeMap';
export type { DreamerKnowledgeKey } from './dreamer/dreamerKnowledgeMap';
