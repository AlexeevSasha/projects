import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { IAboutStadium } from "../../../api/dto/IAboutStadion";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { lang } from "../../../../public/locales/lang";

interface IProps {
  achievementsData?: IAboutStadium["achievements"];
}

export const Achievements = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  const achievementsCards = useMemo(
    () =>
      props?.achievementsData?.list?.map((elem, index: number) => (
        <React.Fragment key={index}>
          {getLocalValue(elem.year, locale) ||
          getLocalValue(elem.description, locale) ||
          getLocalValue(elem.reward, locale) ? (
            <InfoBlock>
              <Years>{getLocalValue(elem.year, locale)}</Years>
              <Description>{getLocalValue(elem.description, locale)}</Description>
              <Award>{getLocalValue(elem.reward, locale)}</Award>
            </InfoBlock>
          ) : null}
        </React.Fragment>
      )),
    [props?.achievementsData]
  );

  return props.achievementsData ? (
    <>
      <ContainerWithBackgroundImg
        gradient={theme.gradients.first}
        position={"center"}
        src={getLocalValue(props?.achievementsData?.img, locale) || ""}
      >
        <Title>{lang[locale].pageAboutStadium.achievementsTitle}</Title>
      </ContainerWithBackgroundImg>

      <StyledContentContainer>
        <AchievementsBlock>{achievementsCards}</AchievementsBlock>
      </StyledContentContainer>
    </>
  ) : null;
};

const Title = styled.h2`
  display: flex;
  align-items: end;
  color: ${theme.colors.white};
  z-index: 10;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  padding: 21.88vw 0 6.77vw;
  margin: auto;
  width: 82.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding: 26.86vw 0 13.3vw;
    width: 93.87vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    white-space: unset;
    font-size: 8.53vw;
    padding: 35.73vw 0 21.87vw;
    width: 91.47vw;
  }
`;

const StyledContentContainer = styled(ContainerContent)`
  position: relative;
  top: -4.69vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: -7.82vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: -10vw;
  }
`;

const AchievementsBlock = styled.div`
  display: grid;
  gap: 1.25vw;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const InfoBlock = styled.p`
  background: ${({ theme }) => theme.colors.blackLight_red};
  font-family: "FCSM Text", sans-serif;
  padding: 1.25vw;
  margin: 0;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.27vw 2.13vw;
  }
`;

const Years = styled.span`
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  padding-bottom: 1.25vw;
  color: ${theme.colors.white};
  border-bottom: 0.05vw solid ${({ theme }) => theme.colors.red_white};
  width: 100%;
  display: block;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const Description = styled.span`
  display: block;
  margin: 1.32vw 0;
  color: ${({ theme }) => theme.colors.gray_white};
  font-size: 0.83vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    margin: 4.27vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const Award = styled.span`
  display: block;
  margin: 0;
  color: ${({ theme }) => theme.colors.red_white};
  font-size: 0.83vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;
