import type { ReactNode } from 'react';
import css from '../Knowledge.module.scss';

interface IProps {
  children: ReactNode;
}

export const KnowledgeTitle = ({ children }: IProps) => {
  return <h2 className={css.knowledge__title}>{children}</h2>;
};
