import { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Form, Space } from 'antd';
import type { Application } from '@entities/application';
import { RejectApplication } from '@features/moderator';
import { Button } from '@shared/ui';
import css from './SubmitForm.module.scss';

interface IProps {
  form: FormInstance<Application>;
  onReject: (v: string) => Promise<void>;
}

export const SubmitForm = ({ form, onReject }: IProps) => {
  const [disabled, setDisabled] = useState(true);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setDisabled(false),
      () => setDisabled(true),
    );
  }, [values]);

  return (
    <Space size={'middle'} className={css.container}>
      <RejectApplication onReject={onReject} />
      <Button disabled={disabled} fullWidth type='primary' htmlType='submit'>
        Продолжить <RightOutlined style={{ fontSize: 14 }} />
      </Button>
    </Space>
  );
};
