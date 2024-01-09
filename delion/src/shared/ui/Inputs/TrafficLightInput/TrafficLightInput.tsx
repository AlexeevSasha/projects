import type { ReactNode } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import { Paragraph } from '@shared/ui';
import css from './TrafficLightInput.module.scss';

interface TrafficLightInputProps extends RadioGroupProps {
  popover?: ReactNode;
}

export const TrafficLightInput = ({ popover, ...props }: TrafficLightInputProps) => {
  return (
    <div className={css.container}>
      <Paragraph>Качество заполнения</Paragraph>
      <div className={css.wrapper}>
        <Radio.Group {...props} className={css.radio}>
          <Radio className={css.red} value={1}>
            <FrownOutlined />
          </Radio>
          <Radio className={css.yellow} value={2}>
            <MehOutlined />
          </Radio>
          <Radio className={css.green} value={3}>
            <SmileOutlined />
          </Radio>
        </Radio.Group>
        {popover && <div className={css.popover}>{popover}</div>}
      </div>
    </div>
  );
};
