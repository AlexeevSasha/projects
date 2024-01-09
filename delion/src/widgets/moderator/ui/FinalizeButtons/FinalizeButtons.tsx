import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Button } from '@shared/ui';
import css from './FinalizeButtons.module.scss';

interface IProps {
  onPrev: () => void;
  onFinish: () => Promise<void>;
}

export const FinalizeButtons = ({ onPrev, onFinish }: IProps) => {
  return (
    <Space size={'middle'} className={css.container}>
      <Button
        onClick={onPrev}
        rootClassName={css.prev}
        fullWidth
        icon={<LeftOutlined style={{ fontSize: 14 }} />}
      >
        К заявке
      </Button>
      <Button onClick={onFinish} fullWidth type='primary' htmlType='submit'>
        Завершить
      </Button>
    </Space>
  );
};
