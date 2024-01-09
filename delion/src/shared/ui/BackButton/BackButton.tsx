import type { CSSProperties, ReactElement } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import css from './BackButton.module.scss';

export type BackButtonProps = {
  icon?: ReactElement;
  onBack?(): void;
  className?: string;
};

const backButtonStyles = (isVisible: boolean): CSSProperties => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  height: 'max-content',
  display: isVisible ? 'flex' : 'none',
});

export const BackButton = (props: BackButtonProps) => {
  const { icon = <ArrowLeftOutlined /> } = props;

  return (
    <Button
      className={classNames(css.backButton, {}, [props.className])}
      onClick={props?.onBack}
      icon={icon}
      shape='round'
      style={backButtonStyles(Boolean(props.onBack))}
    />
  );
};
