import { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@shared/const';
import { useStores } from '@shared/lib';
import { Button } from '@shared/ui';
import { Input } from '@shared/ui/LegacyInput';
import css from './LoginForm.module.scss';

const ADDON_BEFORE = '+7';

type TProps = {
  authWithPass: boolean;
  setAuthWithPass: (state: boolean) => void;
};

export const LoginForm = observer((props: TProps) => {
  const [isReadyToProceedAuth, setIsReadyToProceedAuth] = useState(false);
  const { setAuthWithPass, authWithPass } = props;

  const [form] = Form.useForm();
  const { authS } = useStores();
  const router = useRouter();

  const onImmidateValidation = useCallback(
    (isValid: boolean) => {
      const phoneValue = form.getFieldValue('phone');
      setIsReadyToProceedAuth(isValid && phoneValue);
    },
    [form],
  );

  const handleLogin = useCallback(
    (type: 'pass' | 'code') => {
      const phoneValue = form.getFieldValue('phone');
      const passValue = form.getFieldValue('password');

      authS.setAuthPhone(phoneValue);

      if (type === 'pass') {
        setAuthWithPass(true);

        if (authWithPass) {
          form.validateFields().then(() => {
            if (phoneValue && passValue) {
              authS.signInByPass({ username: phoneValue, password: passValue }).then(() => {
                if (authS.request.signInByPassword.result.status) {
                  router.replace(authS.afterLoginUrlBasedOnRole);
                }
              });
            }
          });
        }
      }

      if (type === 'code') {
        form.validateFields(['phone']).then(() => {
          if (phoneValue) {
            authS.verifyPhone({ phone: phoneValue, is_sms: false }).then(() => {
              router.push(
                {
                  pathname: APP_ROUTES.LOGIN_CODE.toString(),
                  query: router.query,
                },
                APP_ROUTES.LOGIN_CODE.toString(),
              );
            });
          }
        });
      }
    },
    [authS, authWithPass, form, router],
  );

  const onSwitchLoginType = useCallback(() => {
    setAuthWithPass(!authWithPass);
  }, [authWithPass]);

  useEffect(() => {
    if (authS.authData?.phone) {
      form.setFieldValue('phone', authS.authData.phone);
      setIsReadyToProceedAuth(true);
    }
  }, [authS?.authData?.phone, form]);

  return (
    <Form form={form} className={css.form}>
      <Input
        mask={{
          mask: '(000) 000 - 00 - 00',
          maskError: 'Введите корректный номер телефона',
          pattern: /^\(9\d{2}\) \d{3} - \d{2} - \d{2}$/,
        }}
        onImmidateValidation={onImmidateValidation}
        validateTriggers={['onChange', 'onBlur']}
        type='phone'
        placeholder='(000) 000 - 00 - 00'
        name='phone'
        rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}
        colProps={{ style: { padding: '0', textAlign: 'left' } }}
        phoneInputProps={{
          addonBefore: ADDON_BEFORE,
        }}
      />
      {authWithPass && (
        <Input
          type='password'
          name='password'
          placeholder='Пароль'
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          colProps={{ style: { padding: '0', textAlign: 'left' } }}
        />
      )}
      <div className={css.buttons}>
        <Button
          disabled={!isReadyToProceedAuth}
          type='primary'
          htmlType='submit'
          onClick={() => handleLogin(authWithPass ? 'pass' : 'code')}
          style={{ width: '100%' }}
        >
          Войти
        </Button>
        <Button type='link' onClick={onSwitchLoginType}>
          Войти с {authWithPass ? 'кодом' : 'паролем'}
        </Button>
      </div>
    </Form>
  );
});
