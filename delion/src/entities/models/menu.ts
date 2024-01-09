import type React from 'react';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export type MenuItemProps = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
};
