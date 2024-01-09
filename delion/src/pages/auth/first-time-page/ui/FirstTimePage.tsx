import { useRouter } from 'next/router';
import { FirstTimeForm } from '@features/auth';
import RegisterAuth from '@shared/assets/auth/register-auth.svg';
import { Paragraph } from '@shared/ui';
import { AuthLayout } from '@widgets/layout';

export const FirstTimePage = () => {
  const router = useRouter();

  return (
    <>
      <AuthLayout
        image={RegisterAuth}
        form={<FirstTimeForm />}
        title={
          <Paragraph level={4}>
            Похоже, вы здесь впервые.
            <br />
            Введите ваше имя
          </Paragraph>
        }
        onBack={() => router.push('/')}
      />
    </>
  );
};
