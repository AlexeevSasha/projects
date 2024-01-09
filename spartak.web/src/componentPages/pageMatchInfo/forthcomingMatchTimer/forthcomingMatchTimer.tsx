import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CoefficientWinline } from "../../../components/coefficientWinline/coefficientWinline";
import { ContainerContent } from "../../../components/containers/containerContent";
import { ContainerWithBackgroundImg } from "../../../components/containers/containerWithBackgroundImg";
import { Timer as TimerComponent } from "../../../components/timer";
import { WinlineBunner } from "../../../components/winlineBanner";
import { DataContext } from "../../../core/dataProvider";
import { checkImgFunk } from "../../../helpers/checkImgFunk";
import { showHours } from "../../../helpers/showHours";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { ColumnButton } from "../../pageMatches/matchTableInfo/componentRowMatchInfo/columnButton";

interface IProps {
  match: IMatchDto;
}

export const ForthcomingMatchTimer = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { data: { teams: ownTeams = [] } = {} } = useContext(DataContext);
  const ownTeamIsHome = !!ownTeams?.find((team) => team.Id === props.match?.HomeTeam?.Id);
  // const winlineBunner = useMemo(() => {
  //   const daysLeft = Math.floor((+new Date(props.match.Date) - getTimeZoneOffset() - getUtcDateNow()) / 86400000);

  //   return daysLeft <= 1 ? (
  //     <NextLink url={props.match.Coefficient?.EventUrl + "?utm_source=fcspartak&utm_medium=odds&utm_content=odds"}>
  //       <WinlineButton>
  //         <NextImage src="/images/winlineBanner/winlineButton_v1.0.0.jpg" alt="winline" />
  //       </WinlineButton>
  //     </NextLink>
  //   ) : daysLeft <= 5 ? (
  //     <NextLink url={props.match.Coefficient?.EventUrl + "?utm_source=fcspartak&utm_medium=odds&utm_content=odds"}>
  //       <WinlineButton>
  //         <NextImage src="/images/winlineBanner/winlineFribet_v1.0.0.jpg" alt="winline" />
  //       </WinlineButton>
  //     </NextLink>
  //   ) : null;
  // }, [props.match.Date]);

  return (
    <ContainerWithBackgroundImg
      gradient={theme.gradients.first}
      src={"/images/matchResultHeader.background_v1.0.0.png"}
      position="center"
    >
      <MainContainer>
        <TurTitle>
          {props.match?.Round?.Name && getLocalValue(props.match?.Round?.Name, locale) + " | "}
          {getLocalValue(props.match?.Tournament, locale)}
        </TurTitle>

        <MatchDate>{showHours(props.match?.Date, locale)}</MatchDate>

        <Container>
          <CommandsBlock>
            <Command>
              <ImgContainer>
                {props.match?.HomeTeam?.Logo && checkImgFunk(props.match?.HomeTeam?.Logo) ? (
                  <ImgDiv isOurTeam={ownTeams && !!ownTeams.find((team) => team.Id === props.match?.HomeTeam?.Id)}>
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

              <TeamName>{getLocalValue(props.match?.HomeTeam?.Name, locale)}</TeamName>
            </Command>

            <TimerAndButton>
              <Timer>
                {props.match?.Date && (
                  <TimerComponent
                    endTime={props.match.Date}
                    format={+new Date(props.match.Date) - Date.now() > 86400000 ? "dddd : HH : mm" : "HH : mm : ss"}
                  />
                )}
                {+new Date(props.match.Date) - Date.now() > 86400000 ? (
                  <TypeTimeContainer>
                    <span>{lang[locale].typeTimerList.days}</span>
                    <span>{lang[locale].typeTimerList.hours}</span>
                    <span>{lang[locale].typeTimerList.minutes}</span>
                  </TypeTimeContainer>
                ) : (
                  <TypeTimeContainer>
                    <span>{lang[locale].typeTimerList.hours}</span>
                    <span>{lang[locale].typeTimerList.minutes}</span>
                    <span>{lang[locale].typeTimerList.seconds}</span>
                  </TypeTimeContainer>
                )}
              </Timer>

              <TabletContainer>
                <MatchBtn
                  typeMatch={"new"}
                  type={props.match?.ButtonEnum}
                  matchInStatId={props.match?.EventId}
                  size="big"
                />

                <Stadium>{getLocalValue(props.match?.Stadium, locale)}</Stadium>
              </TabletContainer>
            </TimerAndButton>

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
              <TeamName>{getLocalValue(props.match?.GuestTeam?.Name, locale)}</TeamName>
            </Command>
          </CommandsBlock>
        </Container>

        <MobileContainer>
          <MatchBtn typeMatch={"new"} type={props.match?.ButtonEnum} matchInStatId={props.match?.EventId} size="big" />

          <StadiumAndDate>
            <Stadium>{getLocalValue(props.match?.Stadium, locale)}</Stadium>
          </StadiumAndDate>
        </MobileContainer>

        <LastBlock>
          {props.match?.Coefficient && Object.keys(props.match?.Coefficient).length > 0 && (
            <>
              <CoefficientWinline size="lg" coefficient={props.match?.Coefficient} ownTeamIsHome={ownTeamIsHome} />

              {props.match.Coefficient?.EventUrl && (
                <WinlineButton>
                  <WinlineBunner matchDate={props.match?.Date} eventUrl={props.match.Coefficient?.EventUrl} />
                </WinlineButton>
              )}
            </>
          )}
        </LastBlock>
      </MainContainer>
    </ContainerWithBackgroundImg>
  );
};

const MainContainer = styled(ContainerContent)`
  display: flex;
  flex-direction: column;
  margin: 2.08vw auto;
  z-index: 2;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 6.26vw auto 4.3vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw 4.27vw 6.4vw;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TabletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;
const StadiumAndDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2.13vw;
`;

const MobileContainer = styled.div`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
    width: 100%;
    padding: 4.27vw;
    justify-content: space-between;
    font-size: 4.27vw;
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
`;

const Stadium = styled(TurTitle)`
  display: flex;
  justify-content: center;
  padding: 1.25vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.09vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: flex-start;
    padding: 0;
  }
`;

const CommandsBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.15fr 1fr;
  align-items: flex-start;
  justify-items: center;
  padding-top: 0.84vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 100%;
    padding-top: 2.09vw;
    gap: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 4.27vw;
  }
