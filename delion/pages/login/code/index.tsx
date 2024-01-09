import { VerificationCodePage } from '@pages/auth/verification-code-page';

export function getServerSideProps() {
  return {
    props: {
      customLayout: true,
    },
  };
}

export default VerificationCodePage;
