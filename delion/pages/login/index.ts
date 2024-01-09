import { LoginPage } from '@pages/auth/login-page';

export function getServerSideProps() {
  return {
    props: {
      customLayout: true,
    },
  };
}

export default LoginPage;
