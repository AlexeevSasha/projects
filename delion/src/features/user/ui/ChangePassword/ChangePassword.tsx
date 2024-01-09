import { useCallback, useEffect, useState } from 'react';
import { Form, Space } from 'antd';
import { observer } from 'mobx-react';
import { CodeType, type SendCode } from '@entities/user/model/user';
import type { VerificationCodeData } from '@shared/api';
import { PASSWORD_REGEXP } from '@shared/const/password';
import { messageSuccess, useStores } from '@shared/lib';
import { Button, Paragraph, VerificationCodeForm } from '@shared/ui';
import { Input } from '@shared/ui/LegacyInput';
import { countdownValue } from '@shared/ui/VerificationCodeForm/VerificationCodeForm';
import css from './ChangePassword.module.scss';

export const ChangePassword = observer(() => {
  const [submittable, setSubmittable] = useState(false);
  const [verifyCodeForm] = Form.useForm();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const { userS } = useStores();

  const [verificationCodeData, setVerificationCodeData] = useState<VerificationCodeData | null>(
    null,
  );

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => setSubmittable(true),
      () => setSubmittable(false),
    );
  }, [form, values]);

  const startAuthSendCode = useCallback(
    async (payload: Partial<SendCode>) => {
      const { data, errorData } = await userS.sendCode({
        is_sms: payload.is_sms,
        password: payload.password,
        code_type: CodeType.reset_password,
      });

      if (errorData) {
        return form.setFields(errorData?.extra);
      }

      if (data?.uuid) {
        setVerificationCodeData({
          ...data,
          resend_timeout: Number(data.resend_timeout),
          attempts: (verificationCodeData?.attempts ?? 0) + 1,
        });
      }
    },
    [form, userS, verificationCodeData?.attempts],
  );

  const handleFormFinish = useCallback(
    (values: { password: string; password_confirm: string }) => {
      startAuthSendCode({ is_sms: false, password: values.password });
    },
    [startAuthSendCode],
  );

  const onResendCodeClick = useCallback(
    (isSms: boolean) => {
      startAuthSendCode({ is_sms: isSms, password: form.getFieldValue('password') });
    },
    [form, startAuthSendCode],
  );

  const onSuccessPasswordChange = useCallback(() => {
    messageSuccess('Пароль успешно изменён!');
    form.resetFields();
    setVerificationCodeData(null);
    setSubmittable(false);
  }, [form]);

  const handleVerificationCodeComplete = useCallback(
    async (value: string) => {
      if (verificationCodeData?.uuid) {
        const isVerified = await userS.verifyCode({
          code: value,
          uuid: verificationCodeData?.uuid,
        });

        if (isVerified) {
          onSuccessPasswordChange();
        }
      }
    },
    [onSuccessPasswordChange, userS, verificationCodeData?.uuid],
  );

  if (verificationCodeData?.uuid) {
    return (
      <Space size={36} direction='vertical' align='center' className={css.verificationCodeWrapper}>
        <>
          <Paragraph level={4} className={css.verificationCodeTitle}>
            На ваш номер телефона <span className={css.phone}>{userS?.user?.phone}</span> был выслан
            код подтверждения.
          </Paragraph>

          <VerificationCodeForm
            form={verifyCodeForm}
            countdownValue={
              countdownValue(verificationCodeData?.resend_timeout) as unknown as string
            }
            isResendAvailable={!verificationCodeData?.resend_timeout}
            isReadyToVerifyWithSms={verificationCodeData?.attempts > 1}
            onResendCodeClick={onResendCodeClick}
            onCountdownFinish={() =>
              setVerificationCodeData((prev) => (prev ? { ...prev, resend_timeout: 0 } : prev))
            }
            onVerificationCodeComplete={handleVerificationCodeComplete}
          />
        </>
      </Space>
    );
  }

  return (
    <Form form={form} layout='vertical' onFinish={handleFormFinish}>
      <Input
        name='password'
        label='Пароль'
        customFormItemOptions={{ labelIcon: null }}
        type='password'
        placeholder='Пароль'
        rules={[
          {
            required: true,
            min: 8,
            pattern: PASSWORD_REGEXP,
            message:
              'Пароль должен состоять не менее чем из 8 символов, содержать цифры и буквы латинского алфавита',
          },
        ]}
      />
      <Input
        name='password_confirm'
        type='password'
        placeholder='Подтверждение пароля'
        rules={[
          {
            min: 0,
            required: true,
            message: 'Пароли не совпадают',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Пароли не совпадают');
            },
          }),
        ]}
      />
      <Button type='primary' htmlType='submit' fullWidth disabled={!submittable}>
        Сохранить
      </Button>
    </Form>
  );
});
