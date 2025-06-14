import type { FC } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import type { CustomIconProps } from '@shared/assets/icons/types';

const EyeSvg = (props: { width: string | number; height: string | number }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      fill='currentColor'
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.6822 7.5404C13.9894 3.97433 11.4305 2.17969 8.0001 2.17969C4.56796 2.17969 2.01082 3.97433 0.31796 7.54219C0.250059 7.68597 0.214844 7.843 0.214844 8.00201C0.214844 8.16102 0.250059 8.31805 0.31796 8.46183C2.01082 12.0279 4.56975 13.8225 8.0001 13.8225C11.4322 13.8225 13.9894 12.0279 15.6822 8.46005C15.8197 8.17076 15.8197 7.83505 15.6822 7.5404ZM8.0001 12.5368C5.11975 12.5368 3.01082 11.0761 1.52332 8.00112C3.01082 4.92612 5.11975 3.4654 8.0001 3.4654C10.8805 3.4654 12.9894 4.92612 14.4769 8.00112C12.9912 11.0761 10.8822 12.5368 8.0001 12.5368ZM7.92867 4.85826C6.19296 4.85826 4.78582 6.2654 4.78582 8.00112C4.78582 9.73683 6.19296 11.144 7.92867 11.144C9.66439 11.144 11.0715 9.73683 11.0715 8.00112C11.0715 6.2654 9.66439 4.85826 7.92867 4.85826ZM7.92867 10.0011C6.82332 10.0011 5.92867 9.10647 5.92867 8.00112C5.92867 6.89576 6.82332 6.00112 7.92867 6.00112C9.03403 6.00112 9.92868 6.89576 9.92868 8.00112C9.92868 9.10647 9.03403 10.0011 7.92867 10.0011Z'
        fill='#214FE2'
      />
    </svg>
  );
};

export const EyeIcon: FC<CustomIconProps> = (props) => {
  const { width = 48, height = 48 } = props;

  return <Icon component={() => <EyeSvg width={width} height={height} />} {...props} />;
};
