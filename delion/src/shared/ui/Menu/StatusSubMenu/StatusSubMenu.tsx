import type { FC } from 'react';
import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import type { SubMenuProps } from 'antd';
import { Menu } from 'antd';
import classNames from 'classnames';
import css from './StatusSubMenu.module.scss';

interface Props extends SubMenuProps {
  status?: Status;
}

export const StatusSubMenu: FC<Props> = (props) => {
  const { status: type, className, children, ...rest } = props;
  let icon = <CheckCircleFilled className={css.subMenu__icon} />;

  switch (type) {
    case 'success':
      icon = <CheckCircleFilled className={css.subMenu__icon_success} />;
      break;
    case 'warning':
      icon = <WarningFilled className={css.subMenu__icon_warning} />;
      break;
  }

  return (
    <Menu.SubMenu
      {...rest}
      icon={icon}
      className={classNames(className, css.subMenu, {
        [css.subMenu_success]: type === 'success',
        [css.subMenu_warning]: type === 'warning',
      })}
    >
      {children}
    </Menu.SubMenu>
  );
};
