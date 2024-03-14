import { ToastT } from '../../interfaces/toast';
import { getColorBy, getColorByType } from './getColor';
import { ThemeT } from '../../interfaces/theme';
import { TypeT } from '../../interfaces/type';
import { getIcon } from './getIcon';
import { Constants } from '../../interfaces/enum';
import { TransitionT } from '../../interfaces/transition';
import { PositionT } from '../../interfaces/position';
import { defaultDetailsToast } from './defaultDetails';
import { getAnimateOptions } from '../constants/animateOprions';

const getTransition = (transition?: TransitionT, position?: PositionT) => {
  const options = getAnimateOptions[transition || 'slide'];
  const namePosition = (transition + '-' + position?.split('-')[1])
    ?.replace(/(^\w|-\w)/g, (m) => m.toUpperCase())
    .replace(/-/g, '');

  return `${Constants.TOAST_NAME}Open${namePosition} ${options}`;
};
const getStylesByOnlyTheme = (theme: ThemeT) => {
  switch (theme) {
    case 'light':
      return {
        background: getColorBy('white'),
        color: getColorBy('black'),
        icon: getColorBy('black'),
      };
    case 'dark':
      return {
        background: getColorBy('black'),
        color: getColorBy('white'),
        icon: getColorBy('grey'),
      };
    case 'colored':
      return {
        background: getColorBy('gradient'),
        color: getColorBy('purple'),
        icon: getColorBy('purple'),
      };
  }
};
const getStyles = (theme: ThemeT, type?: TypeT) => {
  if (!type) return getStylesByOnlyTheme(theme);
  switch (theme) {
    case 'light':
      return {
        background: getColorBy(getColorByType(type, 'light')),
        color: getColorBy(getColorByType(type, 'dark')),
        icon: getColorBy(getColorByType(type, 'base')),
      };
    case 'dark':
      return {
        background: getColorBy('black'),
        color: getColorBy(getColorByType(type, 'base')),
        icon: getColorBy(getColorByType(type, 'base')),
        close: getColorBy(getColorByType(type, 'light')),
      };
    case 'colored': {
      const color = type === 'info' || type === 'error' ? 'light' : 'dark';
      const icon = type === 'info' || type === 'error' ? 'white' : 'black';
      return {
        background: getColorBy(getColorByType(type, 'base')),
        color: getColorBy(getColorByType(type, color)),
        icon: getColorBy(icon),
      };
    }
  }
};

export const buildToast = (details: ToastT) => {
  const style = getStyles(details.theme || 'light', details.type);

  const { toast, progress, close } = defaultDetailsToast.getConfigStyle(
    details.theme,
    details.type,
  );

  return {
    toast: {
      background: style.background,
      color: style.color,
      ...toast,
      ...details.style?.toast,
      animation: getTransition(details.transition, details.position),
    },
    icon: {
      element: getIcon(details.type, style.icon),
      color: style.icon,
      progress: {
        background: style.icon,
        ...progress,
        ...details.style?.progress,
      },
    },
    close: {
      background: close?.background || details.style?.close?.background || style.color,
    },
  };
};
