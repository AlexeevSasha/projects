import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ThemeContext } from "../../../core/themeProvider";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { IAcademyInfrastructureAbout } from "../../../api/dto/IAcademyInfrastructure";

interface IProps {
  about?: IAcademyInfrastructureAbout;
}

export const AboutInfrasctructure = ({ about }: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      <Title>{getLocalValue(about?.title, locale)}</Title>

      <GridContainer>
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(about?.text1, locale) }} />
        <Text dangerouslySetInnerHTML={{ __html: getLocalValue(about?.text2, locale) }} />
      </GridContainer>

      <ImgContainer>
        <NextImage src={about?.images[isDarkTheme ? "dark" : "light"] || ""} />
      </ImgContainer>
    </>
  );
};

const Title = styled.h3`
  font-size: 3.23vw;
  margin: 0 0 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    margin: 0 0 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 4.27vw;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-gap: 4.27vw;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.grayLight_grayDark};
  font-size: 1.25vw;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const ImgContainer = styled.div`
  margin: 1.09vw auto 5.73vw;
  width: 52.29vw;
  height: 32.55vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 91.26vw;
    height: 56.84vw;
    margin: 8.6vw auto 7.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 88.96vw;
    height: 55.36vw;
    margin: 12.01vw auto 18.88vw;
  }
`;
