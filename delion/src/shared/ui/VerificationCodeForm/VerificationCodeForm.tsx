import type { ReactNode } from 'react';
import type { FormInstance } from 'antd';
import { Form, Space, Statistic } from 'antd';
import type { valueType } from 'antd/es/statistic/utils';
import dayjs from 'dayjs';
import { Paragraph } from '@shared/ui';
import { Button } from '@shared/ui/Button/Button';
import { Input } from '@shared/ui/LegacyInput';
import css from './VerificationCodeForm.module.scss';

export type VerificationCodeFormProps = {
  /* Инстанс формы */
  form: FormInstance;
  /* Время отсчёта */
  countdownValue: valueType;
  /* Готовы ли снова отправить код */
  isResendAvailable: boolean;
  /* Готовы отобразить экшен для отправки кода через смс */
  isReadyToVerifyWithSms: boolean;
  /* Колбек для отправки кода с параметром через смс или звонок */
  onResendCodeClick(isSms: boolean): Promise<void> | void;
  /* Колбек если счетчик закончил отсчёт */
  onCountdownFinish(): Promise<void> | void;
  /* Колбек если были введены все символы */
  onVerificationCodeComplete(value: string): Promise<void> | void;
  /* элемент, который находиться рядом с кнопкой  Отправить снова */
  actionElement?: ReactNode;
};

export const countdownValue = (v?: number) => (v ? dayjs().add(v || 0, 's') : 0);

export const VerificationCodeForm = (props: VerificationCodeFormProps) => {
  const {
    form,
    onVerificationCodeComplete,
    onCountdownFinish,
    countdownValue,
    onResendCodeClick,
    isResendAvailable,
    isReadyToVerifyWithSms,
  } = props;

  return (
    <Form form={form} className={css.form}>
      <Input
        type='verificationCode'
        name='verificationCode'
        verificationCodeInputProps={{
          onComplete: onVerificationCodeComplete,
          placeholder: '_',
        }}
      />
      <div className={css.countdownWrapper}>
        <Statistic.Countdown
          title={'Вы сможете отправить код снова через'}
          value={countdownValue}
          format={'mm:ss'}
          rootClassName={css.countdown}
          onFinish={onCountdownFinish}
          valueRender={(node) => <Paragraph>{node}</Paragraph>}
        />
        <Space style={{ justifyContent: 'center' }} align={'center'}>
          {props.actionElement}
          <Button
            size='middle'
            type='primary'
            onClick={() => onResendCodeClick(false)}
            disabled={!isResendAvailable}
            className={css.button}
          >
            Отправить снова
          </Button>
        </Space>
      </div>
      {isReadyToVerifyWithSms && (
        <Button
          size='small'
          type='link'
          disabled={!isResendAvailable}
          onClick={() => onResendCodeClick(true)}
          style={{ marginTop: '6px', border: '0' }}
        >
          Получить код с помощью СМС
        </Button>
      )}
    </Form>
  );
};
