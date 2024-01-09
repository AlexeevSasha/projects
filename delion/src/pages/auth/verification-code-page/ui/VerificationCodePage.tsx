import { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import CallAuth from '@shared/assets/auth/call-auth.svg';
import SmsAuth from '@shared/assets/auth/sms-auth.svg';
import { APP_ROUTES, PHONE_CODE } from '@shared/const';
import { useStores } from '@shared/lib';
import { Paragraph, VerificationCodeForm } from '@shared/ui';
import { AuthLayout } from '@widgets/layout';
import css from './VerificationCodePage.module.scss';

export const VerificationCodePage = observer(() => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { authS } = useStores();
  const [isSms, setIsSms] = useState<boolean>(false);

  const [isResendAvailable, setResendAvailable] = useState(true);

  useEffect(() => {
    if (authS.authData?.resendTimestamp) {
      setResendAvailable(dayjs().isAfter(authS.authData.resendTimestamp));
    }
  }, [authS.authData?.resendTimestamp]);

  const onVerificationCodeComplete = useCallback(
    async (value: string) => {
      await authS.signInByCode({ code: value }).then(() => {
        const { status, data } = authS.request.authorizeByCode.result;

        if (status && data) {
          //если в query есть редирект, то нужно на него вернуть
          if (router.query?.redirect) {
            router.replace(router.query?.redirect.toString());
          } else if (!data?.user?.agree_with_pd) {
            router.replace(APP_ROUTES.PROFILE_FIRST_TIME);
          } else {
            router.replace(authS.afterLoginUrlBasedOnRole);
          }
        }
      });
    },
    [authS, router],
  );

  const onCountdownFinish = useCallback(() => {
    setResendAvailable(true);
  }, []);

  const onResendCodeClick = useCallback(
    async (isSmsCode: boolean) => {
      if (authS?.authData?.phone) {
        setIsSms(isSmsCode);
        await authS.verifyPhone({ phone: authS.authData?.phone, is_sms: isSmsCode }).then(() => {
          const { status } = authS.request.signInCode.result;

          if (status) {
            setResendAvailable(false);
          }
        });
      }
    },
    [authS],
  );

  return (
    <AuthLayout
      onBack={() => router.back()}
      hasError={authS.authData?.hasError}
      form={
        <VerificationCodeForm
          form={form}
          isReadyToVerifyWithSms={true}
          countdownValue={authS?.authData?.resendTimestamp as unknown as string}
          onResendCodeClick={onResendCodeClick}
          onCountdownFinish={onCountdownFinish}
          onVerificationCodeComplete={onVerificationCodeComplete}
          isResendAvailable={isResendAvailable}
        />
      }
      image={isSms ? SmsAuth : CallAuth}
      title={
        isSms ? (
          <Paragraph level={4}>
            Мы не смогли до вас дозвониться.
            <br />
            Отправили вам на номер{' '}
            <span className={css.phone}>
              {PHONE_CODE} {authS?.authData?.phone}
            </span>
            <br />
            код в смс сообщении. Введите его ниже
          </Paragraph>
        ) : (
          <Paragraph level={4} style={{ wordBreak: 'keep-all', display: 'contents' }}>
            На ваш номер телефона
            <span className={css.phone}>
              {PHONE_CODE} {authS?.authData?.phone}
            </span>
            поступит звонок, не берите трубку, просто укажите последние четыре цифры номера, с
            которого поступил звонок
          </Paragraph>
        )
      }
    />
  );
});
