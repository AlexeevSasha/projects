import { ProfileConfirmEmail } from '@pages/profile-page';

export function getServerSideProps() {
  return {
    props: {
      customLayout: true,
    },
  };
}

export default ProfileConfirmEmail;
