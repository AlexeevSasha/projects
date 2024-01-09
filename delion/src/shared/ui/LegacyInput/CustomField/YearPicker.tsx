import type { FC } from 'react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';

interface Props extends SelectProps {
  minValue: number;
  maxValue: number;
}

export const YearPicker: FC<Props> = (props) => {
  const { minValue, maxValue, ...otherProps } = props;

  const years: { value: number; label: string }[] = [];
  for (let year = maxValue; year >= minValue; year--) {
    years.push({ value: year, label: year.toString() });
  }

  return <Select showSearch options={years} {...otherProps}></Select>;
};
