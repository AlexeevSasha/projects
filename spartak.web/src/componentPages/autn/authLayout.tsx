import { ReCaptchaProvider } from "next-recaptcha-v3";
import { useRouter } from "next/router";
import { Children, cloneElement, FC, useContext, useState } from "react";
import styled from "styled-components";
// import { PageProps } from "../../../pages/_app";
import { Close } from "../../assets/icon/close";
import { theme } from "../../assets/theme/theme";
import { DataContext } from "../../core/dataProvider";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";
import { AuthModal, AuthState } from "./authModal";

// export const getAuthLayout = (page: JSX.Element, props: PageProps) => <AuthLayout {...props}>{page}</AuthLayout>;

export const AuthLayout: FC = ({ children }) => {
  const { locale = "ru" } = useRouter();
  const [state, setState] = useState<AuthState>({});
  const { goBack } = useContext(DataContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const formElement = Children.map(children, (child: any) => cloneElement(child, { setState }));

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} useRecaptchaNet={true}>
      <Container>
        <Content>
          <LogoContainer>
            <NextImage
              src={
                isDarkTheme
                  ? `/images/spartak/${locale}/darkTheme/spartakLogoWhiteText.svg`
                  : `/images/spartak/${locale}/spartakLogoBlackText.svg`
              }
              alt={"Спартак"}
            />
          </LogoContainer>

          {formElement}
        </Content>

        <RedWrapper>
          <RedContainer>
            <NextImage src="/images/auth/bg_v1.0.0.png" objectFit="fill" priority />
          </RedContainer>
        </RedWrapper>

        <CloseWrapper onClick={goBack}>
          <CloseIcon />
        </CloseWrapper>

        {state.form && <AuthModal state={state} setState={setState} onClose={() => setState({})} />}
      </Container>
    </ReCaptchaProvider>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.black_white};
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  display: flex;
  position: relative;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 48vw;
  padding-bottom: 10vh;
  margin-top: 9.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 0;
    padding-bottom: 20vh;
    width: 49.28vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 10vh;
    width: 91.46vw;
  }
`;

const LogoContainer = styled.div`
  position: fixed;
  top: 0;
  margin: 4.16vw 0 2.08vw;
  width: 11.35vw;
  height: 3.18vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    position: relative;
    margin: 9.12vw 0 5.21vw;
    width: 28.42vw;
    height: 7.95vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 18.13vw 0 6.4vw;
    width: 58.13vw;
    height: 16.27vw;
  }
`;

const RedWrapper = styled.div`
  height: 100vh;
  width: 35.41vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 32.33vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const RedContainer = styled.div`
  position: fixed;
  width: 35.41vw;
  top: 0;
  right: 0;
  bottom: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 32.33vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const CloseWrapper = styled.div`
  position: fixed;
  align-self: flex-end;
  cursor: pointer;
  flex: 1 0;
  border: 1px solid ${theme.colors.white};
  padding: 0.73vw;
  right: 8.75vw;
  top: 4.16vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.82vw;
    right: 10.43vw;
    top: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.6vw;
    right: 4.8vw;
    top: 4.8vw;
    background: ${({ theme }) => theme.colors.black_white};
    border: 1px solid ${({ theme }) => theme.colors.white_grayDark1};
  }

  &:hover {
    opacity: 0.5;
  }
`;

const CloseIcon = styled(Close)`
  color: ${theme.colors.white};
  font-size: 1.04vw;
  display: block;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    color: ${({ theme }) => theme.colors.white_grayDark1};
    font-size: 5.33vw;
  }
`;
