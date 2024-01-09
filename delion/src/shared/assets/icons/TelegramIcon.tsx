import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from '@shared/assets/icons/types';

const TelegramSvg = (props: { width: string | number; height: string | number }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='20' cy='20' r='17.5' fill='#2FA6D9' />
      <path
        d='M9.96658 19.4889C11.8151 18.4722 13.8882 17.6139 15.8159 16.7556C19.1433 15.356 22.4707 13.9696 25.8509 12.6888C26.5111 12.4644 27.6863 12.2531 27.8051 13.2302C27.7391 14.6034 27.4882 15.9766 27.3034 17.3366C26.8544 20.3471 26.3263 23.3444 25.8113 26.3417C25.6397 27.3452 24.3853 27.8602 23.5798 27.2132C21.6521 25.9192 19.7243 24.6252 17.8229 23.3048C17.2023 22.671 17.7833 21.7599 18.3379 21.311C19.9224 19.7529 21.5993 18.4193 23.1045 16.7821C23.5138 15.805 22.3123 16.6236 21.9161 16.8745C19.7507 18.3665 17.6381 19.951 15.3406 21.2714C14.1786 21.9184 12.8054 21.3638 11.6435 21.0073C10.6004 20.5848 9.06872 20.1491 9.96658 19.4889Z'
        fill='white'
      />
    </svg>
  );
};

export const TelegramIcon: FC<CustomIconProps> = (props) => {
  const { width = 40, height = 40 } = props;

  return <Icon component={() => <TelegramSvg width={width} height={height} />} {...props} />;
};
