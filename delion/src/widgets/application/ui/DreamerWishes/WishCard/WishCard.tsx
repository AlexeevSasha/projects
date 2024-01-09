import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Paragraph } from '@shared/ui';
import css from './WishCard.module.scss';

export interface WishCardProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const WishCard: FC<WishCardProps> = ({
  icon,
  onClick,
  text,
  selected = false,
  disabled = false,
}) => {
  const handleClock = () => {
    if (disabled || !onClick) return;

    onClick();
  };

  return (
    <div
      onClick={handleClock}
      className={classNames(
        css.container,
        { [css.container_selected]: selected },
        { [css.container_disabled]: disabled },
      )}
    >
      <div className={css.container__icon}>{icon}</div>
      <Paragraph className={css.container__text}>{text}</Paragraph>
    </div>
  );
};
