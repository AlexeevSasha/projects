import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import type { UserData } from '@entities/user';
import { useStores } from '@shared/lib';
import { Button } from '@shared/ui';
import { Input } from '@shared/ui/LegacyInput';
import type { FormFieldProps } from '@shared/ui/LegacyInput/model/form';
import css from './UserDataForm.module.scss';

interface UserDataFormProps {
  schema: FormFieldProps[];
}

export const UserDataForm = observer(({ schema }: UserDataFormProps) => {
  const [submittable, setSubmittable] = useState(false);
  const { userS } = useStores();
  const [form] = Form.useForm();

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setSubmittable(true),
      () => setSubmittable(false),
    );
  }, [values]);

  const handleFormFinish = async (values: UserData) => {
    await userS.updateUser(values).then(() => {
      const { errorData } = userS.request.updateUser.result;

      if (errorData?.extra) {
        form.setFields(errorData?.extra);
      }
    });
  };

  return (
    <Form
      onFinish={handleFormFinish}
      form={form}
      layout='vertical'
      initialValues={userS.user || {}}
    >
      <div className={css.formContent}>
        {schema.map((attr, i) => (
          <Input key={i} {...attr} />
        ))}
      </div>

      <Button disabled={!submittable} type='primary' htmlType='submit' fullWidth>
        Сохранить
      </Button>
    </Form>
  );
});
