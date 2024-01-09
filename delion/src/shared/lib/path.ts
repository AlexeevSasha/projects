import type { Key } from 'react';
import type { MenuItem } from './menu';

export const getMainPath = (path: string): string => {
  const pathSplit = path.split('/');
  if (pathSplit.length > 1) {
    return pathSplit[1];
  }
  return path;
};

export const getCurrentMenuItemKey = (path: string, menuItems: MenuItem[]): Key | undefined => {
  return menuItems.find((value: MenuItem) => {
    return path.startsWith(String(value?.key));
  })?.key;
};
