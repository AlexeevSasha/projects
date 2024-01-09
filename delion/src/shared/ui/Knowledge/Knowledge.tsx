import type { ReactNode } from 'react';
import css from './Knowledge.module.scss';
import { KnowledgeExample } from './ui/KnowledgeExample';
import { KnowledgeList } from './ui/KnowledgeList';
import { KnowledgeText } from './ui/KnowledgeText';
import { KnowledgeTitle } from './ui/KnowledgeTitle';

interface KnowledgeProps {
  children: ReactNode;
}

const Knowledge = ({ children }: KnowledgeProps) => <div className={css.knowledge}>{children}</div>;

Knowledge.Title = KnowledgeTitle;
Knowledge.Text = KnowledgeText;
Knowledge.List = KnowledgeList;
Knowledge.Example = KnowledgeExample;

export { Knowledge };
