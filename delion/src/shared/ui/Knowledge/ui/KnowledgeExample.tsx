import type { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import css from '../Knowledge.module.scss';

interface IProps {
  children: ReactNode;
  title?: ReactNode;
}

export const KnowledgeExample = ({ children, title }: IProps) => {
  return (
    <div className={css.example__container}>
      {title && <p className={css.knowledge__text}>{title}</p>}
      <div className={css.example__frame}>
        <InfoCircleOutlined />
        <div className={classNames(css.example__container, {
          [css.example__container__small]: title
        })}>
          <div className={css.knowledge__text}>Пример:</div>
          <p className={css.example__description}> {children}</p>
        </div>
      </div>
    </div>
  );
};
