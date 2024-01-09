import { action, computed, makeObservable, observable } from 'mobx';

type WindowDimensions = {
  width: number;
  height: number;
};

export class UiStore {
  @observable windowDimensions: WindowDimensions = {
    width: 1920,
    height: 1080,
  };

  @observable headerHeight = 74;

  constructor() {
    if (typeof window !== 'undefined') {
      this.updateWindowDimensions();
      window.addEventListener('resize', () => {
        this.updateWindowDimensions();
      });
      window.onresize = () => {
        this.updateWindowDimensions();
      };
    }
    makeObservable(this);
  }

  @action setHeaderHeight(value: number) {
    this.headerHeight = value;
  }

  @computed get isMobile() {
    return this.windowDimensions.width < 767;
  }

  @computed get deviceType(): 'Mobile' | 'Tablet' | 'Laptop' | 'Desktop' | 'Large' {
    const { width } = this.windowDimensions;

    if (width < 768) return 'Mobile';
    if (width >= 768 && width < 1200) return 'Tablet';
    if (width >= 1200 && width < 1440) return 'Laptop';
    if (width >= 1440 && width < 1920) return 'Desktop';

    return 'Large';
  }

  @action updateWindowDimensions() {
    this.windowDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}
