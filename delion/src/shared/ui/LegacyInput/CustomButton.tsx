import { Button } from 'antd';
import type { ButtonType } from 'antd/es/button';
import type { ButtonProps } from 'antd/es/button/button';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { CustomButtonType, FormButtonsProps } from './model/form';

export interface CustomButtonsProps extends Omit<ButtonProps, 'type'> {
  type?: CustomButtonType;
  iconPosition?: 'before' | 'after';
  blockWidth?: boolean;
  clickable?: boolean;
  hrefProps?: LinkProps;
}

export const CustomButton = (props: FormButtonsProps) => {
  let {
    title,
    mobileTitle,
    className,
    onClick,
    children,
    type,
    icon,
    blockWidth,
    iconPosition,
    style,
    hrefProps,
    clickable = true,
    ...otherProps
  } = props;

  let buttonType: ButtonType = 'default';
  switch (type) {
    case 'secondary':
      className = className + ' ant-btn-secondary';
      break;
    case 'success':
      buttonType = 'primary';
      className = className + ' ant-btn-success';
      break;
    case 'error':
      buttonType = 'primary';
      break;
    case 'url':
      buttonType = 'link';
      className = className + ' ant-btn-url';
      break;
    case 'link':
      buttonType = type;
      if (!style?.padding) {
        style = {
          height: '100%',
          ...style,
          padding: 0,
        };
      }
      break;
    default:
      buttonType = type ?? 'default';
      break;
  }

  if (!clickable) className += ' ant-btn-not-clickable';

  const button = (
    <Button
      {...otherProps}
      style={{
        width: blockWidth ? '100%' : '',
        ...style,
      }}
      type={buttonType}
      className={className}
      onClick={onClick}
    >
      {icon && (!iconPosition || iconPosition == 'before') && icon}
      {mobileTitle || title || mobileTitle ? (
        mobileTitle ? (
          <>
            <div className={'d-mobile-none'}>{children ? children : title}</div>
            <div className={'d-desktop-none'}>{mobileTitle}</div>
          </>
        ) : (
          <>{children ? children : title}</>
        )
      ) : null}
      {icon && iconPosition == 'after' && icon}
    </Button>
  );

  return hrefProps ? (
    <Link
      {...hrefProps}
      style={{
        width: blockWidth ? '100%' : '',
      }}
    >
      {button}
    </Link>
  ) : (
    <>{button}</>
  );
};
