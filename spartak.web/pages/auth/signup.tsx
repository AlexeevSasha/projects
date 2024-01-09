import { GetStaticProps } from "next";
import React from "react";
import { AuthLayout } from "../../src/componentPages/autn/authLayout";
import { Signup } from "../../src/componentPages/autn/signup";

export default function SignupPage() {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
