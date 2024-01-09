import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import Apple from "../../assets/icon/apple.svg";
import { Close } from "../../assets/icon/close";
import Fb from "../../assets/icon/fb.svg";
import Google from "../../assets/icon/google.svg";
import Twitter from "../../assets/icon/Twitter.svg";
import Vk from "../../assets/icon/vk.svg";
import { theme } from "../../assets/theme/theme";
import { NextImage } from "../../ui/nextImage/nextImage";
import { IconImage } from "../IconImage";

type Props = {
  onClose?: () => void;
  hideSocial?: boolean;
  overflow?: string;
  winline?: boolean;
  isFlex?: boolean;
  hideLogo?: boolean;
};

export const ModalLayout: FC<Props> = ({
  children,
  onClose,
  hideSocial,
  overflow = "auto",
  winline,
  isFlex = false,
  hideLogo = false,
}) => {
  const { locale = "ru" } = useRouter();

  return (
    <FormLayout overflow={overflow} isFlex={isFlex}>
      <div>
        <CrossIcon onClick={onClose} />

        <ImageWrapper>
          {!hideLogo && (
            <SpartakImgContainer>
              <NextImage src={`/images/spartak/${locale}/spartakLogoBlackText.svg`} alt={"Спартак"} />
            </SpartakImgContainer>
          )}
          {winline && (
            <WinlineImgContainer>
              <NextImage src="/images/icon/iconWinline_v1.0.1.svg" />
            </WinlineImgContainer>
          )}
        </ImageWrapper>

        <Content>{children}</Content>

        {!hideSocial && (
          <Social>
            <div>{lang[locale].auth.viaSocialNetwork}</div>

            <div>
              <SocialIcon>
                <IconImage url={Vk.src} width="24px" height="24px" />
              </SocialIcon>

              <SocialIcon>
                <IconImage url={Apple.src} width="24px" height="24px" />
              </SocialIcon>

              <SocialIcon>
                <IconImage url={Fb.src} width="24px" height="24px" />
              </SocialIcon>

              <SocialIcon>
                <IconImage url={Google.src} width="24px" height="24px" />
              </SocialIcon>

              <SocialIcon>
                <IconImage url={Twitter.src} width="24px" height="24px" />
              </SocialIcon>
            </div>
          </Social>
        )}
      </div>
    </FormLayout>
  );
};

export const FormLayout = styled.div<{ overflow: string; isFlex: boolean }>`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  position: relative;
  background: ${theme.colors.white};
  padding: 3.33vw 4vw;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  max-height: 90vh;
  overflow: ${({ overflow }) => overflow};
  width: ${({ isFlex }) => (isFlex ? "auto" : "31.044vw")};
  appearance: unset;
  justify-content: stretch;
  color: ${theme.colors.black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 90vw;
    padding: 8.34vw 15.64vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: calc(4.27vw + 30px) 4.27vw; /* Отступ от верха и низа на мобильных телефонах с учётом шапки и подвала с кнопками */
    max-height: unset;
    height: 100vh;
    width: 100vw;
  }

  & > div {
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  /** кастомная полоса скрола для попапов  */
  &::-webkit-scrollbar {
    width: 6px;
    /* height: 5px; */
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background-color: #dce1ea;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #dce1ea;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a5acb8;
    border-radius: 34px;
  }
  &::-webkit-scrollbar-corner {
    background-color: #dce1ea;
  }
`;

const Content = styled.div`
  margin-top: 1.25vw;
  display: flex;
  flex-flow: column;
  align-items: stretch;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 5vw;
  }

  & .submitBtn {
    font-size: 0.73vw;
    height: 2.4vw;
    width: 100%;
    padding: 0;
    box-sizing: border-box;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 1.83vw;
      height: 6vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 3.73vw;
      height: 11.73vw;
    }
  }
`;

export const CrossIcon = styled(Close)`
  position: absolute;
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.25vw;
  flex: 1 0;
  right: 1.25vw;
  top: 1.25vw;

  &:hover {
    opacity: 0.5;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    right: 3.13vw;
    top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    position: unset;
  }
`;

const Social = styled.div`
  align-self: center;
  margin-top: 40px;
  width: 100%;

  & > div:first-child {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    line-height: 20px;
    color: ${theme.colors.grayDark};
    margin-bottom: 24px;
    text-align: center;
  }
  & > div:last-child {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${theme.colors.lightBlue};
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 6.4vw;
  }
`;

export const SpartakImgContainer = styled.div`
  width: 11.35vw;
  height: 3.13vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 28.42vw;
    height: 7.95vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 49.13vw;
    height: 13.27vw;
  }
`;

const WinlineImgContainer = styled.div`
  width: 7.1875vw;
  height: 1.77vw;
  margin-left: 24px;
  align-self: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 18vw;
    height: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 36.8vw;
    height: 9vw;
  }
`;
