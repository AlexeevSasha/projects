import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { AFTER_LOGIN_REDIRECT_URL } from '@features/auth/model/auth';
import { useStores } from '@shared/lib';
import { Button, Paragraph } from '@shared/ui';
import { Input } from '@shared/ui/LegacyInput';

export const FirstTimeForm = observer(() => {
  const [submittable, setSubmittable] = useState(false);
  const router = useRouter();
  const { userS } = useStores();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const user = userS?.user;

  const handleSubmit = useCallback(
    async (values: { first_name: string; consent: boolean }) => {
      await userS
        .updateUser({ first_name: values.first_name, agree_with_pd: values.consent })
        .then(() => {
          const { status, data, errorData } = userS.request.updateUser.result;

          if (status && data && userS?.user?.userRole) {
            router.replace(AFTER_LOGIN_REDIRECT_URL[userS?.user?.userRole]);
          }

          if (errorData?.extra) {
            form.setFields(errorData.extra);
          }
        });
    },
    [userS, router, form],
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
      initialValues={{ first_name: user?.first_name, consent: user?.agree_with_pd }}
    >
      <Input
        name='first_name'
        type='text'
        placeholder='Ваше имя'
        rules={[
          { required: true, message: 'Пожалуйста, введите имя!' },
          { pattern: /^[А-Я-а-я][ А-Я-а-я]*$/, message: 'Пожалуйста, используйте кириллицу!' },
        ]}
      />
      <Input
        label={
          <Paragraph level={5} style={{ textAlign: 'left', display: 'block' }}>
            Даю{' '}
            <a href='/assets/Согласие_ЕЖ_сайт.pdf' target='_blank'>
              согласие на обработку персональных данных
            </a>
          </Paragraph>
        }
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
      <Button
        htmlType='submit'
        type='primary'
        disabled={!submittable}
        style={{ marginBottom: 24 }}
        block
      >
        Войти
      </Button>
      <Paragraph level={5} style={{ textAlign: 'center' }}>
        <a href='/assets/ПОЛОЖЕНИЕ.pdf' target='_blank'>
          Положение об акции
        </a>
      </Paragraph>
    </Form>
  );
});
