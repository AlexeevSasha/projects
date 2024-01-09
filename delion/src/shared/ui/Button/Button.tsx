import type { ButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import cx from 'classnames';
import Link from 'next/link';
import css from './Button.module.scss';

export type ExtendedButtonProps = ButtonProps & {
  fullWidth?: boolean;
  textLink?: boolean;
};

/* 01.09.2023: TODO: Any way to get Antd buttons computed classnames and use them directly to link? */
export const Button = (props: ExtendedButtonProps) => {
  const { href, fullWidth = false, className, ...buttonProps } = props;

  const classnames = cx(css.button, className, {
    [css.fullWidth]: fullWidth,
    [css.button__text_link]: props.textLink,
  });

  if (href && props.target !== '_blank') {
    return (
      <Link href={href} passHref>
        <AntButton {...buttonProps} className={classnames} />
      </Link>
    );
  }

  return <AntButton href={href} {...buttonProps} className={classnames} />;
};
