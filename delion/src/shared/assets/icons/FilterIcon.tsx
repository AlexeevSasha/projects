import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from '@shared/assets/icons/types';

const FilterSvg = (props: { width: string | number; height: string | number }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1815_9695)'>
        <rect width='14' height='14' fill='white' fillOpacity='0.01' />
        <path
          d='M12.7526 1.4082H1.24948C0.866664 1.4082 0.627601 1.82539 0.819789 2.1582L4.45416 8.33633V12.0957C4.45416 12.3723 4.67604 12.5957 4.95104 12.5957H9.05104C9.32604 12.5957 9.54791 12.3723 9.54791 12.0957V8.33633L13.1839 2.1582C13.3745 1.82539 13.1354 1.4082 12.7526 1.4082ZM8.42916 11.4707H5.57291V9.0332H8.43073V11.4707H8.42916ZM8.57916 7.77383L8.43073 8.0332H5.57135L5.42291 7.77383L2.32448 2.5332H11.6776L8.57916 7.77383Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_1815_9695'>
          <rect width='14' height='14' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FilterIcon: FC<CustomIconProps> = (props) => {
  const { width = 14, height = 14 } = props;

  return <Icon component={() => <FilterSvg width={width} height={height} />} {...props} />;
};
