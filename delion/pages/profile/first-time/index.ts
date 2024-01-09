import { FirstTimePage } from '@pages/auth/first-time-page';

export function getServerSideProps() {
  return {
    props: {
      customLayout: true,
    },
  };
}

export default FirstTimePage;
