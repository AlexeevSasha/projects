import styled from "astroturf/react";
import { AuthForm } from "./AuthForm";

export const AuthModal = () => {
  return (
    <Wrapper>
      <AuthForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 375px;
  padding-top: 4px;
`;
