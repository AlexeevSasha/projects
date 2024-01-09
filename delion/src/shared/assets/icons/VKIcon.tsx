import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from '@shared/assets/icons/types';

export const VKSvg = (props: { width: string | number; height: string | number }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='20' cy='20' r='17.5' fill='#0077FF' />
      <path
        d='M20.8931 26.24C14.0599 26.24 10.1624 21.5554 10 13.7603H13.4229C13.5353 19.4817 16.0587 21.9052 18.0574 22.4049V13.7603H21.2805V18.6947C23.2543 18.4823 25.3277 16.2337 26.0273 13.7603H29.2503C28.7132 16.8083 26.4646 19.0569 24.8656 19.9814C26.4646 20.7309 29.0256 22.6922 30 26.24H26.4521C25.6901 23.8664 23.7914 22.0301 21.2805 21.7802V26.24H20.8931Z'
        fill='white'
      />
    </svg>
  );
};

export const VKIcon: FC<CustomIconProps> = (props) => {
  const { width = 40, height = 40 } = props;

  return <Icon component={() => <VKSvg width={width} height={height} />} {...props} />;
};
