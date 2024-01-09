import { type FC } from 'react';
import { CheckCircleFilled, WarningOutlined } from '@ant-design/icons';
import type { MenuItemProps } from 'antd';
import { Menu } from 'antd';
import classNames from 'classnames';
import css from './StatusMenuItem.module.scss';

interface Props extends MenuItemProps {
  status?: Status;
}

export const StatusMenuItem: FC<Props> = (props) => {
  const { status: type, children, className, ...rest } = props;
  let icon = <CheckCircleFilled className={css.menuItem__icon} />;

  switch (type) {
    case 'success':
      icon = <CheckCircleFilled className={css.menuItem__icon_success} />;
      break;
    case 'warning':
      icon = <WarningOutlined className={css.menuItem__icon_warning} />;
      break;
  }

  return (
    <Menu.Item
      {...rest}
      className={classNames(className, css.menuItem, {
        [css.menuItem_success]: type === 'success',
        [css.menuItem_warning]: type === 'warning',
      })}
      icon={icon}
    >
      {children}
    </Menu.Item>
  );
};
