import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from './types';

const PrevSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.3125 2.4107V1.20289C10.3125 1.0982 10.1922 1.04039 10.111 1.10445L3.06721 6.60601C3.00736 6.65256 2.95894 6.71215 2.92563 6.78025C2.89232 6.84836 2.875 6.92317 2.875 6.99898C2.875 7.0748 2.89232 7.14961 2.92563 7.21771C2.95894 7.28582 3.00736 7.34541 3.06721 7.39195L10.111 12.8935C10.1938 12.9576 10.3125 12.8998 10.3125 12.7951V11.5873C10.3125 11.5107 10.2766 11.4373 10.2172 11.3904L4.59221 6.99976L10.2172 2.60758C10.2766 2.5607 10.3125 2.48726 10.3125 2.4107Z"
      fill="currentColor"/>
  </svg>
);

export const PrevIcon: FC<CustomIconProps> = (props) => (
  <Icon component={ PrevSvg } { ...props } />
);
