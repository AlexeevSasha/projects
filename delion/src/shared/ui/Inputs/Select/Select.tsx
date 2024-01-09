import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';
import css from './Select.module.scss';

export const Select = (props: SelectProps) => {
  return <AntdSelect {...props} className={css.select} />;
};
