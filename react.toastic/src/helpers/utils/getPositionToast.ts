interface IPositionProps {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  transform?: string;
}

export const getPositionToast: { [key in string]: IPositionProps } = {
  'top-left': {
    top: 0,
    left: 0,
  },
  'top-right': {
    top: 0,
    right: 0,
  },
  'top-center': {
    top: 0,
    left: '50%',
    transform: 'translateX( -50%)',
  },
  'bottom-left': {
    bottom: 0,
    left: 0,
  },
  'bottom-right': {
    bottom: 0,
    right: 0,
  },
  'bottom-center': {
    bottom: 0,
    left: '50%',
    transform: 'translateX( -50%)',
  },
};
