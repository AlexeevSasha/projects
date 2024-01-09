import { type ReactElement, useState } from 'react';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { LoginForm } from '@features/auth';
import PasswordAuth from '@shared/assets/auth/pass-auth.svg';
import WelcomeAuth from '@shared/assets/auth/welcome-auth.svg';
import { Paragraph } from '@shared/ui';
import { AuthLayout } from '@widgets/layout';

export type AuthPageProps = {
  title: string;
  form: ReactElement;
  onBack?(): void;
};

export const LoginPage = () => {
  const router = useRouter();
  const [authWithPass, setAuthWithPass] = useState(false);

  return (
    <AuthLayout
      title={
        <div>
          <Typography.Title level={5}>Добро пожаловать!</Typography.Title>
          <Paragraph level={4}>Для входа в личный кабинет введите Ваш номер телефона</Paragraph>
        </div>
      }
      image={authWithPass ? PasswordAuth : WelcomeAuth}
      form={<LoginForm authWithPass={authWithPass} setAuthWithPass={setAuthWithPass} />}
      onBack={() => router.back()}
    />
  );
};
