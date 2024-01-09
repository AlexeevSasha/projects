import type { FC, ReactNode } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { Form, Space } from 'antd';
import type { FormItemProps } from 'antd/lib';
import { Paragraph } from '@shared/ui';

interface Props extends FormItemProps {
  labelIcon?: ReactNode;
}

export const FormItem: FC<Props> = (props) => {
  let { label, labelIcon = <MessageOutlined />, name, children, rules = [], ...otherProps } = props;
  // TODO: Really needed?
  // const isRequired =
  //   !!(
  //     rules &&
  //     rules.some((rule) => {
  //       if (rule && typeof rule === 'object' && rule.required && !rule.warningOnly) {
  //         return true;
  //       }
  //     })
  //   ) || !!otherProps.required;
  label = label ? (
    <Space align={'baseline'}>
      {labelIcon}
      <Paragraph>{label}</Paragraph>
    </Space>
  ) : (
    ''
  );
  return (
    <Form.Item
      label={label}
      rules={rules}
      name={name}
      className={`formItem_${name}`}
      {...otherProps}
    >
      {children}
    </Form.Item>
  );
};

// FormItem.propTypes = {
//     children: element.isRequired,
//     label: string.isRequired,
//     name: string.isRequired,
//     rules: arrayOf(
//         oneOfType([
//             shape({ required: bool }),
//             shape({ min: number }),
//             shape({ max: number })
//         ])
//     )
// };
