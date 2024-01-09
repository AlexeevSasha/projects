import { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CodeType } from '@entities/user/model/user';
import { DreamerHints } from '@features/dreamer';
import type { VerificationCodeData } from '@shared/api';
import { TechnicalSupportErrorIcon } from '@shared/assets';
import CallImage from '@shared/assets/auth/call-auth.svg';
import SmsImage from '@shared/assets/auth/sms-auth.svg';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button, Divider, Paragraph, VerificationCodeForm } from '@shared/ui';
import css from './DreamerConfirmPhone.module.scss';

interface IProps {
  prev: () => void;
}

const countdownValue = (v?: number) => (v ? dayjs().add(v || 0, 's') : 0);

export const DreamerConfirmPhone = observer(({ prev }: IProps) => {
  const { applicationS, trusteeS, userS } = useStores();
  const [form] = Form.useForm();
  const { replace } = useRouter();

  const [withSms, setWithSms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [verificationCodeData, setVerificationCodeData] = useState<VerificationCodeData | null>(
    applicationS?.application?.confirmation_code ?? null,
  );

  const confirmPhone = useCallback(
    async (withSms: boolean) => {
      setLoading(true);
      if (!withSms) {
        const check = await trusteeS.checkDream();
        !check?.is_checked && replace(APP_ROUTES.TRUSTEE);
      }
      if (!verificationCodeData?.resend_timeout) {
        const { data } = await userS.sendCode({
          is_sms: withSms,
          dream_application_id: applicationS.application.id,
          code_type: CodeType.confirm_application,
        });
        setVerificationCodeData(data ?? null);
        !data && setError(true);
      }
      setLoading(false);
    },
    [verificationCodeData],
  );

  const successCode = useCallback(
    async (code: string) => {
      setLoading(true);
      if (!verificationCodeData?.uuid) return;
      const response = await userS.verifyCode({ code, uuid: verificationCodeData.uuid });
      response && replace(APP_ROUTES.TRUSTEE.toString());
      setLoading(false);
    },
    [verificationCodeData?.uuid],
  );

  useEffect(() => {
    confirmPhone(withSms).then();
  }, [withSms]);

  if (error) return <TechnicalSupport />;
  return (
    <Spin spinning={loading}>
      <Row className={css.container}>
        <Col xl={10} md={15} span={24}>
          <div className={css.container__title}>
            <Paragraph strong level={4}>
              Подтвердите телефон
            </Paragraph>
            <Divider marginTop={16} marginBottom={24} />
          </div>
          <Space className={css.verification} size={20} direction='vertical' align='center'>
            <Image
              height={200}
              src={withSms ? SmsImage : CallImage}
              alt='Иллюстрация верификации телефона'
            />
            <Paragraph className={css.verification__title} level={4}>
              {withSms ? (
                <div>
                  Отправили вам на номер&nbsp;
                  <span className={css.verification__phone}>
                    {applicationS.application.agent_phone}
                  </span>{' '}
                  код в СМС-сообщении. Введите его ниже
                </div>
              ) : (
                <div>
                  На ваш номер телефона&nbsp;
                  <span className={css.verification__phone}>
                    {applicationS.application.agent_phone}
                  </span>{' '}
                  поступит звонок, не берите трубку, просто укажите последние четыре цифры номера, с
                  которого поступил звонок:
                </div>
              )}
            </Paragraph>
            <VerificationCodeForm
              form={form}
              isReadyToVerifyWithSms={false}
              countdownValue={
                countdownValue(verificationCodeData?.resend_timeout) as unknown as string
              }
              onResendCodeClick={() => confirmPhone(withSms)}
              onCountdownFinish={() =>
                setVerificationCodeData((prev) => (prev ? { ...prev, resend_timeout: 0 } : prev))
              }
              onVerificationCodeComplete={(value) => successCode(value)}
              isResendAvailable={!verificationCodeData?.resend_timeout}
              actionElement={<Button onClick={prev}>назад</Button>}
            />
            <Button
              disabled={!!verificationCodeData?.resend_timeout}
              onClick={() => setWithSms((prev) => !prev)}
              size='small'
              type='text'
              style={{ marginTop: '6px' }}
            >
              Получить код с помощью {!withSms ? 'СМС' : 'звонка'}
            </Button>
          </Space>
        </Col>
        <Col xl={6} md={8} span={0}>
          <DreamerHints
            text={
              'Если это неверный номер, вернитесь к созданию заявки и укажите другой номер в разделе «Контакты»'
            }
          />
        </Col>
      </Row>
    </Spin>
  );
});

const TechnicalSupport = () => {
  return (
    <Row className={css.container}>
      <Col md={10} span={24}>
        <Space direction={'vertical'} align={'center'} className={css.support} size={24}>
          <TechnicalSupportErrorIcon />
          <Paragraph level={4}>
            Мы не смогли отправить вам код.
            <br /> Свяжитесь с Технической поддержкой чтобы решить эту проблему
          </Paragraph>
          <Button type={'primary'} href={APP_ROUTES.TECHNICAL_SUPPORT.toString()}>
            Техническая поддержка
          </Button>
        </Space>
      </Col>
    </Row>
  );
};
