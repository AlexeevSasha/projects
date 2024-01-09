import { useRouter } from "next/router";
import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { IMatchDto } from "../../api/dto/IMatchDto";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { LineMatchInfo } from "../../componentPages/pageMatchInfo/lineMatchInfo/lineMatchInfo";
import { DataContext } from "../../core/dataProvider";
import { checkImgFunk } from "../../helpers/checkImgFunk";
import { showHours } from "../../helpers/showHours";
import { NextImage } from "../../ui/nextImage/nextImage";
import { CoefficientWinline } from "../coefficientWinline/coefficientWinline";
import { ContainerContent } from "../containers/containerContent";
import { ContainerWithBackgroundImg } from "../containers/containerWithBackgroundImg";
import { WinlineBunner } from "../winlineBanner";

interface IProps {
  match?: IMatchDto;
  hideLine?: boolean;
  componentInHideLine?: ReactElement;
  bannerSrc?: string;
}

export const SectionMatchInfo = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { data: { teams: ownTeams = [] } = {} } = useContext(DataContext);
  const ownTeamIsHome = !!ownTeams?.find((team) => team.Id === props.match?.HomeTeam?.Id);

  return (
    <ContainerWithBackgroundImg
      gradient={theme.gradients.pastMatch}
      src={props.bannerSrc ?? "/images/matches/matchesBackgroundImg_v1.0.0.jpg"}
      position="center"
    >
      <Container>
        <TurTitle>
          {props.match?.Round?.Name && getLocalValue(props.match?.Round?.Name, locale) + " | "}
          {getLocalValue(props.match?.Tournament, locale)}
        </TurTitle>

        <MatchDate>{props.match?.Date ? showHours(props.match?.Date, locale) : ""}</MatchDate>

        <CommandsBlock>
          <Command>
            <ImgContainer>
              {props.match?.HomeTeam?.Logo && checkImgFunk(props.match?.HomeTeam?.Logo) ? (
                <ImgDiv isOurTeam={!!ownTeams.find((team) => team.Id === props.match?.HomeTeam?.Id)}>
                  <NextImage
                    src={props.match?.HomeTeam?.Logo}
                    loading="lazy"
                    alt={getLocalValue(props.match?.HomeTeam?.Name, locale)}
                  />
                </ImgDiv>
              ) : (
                <ImgPlug />
              )}
            </ImgContainer>
            {getLocalValue(props.match?.HomeTeam?.Name, locale)}
          </Command>

          <Scope>
            <div>
              {props.match?.Scores?.Home} : {props.match?.Scores?.Guest}
            </div>

            <PenaltyText>
              {props.match?.PenaltyShootoutScores
                ? `(${props.match?.PenaltyShootoutScores.Home} : ${props.match?.PenaltyShootoutScores.Guest} ${lang[
                    locale
                  ].matchInfo.penalty.toUpperCase()})`
                : null}
            </PenaltyText>

            <DescriptionBlock>
              <Stadium>{getLocalValue(props.match?.Stadium, locale)}</Stadium>
            </DescriptionBlock>
          </Scope>

          <Command>
            <ImgContainer>
              {props.match?.GuestTeam?.Logo && checkImgFunk(props.match?.GuestTeam?.Logo) ? (
                <ImgDiv isOurTeam={!!ownTeams.find((team) => team.Id === props.match?.GuestTeam?.Id)}>
                  <NextImage
                    src={props.match?.GuestTeam?.Logo}
                    loading="lazy"
                    alt={getLocalValue(props.match?.GuestTeam?.Name, locale)}
                  />
                </ImgDiv>
              ) : (
                <ImgPlug />
              )}
            </ImgContainer>

            {getLocalValue(props.match?.GuestTeam?.Name, locale)}
          </Command>
        </CommandsBlock>

        <PhoneScope>
          <MatchDatePhone>{props.match?.Date ? showHours(props.match?.Date, locale) : ""}</MatchDatePhone>

          <Stadium>{getLocalValue(props.match?.Stadium, locale)}</Stadium>
        </PhoneScope>

        {props.match?.Coefficient && props.match?.IsLive && Object.keys(props.match?.Coefficient).length > 0 && (
          <WinlineBlock>
            <CoefficientWinline size="lg" coefficient={props.match?.Coefficient} ownTeamIsHome={ownTeamIsHome} />

            {props.match.Coefficient?.EventUrl && (
              <WinlineButton>
                <WinlineBunner matchDate={props.match?.Date} eventUrl={props.match.Coefficient?.EventUrl} />
              </WinlineButton>
            )}
          </WinlineBlock>
        )}

        {props.hideLine ? (
          <EmptyBlock>{props.componentInHideLine}</EmptyBlock>
        ) : (
          <ContainerHorizontalScroll>
            <LineMatchInfo matchInfo={props.match} />
          </ContainerHorizontalScroll>
        )}
      </Container>
    </ContainerWithBackgroundImg>
  );
};

const Container = styled(ContainerContent)`
  display: flex;
  flex-direction: column;
  margin: 1.25vw auto;
  z-index: 2;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw auto 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto 6.4vw;
  }
`;

const TurTitle = styled.h3`
  color: ${theme.colors.grayLight};
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  padding-bottom: 0.42vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    padding-bottom: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding-bottom: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    padding-bottom: 4.27vw;
  }
`;

const CommandsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 7.29vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    gap: 0;
  }
`;

const Command = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
    font-family: "FCSM Text", sans-serif;
  }
`;

const ImgContainer = styled.div`
  height: 11.46vw;
  width: 11.46vw;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 17.99vw;
    width: 17.99vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 23.47vw;
    width: 23.47vw;
  }
`;

const ImgDiv = styled.div<{ isOurTeam?: boolean }>`
  height: ${({ isOurTeam }) => (isOurTeam ? "100%" : "65%")};
  width: ${({ isOurTeam }) => (isOurTeam ? "100%" : "65%")};
`;

const ImgPlug = styled.div`
  height: 80%;
  width: 80%;
`;

const Scope = styled.div`
  color: ${theme.colors.white};
  font-size: 6.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  width: fit-content;
  padding: 1.25vw 2.5vw;
  white-space: nowrap;
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 6.26vw;
    font-size: 9.39vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: center;
    padding: 2.13vw 4.26vw;
    font-size: 8.53vw;
  }
`;

const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 1.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const MatchDate = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const PhoneScope = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    color: ${theme.colors.white};
    font-family: "FCSM Text", sans-serif;
    padding: 2.13vw 4.26vw;
    font-size: 8.53vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }
`;

const MatchDatePhone = styled.p`
  margin: 0;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  font-size: 4.8vw;
`;

const Stadium = styled(TurTitle)`
  display: flex;
  justify-content: center;
  padding: 1.25vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    text-align: center;
    white-space: break-spaces;
    padding: 0;
  }
`;
const ContainerHorizontalScroll = styled.div`
  width: 100%;
  overflow: visible;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    overflow-x: auto;
    overflow-y: visible;
  }
`;

const EmptyBlock = styled.span`
  position: relative;
  height: 7.81vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 14.86vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 12.27vw;
  }
`;

const WinlineBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WinlineButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding-top: 0.84vw;
  width: 26.67vw;
  height: 2.71vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 2.09vw;
    width: 66.75vw;
    height: 6.78vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    max-width: 91.47vw;
    height: 10.67vw;
  }
`;
const PenaltyText = styled.p`
  margin-top: 0;
  font-size: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 3.2vw;
  }
`;
