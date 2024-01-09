import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import type { IAchievement } from "../../../api/dto/IPlayer";
import { LocaleType } from "../../../api/dto/LocaleType";
import { playerAchievementsKeyIcons } from "../../../assets/constants/playerAchievementsKeyIcons";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerScroll } from "../../../components/containers/containerHorizontalScroll";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  achievements?: IAchievement[];
  biography?: LocaleType;
}

export const PlayerBiography = (props: IProps) => {
  const { locale } = useRouter();
  const t = useMemo(() => lang[locale ?? "ru"], [locale]);

  const biography = useMemo(() => getLocalValue(props?.biography, locale), [props, locale]);

  const achievements = useMemo(
    () =>
      props.achievements?.map((elem, index) => {
        const Icon = playerAchievementsKeyIcons[elem.ImageUrl];

        return (
          <AwardBlock key={Object.keys(elem).toString() + index}>
            <ImgContainer><NextImage src="/images/banners/bgPlayerL_v1.0.0.png" /></ImgContainer>
            <PaddingAwardBlock>
              <Icon />
              <AwardDescription>{getLocalValue(elem.Name, locale)}</AwardDescription>
            </PaddingAwardBlock>
          </AwardBlock>
        );
      }),
    [props, locale]
  );

  return props.biography ? (
    <>
      <BackgroundContainer>
        <Container>
          <MarginContainer>
            <Title>{t.player.biography}</Title>
            <DescriptionBlock>
              <Description
                dangerouslySetInnerHTML={{
                  __html: biography,
                }}
              />
            </DescriptionBlock>
          </MarginContainer>
        </Container>
      </BackgroundContainer>
      <Container>
        <HorizontalScroll>
          <AwardsBlock>{achievements}</AwardsBlock>
        </HorizontalScroll>
      </Container>
    </>
  ) : (
    <></>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin-bottom: 5.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const BackgroundContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.blackLight_white1};
`;

const MarginContainer = styled.div`
  margin: 2.08vw auto;
  display: flex;
  flex-direction: column;
  gap: 2.08vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw auto 3.13vw;
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto 6.4vw;
    gap: 4.27vw;
  }
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;

const DescriptionBlock = styled.div`
  margin: 0;
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const HorizontalScroll = styled(ContainerScroll)`
  margin-top: -5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: -10vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: -15vw;
  }
`;

const AwardsBlock = styled.div`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 3.2vw;
  }
`;

const AwardBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.69vw;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 45.37vw;
    min-height: 21.38vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 75.73vw;
    min-height: 40vw;
  }
`;

const ImgContainer = styled(AwardBlock)`
  position:absolute;
  height: 100%;
`;

const PaddingAwardBlock = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 1.25vw;
  padding: 1.25vw;
  z-index: 1;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.04vw;
    padding: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 6.4vw;
    padding: 4.27vw;
  }
`;

const AwardDescription = styled.span`
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;
  text-transform: uppercase;
  word-wrap: break-word;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
