import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from '@shared/assets/icons/types';

const EmailSvg = (props: { width: string | number; height: string | number; fill: string }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 40 40'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='20' cy='20' r='17.5' fill={props.fill} />
      <path
        d='M28.125 13.125H11.875C11.5293 13.125 11.25 13.4043 11.25 13.75V26.25C11.25 26.5957 11.5293 26.875 11.875 26.875H28.125C28.4707 26.875 28.75 26.5957 28.75 26.25V13.75C28.75 13.4043 28.4707 13.125 28.125 13.125ZM26.5469 15.252L20.3848 20.0469C20.2324 20.166 20.0195 20.166 19.8672 20.0469L13.7031 15.252C13.6799 15.234 13.6628 15.2093 13.6544 15.1812C13.6459 15.1531 13.6465 15.123 13.6559 15.0952C13.6654 15.0674 13.6834 15.0433 13.7072 15.0263C13.7311 15.0092 13.7597 15 13.7891 15H26.4609C26.4903 15 26.5189 15.0092 26.5428 15.0263C26.5667 15.0433 26.5846 15.0674 26.5941 15.0952C26.6035 15.123 26.6041 15.1531 26.5956 15.1812C26.5872 15.2093 26.5701 15.234 26.5469 15.252Z'
        fill='white'
      />
    </svg>
  );
};

export const EmailIcon: FC<CustomIconProps> = (props) => {
  const { width = 48, height = 48, fill = 'currentColor' } = props;

  return (
    <Icon component={() => <EmailSvg width={width} height={height} fill={fill} />} {...props} />
  );
};