`;
const TeamName = styled.p`
  margin: 0;
  text-align: center;
  font-size: 2.08vw;
  font-weight: 700;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    font-weight: 500;
  }
`;
const LastBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const TimerAndButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 13.33vw;
  }
`;

const Timer = styled.div`
  /* width: 18.49vw; */
  white-space: nowrap;
  color: ${theme.colors.red};
  font-size: 3.23vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  padding: 2.44vw 0 1.25vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 25.34vw;
    font-size: 5.22vw;
    padding: 3.13vw 0 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 22vw;
    font-size: 4.27vw;
    padding: 0;
  }
`;

const TypeTimeContainer = styled.div`
  font-weight: 400;
  font-size: 0.63vw;
  color: ${theme.colors.gray};
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
  width: 15.63vw;

  span:first-child {
    text-align: left;
    padding-left: 1.23vw;
  }
  span:nth-child(2n) {
    text-align: center;
  }
  span:last-child {
    text-align: right;
    padding-right: 1.23vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const MatchDate = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${theme.colors.white};
  font-family: "FCSM Text", sans-serif;
  font-size: 2.08vw;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
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

const MatchBtn = styled(ColumnButton)`
  & > div[type="opacity"] {
    color: ${theme.colors.white};
    border-color: ${theme.colors.white};

    & svg path {
      fill: ${theme.colors.white};
    }
  }
`;
