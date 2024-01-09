import type { Breakpoint } from 'antd';
import { observable } from 'mobx';

interface LayoutStoreProps {
  hideHeaderFooter: boolean;
  hideSideBar: boolean;
  formSize: Breakpoint;

  setHideHeaderFooter(value: boolean): void;

  setHideSideBar(value: boolean): void;

  setHideAll(value: boolean): void;

  setFormSize(value: Breakpoint): void;

  getFormWidth(size?: Breakpoint): number;
}

export const LayoutStore = observable<LayoutStoreProps>({
  hideHeaderFooter: false,
  hideSideBar: false,
  formSize: 'md',

  setHideHeaderFooter(value: boolean) {
    this.hideHeaderFooter = value;
  },

  setHideSideBar(value: boolean) {
    this.hideSideBar = value;
  },

  setHideAll(value: boolean) {
    this.hideHeaderFooter = value;
    this.hideSideBar = value;
  },

  setFormSize(value: Breakpoint) {
    this.formSize = value;
  },

  getFormWidth(size?: Breakpoint): number {
    if (!size) {
      size = this.formSize;
    }
    switch (size) {
      case 'sm':
        return 420;
      case 'md':
        return 880;
      case 'lg':
        return 1050;
      case 'xxl':
        return window.innerWidth;
      default:
        return window.innerWidth;
    }
  },
});
