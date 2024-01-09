import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { useRouter } from "next/router";
import { lang } from "../../../public/locales/lang";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";

export const EmptyCompositionList = () => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Content>
      <Title>{lang[locale].profile.matches.nolineUp}</Title>
      <ImgContainer>
        <NextImage src={`/images/emptyScreen/matches/TShirt${isDarkTheme ? "White" : "Black"}_v1.0.0.png`} alt={"No league table"} />
      </ImgContainer>
      <Text>{lang[locale].profile.matches.lineUpUnknown}</Text>
    </Content>
  );
};

const Content = styled.div`
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  border: 1px solid ${({ theme }) => theme.colors.blackLight_whiteGray};
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  min-height: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-row-gap: 1.25vw;

  & > svg {
    width: 4.17vw;
    height: 4.17vw;
  }
  & path:nth-last-child(1) {
    stroke: ${theme.colors.red};
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
    min-height: auto;
    padding: 10.43vw 0;

    & > svg {
      width: 10.43vw;
      height: 10.43vw;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
    padding: 10.67vw 0;

    & > svg {
      width: 17.07vw;
      height: 17.07vw;
    }
  }
`;

const Title = styled.h5`
  font-size: 2.08vw;
  font-weight: 700;
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
  font-weight: 500;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
`;

const ImgContainer = styled.div`
  width: 4.17vw;
  height: 4.17vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 10.43vw;
    height: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 17.07vw;
    height: 17.07vw;
  }
`;
