import type { InputNumberProps } from 'antd';
import { Form, InputNumber as AntdInputNumber } from 'antd';

export const InputNumber = (props: InputNumberProps) => {
  return (
    <Form.Item name={props.name}>
      <AntdInputNumber {...props} />
    </Form.Item>
  );
};
