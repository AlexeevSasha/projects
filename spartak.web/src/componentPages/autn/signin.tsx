import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { theme } from "../../assets/theme/theme";
import { SignIn } from "../signin/components/signin";
import { AuthState } from "./authModal";

type Props = {
  setState?: (callBack: (state: AuthState) => AuthState) => void;
};

export const SignInTab = ({ setState }: Props) => {
  const { locale = "ru" } = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Container>
      <HeaderWrapper>
        <Header>{lang[locale].auth.loginToAccount}</Header>

        <RegistrPrompt>
          <span>{lang[locale].auth.dontHaveAccount} </span>
          <Link prefetch={false} href="/auth/signup">
            {lang[locale].auth.register}
          </Link>
        </RegistrPrompt>
      </HeaderWrapper>

      <FormContainer>
        <TabContainer>
          <Tab onClick={() => setActiveTab(1)} active={activeTab === 1}>
            {lang[locale].auth.tab.login}
          </Tab>
          <Tab onClick={() => setActiveTab(2)} active={activeTab === 2}>
            {lang[locale].auth.tab.phone}
          </Tab>
        </TabContainer>

        {activeTab === 1 ? <SignIn.LoginForm setState={setState} /> : null}

        {activeTab == 2 ? <SignIn.PhoneForm /> : null}
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: block;
  }
`;

const HeaderWrapper = styled.div`
  width: 19.7vw;
  margin-bottom: 1.04vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 5.33vw;
  }
`;

const Header = styled.h1`
  font-family: "FCSM Text", sans-serif;
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;
  font-size: 1.66vw;
  line-height: 1.3em;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 500;
    font-size: 6.4vw;
  }
`;

const RegistrPrompt = styled.div`
  font-size: 0.83vw;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  width: 100%;
  margin-top: 1.25vw;

  & > *:last-child {
    margin-left: 0.4vw;
    color: ${({ theme }) => theme.colors.white_red};
    text-transform: capitalize;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.08vw;
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.26vw;
    margin-top: 4.26vw;
  }
`;

const FormContainer = styled.div``;

const TabContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.white_black};
  font-family: "FCSM Text";
  font-weight: 600;
`;

const Tab = styled.div<{ active?: boolean }>`
  text-transform: uppercase;
  font-size: 0.73vw;
  padding: 0.83vw 1.67vw;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? `4px solid ${theme.colors.red}` : "")};
  margin-bottom: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 4.17vw;
    font-size: 1.83vw;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 4.27vw;
    font-size: 3.2vw;
    margin-top: 6.4vw;
    margin-bottom: 6.4vw;
  }
`;
