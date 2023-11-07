import { Container } from "common/components/Container";
import { getLayout } from "common/components/layout/Layout";
import styled from "astroturf/react";
import { AuthForm } from "modules/auth/components/AuthForm";
import { GetServerSideProps } from "next";
import { getInitialData } from "common/hooks/useInitialData";

export default function AuthPage() {
  return (
    <Container>
      <Wrapper>
        <AuthForm />
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0;
`;

AuthPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { metaTags = {}, ...initialData } = await getInitialData({ pathname: "/auth" });
    return {
      props: {
        initialData: { metaTags, ...initialData },
      },
    };
  } catch {
    return { props: {} };
  }
};
