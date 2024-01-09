import { GetStaticProps } from "next";
import { AuthLayout } from "../../src/componentPages/autn/authLayout";
import { SignInTab } from "../../src/componentPages/autn/signin";

export default function SigninPage() {
  return (
    <AuthLayout>
      <SignInTab />
    </AuthLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
