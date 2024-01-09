import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { ContainerContent } from "../../../components/containers/containerContent";
import { Input } from "../../../components/input/input";
import { subscribeMedia } from "../../../api/subscribeMedia";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { MessageModal } from "../../../components/modal/messageModal";
import { ThemeContext } from "../../../core/themeProvider";
import { NextImage } from "../../../ui/nextImage/nextImage";

export const Subscribe = () => {
  const { locale = "ru" } = useRouter();
  const [subscriptionValue, setSubscriptionValue] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState<string | undefined>(undefined);
  const { isDarkTheme } = useContext(ThemeContext);

  const onSubscribe = () => {
    if (subscriptionValue) {
      setLoading(true);
      subscribeMedia
        .subscribeMediaRequest(subscriptionValue)
        .then(() => (setModalText(lang[locale].mainPage.subscribeSuccess), setLoading(false)))
        .catch(() => (setModalText(lang[locale].mainPage.subscribeError), setLoading(false)));
    }
    setModalText(undefined);
    setSubscriptionValue(undefined);
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <ContainerContent>
        <Container>
          {modalText && (
            <MessageModal type="alert" message={modalText} onClose={() => setModalText(undefined)} withoutTimeout />
          )}
          <Title>{lang[locale].mainPage.subscribeQuestion}</Title>

          <StyledForm>
            <StyledInput
              value={subscriptionValue}
              onChange={(e) => setSubscriptionValue(e.target.value)}
              placeholder={lang[locale].mainPage.subscribeEnterEmail}
              lightStyle={!isDarkTheme}
            />

            <StyledButton type={"red"} onClick={onSubscribe}>
              {lang[locale].mainPage.subscribe}
            </StyledButton>
          </StyledForm>

          <Description>{lang[locale].mainPage.subscribeAgreement}</Description>

          <ImageContainer>
            <NextImage src="/images/main/subscribe_v1.0.0.png" />
          </ImageContainer>

          <Anchor id="subscribe" />
        </Container>
      </ContainerContent>
    </>
  );
};

const Container = styled.div`
  margin: 2.7vw 0 5.21vw 0;
  flex-basis: 100%;
  width: -webkit-fill-available;
  user-select: none;
  padding: 2.12vw;
  position: relative;
  background: ${({ theme }) => theme.colors.blackLight_red};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw;
    margin-top: 0;
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 4.27vw 6.4vw;
    margin-bottom: 10.67vw;
  }
`;

const Title = styled.p`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.67vw;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 27.67vw;
    font-size: 4.17vw;
    line-height: 5.48vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    font-weight: 500;
    padding: 0;
    line-height: 9.07vw;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25vw;
  padding: 2.08vw 39.72vw 2.08vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 0;
    width: 100%;
    margin: 0;
    gap: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-flow: column;
    padding: 4.27vw 0;
    box-sizing: border-box;
    gap: 4.27vw;
  }
`;

const Description = styled.p`
  margin: 0;
  font-family: Roboto, sans-serif;
  font-size: 0.94vw;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-right: 35.96vw;
    font-size: 1.56vw;
    line-height: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
    padding-right: 0;
    line-height: 4.8vw;
  }
`;

const ImageContainer = styled.div`
  width: 15.21vw;
  height: 17.14vw;
  position: absolute;
  bottom: 0;
  right: 4.32vw;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const StyledButton = styled(CustomButton)`
  padding: 0.68vw 3.41vw;
  color: ${theme.colors.white};
  border-color: ${({ theme }) => theme.colors.none_white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.7vw 4.21vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.4vw 26.43vw;
  }
`;

const StyledInput = styled(Input)`
  padding: 0.73vw 0.83vw;
  font-size: 0.83vw;
  height: unset;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.76vw 2.09vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.74vw 4.27vw;
    font-size: 4.27vw;
    height: unset;
  }
`;

const Anchor = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  top: -7.81vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: -19.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: -26.67vw;
  }
`;
