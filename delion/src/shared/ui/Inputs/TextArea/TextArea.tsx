import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

const { TextArea: AntdTextArea } = Input;

export const TextArea = (props: TextAreaProps) => {
  return <AntdTextArea {...props} />;
};
