import type { ReactNode } from 'react';
import css from '../Knowledge.module.scss'

interface KnowledgeListProps {
  list: ReactNode[];
}

export const KnowledgeList = ({list}: KnowledgeListProps) => {
  return (
    <ul className={css.knowledge__list}>
      {list.map((el, i) => <li className={css.knowledge__text} key={i}>{el}</li>)}
    </ul>
  );
};
