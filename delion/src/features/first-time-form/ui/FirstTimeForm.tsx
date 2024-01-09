import { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button } from '@shared/ui';
import { Input } from '@shared/ui/LegacyInput';

export const FirstTimeForm = observer(() => {
  const [submittable, setSubmittable] = useState(false);
  const router = useRouter();
  const { userS } = useStores();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const user = userS?.user;

  const handleSubmit = useCallback(
    async (values: { name: string; consent: boolean }) => {
      await userS
        .updateUser({ first_name: values.name, agree_with_pd: values.consent })
        .then(() => {
          const { status, data } = userS.request.updateUser.result;

          if (status && data) {
            router.push(APP_ROUTES.PROFILE);
          }
        });
    },
    [userS, router],
  );

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, values]);

  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      initialValues={{ name: user?.first_name, consent: user?.agree_with_pd }}
    >
      <Input
        name='name'
        type='text'
        placeholder='Ваше имя'
        rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
      />
      <Input
        label='Даю согласие на обработку персональных данных'
        name='consent'
        type='checkbox'
        rules={[
          {
            required: true,
            message: 'Это поле обязательно!',
            type: 'boolean',
            transform: (value) => value || undefined,
          },
        ]}
      />
      <Button htmlType='submit' type='primary' style={{ width: '100%' }} disabled={!submittable}>
        Войти
      </Button>
    </Form>
  );
});
