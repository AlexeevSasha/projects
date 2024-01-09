import { useCallback, useEffect, useState } from 'react';
import { Col, Flex, Form, Row, Grid } from 'antd';
import type { RuleObject } from 'antd/es/form';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import type { SendCode } from '@entities/user/model/user';
import { CodeType } from '@entities/user/model/user';
import type { VerificationCodeData } from '@shared/api';
import { APP_ROUTES } from '@shared/const';
import { messageSuccess, useStores } from '@shared/lib';
import { Button, MaskedInput, Paragraph, VerificationCodeForm } from '@shared/ui';
import { countdownValue } from '@shared/ui/VerificationCodeForm/VerificationCodeForm';
import css from './ChangePhone.module.scss';

const phonePattern = /^\+7 \(9\d{2}\) \d{3}-\d{2}-\d{2}$/;

function normalizePhoneNumber(phonenumber: string) {
  return phonenumber.replace(/[^0-9]+/g, '');
}

export const ChangePhone = observer(() => {
  const { userS } = useStores();
  const router = useRouter();
  const breakpoints = Grid.useBreakpoint();

  const [submittable, setSubmittable] = useState(false);
  const [verificationCodeData, setVerificationCodeData] = useState<VerificationCodeData | null>(
    null,
  );
  const [form] = Form.useForm();
  const [verifyCodeForm] = Form.useForm();

  const values = Form.useWatch([], form);

  const userCurrentPhoneNumber = userS?.user?.phone;

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        if (
          normalizePhoneNumber(values.new_phone || '') !==
          normalizePhoneNumber(userCurrentPhoneNumber || '')
        )
          setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [form, userCurrentPhoneNumber, values]);

  const startAuthSendCode = useCallback(
    async (payload: Partial<SendCode>) => {
      verifyCodeForm.resetFields();
      const { data } = await userS.sendCode({
        is_sms: payload.is_sms,
        phone_number: payload.phone_number,
        code_type: CodeType.change_phone,
      });

      if (data?.uuid) {
        setVerificationCodeData({
          ...data,
          resend_timeout: Number(data.resend_timeout),
          attempts: (verificationCodeData?.attempts ?? 0) + 1,
        });
        router.push({ pathname: router.pathname, query: { code: true } }, undefined, {
          shallow: true,
        });
      }
    },
    [router, userS, verificationCodeData?.attempts, verifyCodeForm],
  );

  const onFinish = (values: { new_phone: string }) => {
    startAuthSendCode({ is_sms: false, phone_number: values.new_phone });
  };

  if (verificationCodeData?.uuid && router.query.code) {
    const onResendCodeClick = (isSms: boolean) => {
      startAuthSendCode({ is_sms: isSms, phone_number: form.getFieldValue('new_phone') });
    };

    const handleVerificationCodeComplete = async (value: string) => {
      if (verificationCodeData?.uuid) {
        const isVerified = await userS.verifyCode({
          code: value,
          uuid: verificationCodeData?.uuid,
        });

        if (isVerified) {
          messageSuccess('Номер успешно изменен');
          userS.setUser({ ...userS.user, phone: form.getFieldValue('new_phone') });
          setVerificationCodeData(null);

          router.push({ pathname: APP_ROUTES.PROFILE_SETTINGS }, undefined, {
            shallow: true,
          });
        }
      }
    };

    return (
      <Flex gap={24} vertical align='center' className={css.phoneVerification}>
        <Paragraph level={4} className={css.phoneVerify}>
          На ваш номер телефона
          <span className={css.phone}>{form.getFieldValue('new_phone')}</span> был выслан код
          подтверждения.
        </Paragraph>

        <VerificationCodeForm
          form={verifyCodeForm}
          countdownValue={countdownValue(verificationCodeData?.resend_timeout) as unknown as string}
          isResendAvailable={!verificationCodeData?.resend_timeout}
          isReadyToVerifyWithSms={verificationCodeData?.attempts > 1}
          onResendCodeClick={onResendCodeClick}
          onCountdownFinish={() =>
            setVerificationCodeData((prev) => (prev ? { ...prev, resend_timeout: 0 } : prev))
          }
          onVerificationCodeComplete={handleVerificationCodeComplete}
        />
      </Flex>
    );
  }

  const newPhoneValidator = (_rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject();
    }

    if (value.match(phonePattern)) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{ new_phone: userCurrentPhoneNumber || '' }}
    >
      <Row gutter={16}>
        <Col span={breakpoints.md ? 16 : 24}>
          <Form.Item
            label='Номер телефона'
            name='new_phone'
            rules={[
              {
                required: true,
                validator: newPhoneValidator,
                message: 'Введите корректное значение',
              },
            ]}
          >
            <MaskedInput
              className={css.input}
              mask={'+7 (000) 000-00-00'}
              pattern={phonePattern}
              placeholder='+7 (000) 000-00-00'
            />
          </Form.Item>
        </Col>
        <Col span={breakpoints.md ? 8 : 24}>
          {' '}
          <Button className={css.btn} htmlType='submit' disabled={!submittable} fullWidth>
            Сменить телефон
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
