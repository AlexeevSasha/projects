import type { ReactNode } from 'react';
import classNames from 'classnames';
import css from '../Knowledge.module.scss';

interface IProps {
  children: ReactNode;
  color?: 'blue';
  isInline?: boolean;
}

export const KnowledgeText = ({ children, color, isInline }: IProps) => {
  return (
    <p
      className={classNames(css.knowledge__text, {
        [css[`knowledge__text__${color}`]]: color,
        [css.knowledge__text__inline]: isInline,
      })}
    >
      {children}
    </p>
  );
};
