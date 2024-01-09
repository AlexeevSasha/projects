import type { RadioGroupProps } from 'antd';
import { Form, Radio } from 'antd';

export const RadioGroup = (props: RadioGroupProps) => {
  return (
    <Form.Item name={props.name}>
      <Radio.Group {...props} />
    </Form.Item>
  );
};
