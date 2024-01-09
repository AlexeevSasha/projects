import type { FC } from 'react';
import { CheckCircleFilled, WarningOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import css from './StatusButton.module.scss';

interface Props extends ButtonProps {
  status?: Status;
}

export const StatusButton: FC<Props> = ({ status = 'default', icon, className, ...props }) => {
  switch (status) {
    case 'warning':
      icon = <WarningOutlined />;
      break;
    case 'success':
      icon = <CheckCircleFilled />;
      break;
  }

  return (
    <Button
      icon={icon}
      className={classNames(className, css.button, {
        [css.button__warning]: status === 'warning',
        [css.button__success]: status === 'success',
      })}
      {...props}
    />
  );
};
