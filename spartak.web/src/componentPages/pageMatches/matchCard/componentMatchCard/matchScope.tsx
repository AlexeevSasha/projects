import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IMatchDto } from "../../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { theme } from "../../../../assets/theme/theme";
import { MobileContainer } from "../../../../components/containers/mobileContainer";
import { Timer } from "../../../../components/timer";
import { checkImgFunk } from "../../../../helpers/checkImgFunk";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { ColumnButton } from "../../matchTableInfo/componentRowMatchInfo/columnButton";
import { useContext } from "react";
import { DataContext } from "../../../../core/dataProvider";

interface IProps {
  homeTeam: IMatchDto["HomeTeam"];
  guestTeam: IMatchDto["GuestTeam"];
  score: string;
  penalty: string;
  size: "small" | "big";
  tournament: string;
  matchKind: string;
  stadium: string;
  timer: string;
  typeOfButton?: IMatchDto["ButtonEnum"];
  type?: "tickets";
  matchInStatId?: number;
  hasCoefficient?: boolean;
  ourTeamId?: string;
}

export const MatchScope = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const { data: { teams: ownTeams = [] } = {} } = useContext(DataContext);
  return (
    <>
      <ScopeContainer size={props.size}>
        <Container size={props.size}>
          <CommandContainer>
            {checkImgFunk(props.homeTeam?.Logo) ? (
              <ImageContainer size={props.size} isOurTeam={!!ownTeams.find((team) => team.Id === props.homeTeam?.Id)}>
                <NextImage src={props.homeTeam?.Logo || ""} alt={getLocalValue(props.homeTeam?.Name, locale)} />
              </ImageContainer>
            ) : (
              <PlugImg size={props.size} />
            )}
            <CommandName size={props.size}>{getLocalValue(props.homeTeam?.Name, locale)}</CommandName>
          </CommandContainer>

          <TournamentTimeButtonBlock>
            {props.matchKind !== "Future" ? (
              <>
                <ContainerMatchScope>{props.score}</ContainerMatchScope>
                <ContainerMatchPenalty>{props.penalty}</ContainerMatchPenalty>
              </>
            ) : (
              <>
                <div>
                  <TimeToGame size={props.size}>
                    <Timer
                      endTime={props.timer}
                      format={+new Date(props.timer) - Date.now() > 86400000 ? "dddd : HH : mm" : "HH : mm : ss"}
                    />
                  </TimeToGame>
                  {+new Date(props.timer) - Date.now() > 86400000 ? (
                    <TypeTimeContainer size={props.size}>
                      <span>{lang[locale].typeTimerList.days}</span>
                      <span>{lang[locale].typeTimerList.hours}</span>
                      <span>{lang[locale].typeTimerList.minutes}</span>
                    </TypeTimeContainer>
                  ) : (
                    <TypeTimeContainer size={props.size}>
                      <span>{lang[locale].typeTimerList.hours}</span>
                      <span>{lang[locale].typeTimerList.minutes}</span>
                      <span>{lang[locale].typeTimerList.seconds}</span>
                    </TypeTimeContainer>
                  )}
                </div>
                {(props.matchInStatId && props.typeOfButton === "Buy") || props.typeOfButton === "Taxi" || "Fly" ? (
                  props.size === "small" && !props.hasCoefficient ? null : (
                    <DesktopTabletVisible>
                      <ColumnButton
                        type={props.typeOfButton}
                        typeMatch={"new"}
                        size={props.size}
                        matchInStatId={props.matchInStatId}
                      />
                    </DesktopTabletVisible>
                  )
                ) : null}

                {props.size == "big" ? (
                  <DesktopTabletVisible size={props.size}>
                    <StadiumName>{props.stadium}</StadiumName>
                  </DesktopTabletVisible>
                ) : null}
              </>
            )}
          </TournamentTimeButtonBlock>

          <CommandContainer>
            {checkImgFunk(props.guestTeam?.Logo) ? (
              <ImageContainer size={props.size} isOurTeam={!!ownTeams.find((team) => team.Id === props.guestTeam?.Id)}>
                <NextImage src={props.guestTeam?.Logo || ""} alt={getLocalValue(props.guestTeam?.Name, locale)} />
              </ImageContainer>
            ) : (
              <PlugImg size={props.size} />
            )}
            <CommandName size={props.size}>{getLocalValue(props.guestTeam?.Name, locale)}</CommandName>
          </CommandContainer>
        </Container>

        {props.size === "big" && (
          <MobileContainer>
            <StadiumName>{props.stadium}</StadiumName>
          </MobileContainer>
        )}

        {props.size == "small" ? (
          <DesktopSmallCard>
            <StadiumName>{props.stadium}</StadiumName>
          </DesktopSmallCard>
        ) : null}
      </ScopeContainer>
    </>
  );
};

const ScopeContainer = styled.div<{ size: "small" | "big" }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: ${({ size }) => (size === "big" ? "0 1.25vw 0" : "0 0.83vw 0")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0;
    padding: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
  }
`;

const Container = styled.div<{ size: "small" | "big" }>`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1.5fr;
  align-items: center;
  width: 100%;
  grid-column-gap: ${({ size }) => (size === "big" ? "1.25vw" : "0")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-column-gap: ${({ size }) => (size === "big" ? "3.13vw" : "0")};
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: ${({ size }) => (size === "big" ? "1.07vw" : "0")};
    /* grid-column-gap: 0; */
  }
`;

const CommandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div<{ size: "small" | "big"; isOurTeam?: boolean }>`
  position: relative;
  padding-bottom: 0.73vw;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    switch (props.size) {
      case "small": {
        switch (props.isOurTeam) {
          case true: {
            return css`
              width: 4.58vw;
              height: 4.58vw;
            `;
          }
          case false: {
            return css`
              width: 4.58vw;
              height: 4.58vw;
              & div {
                height: 3.13vw;
                width: 3.13vw;
              }
            `;
          }
        }
      }
      case "big": {
        switch (props.isOurTeam) {
          case true: {
            return css`
              width: 6.25vw;
              height: 6.25vw;
            `;
          }
          case false: {
            return css`
              width: 6.25vw;
              height: 6.25vw;
              & div {
                height: 4.69vw;
                width: 4.69vw;
              }
            `;
          }
        }
      }
      default: {
        return "";
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 1.3vw;
    ${(props) => {
      switch (props.size) {
        case "small": {
          switch (props.isOurTeam) {
            case true: {
              return css`
                width: 11.47vw;
                height: 11.47vw;
              `;
            }
            case false: {
              return css`
                width: 11.47vw;
                height: 11.47vw;
                & div {
                  height: 6.52vw;
                  width: 6.52vw;
                }
              `;
            }
          }
        }
        case "big": {
          switch (props.isOurTeam) {
            case true: {
              return css`
                width: 15.65vw;
                height: 15.65vw;
              `;
            }
            case false: {
              return css`
                width: 15.65vw;
                height: 15.65vw;
                & div {
                  height: 10.43vw;
                  width: 10.43vw;
                }
              `;
            }
          }
        }
        default: {
          return "";
        }
      }
    }};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 2.13vw;
    width: 17.07vw;
    height: 17.07vw;

    div {
      width: ${({ isOurTeam }) => (isOurTeam ? "inherit" : "12vw")};
      height: ${({ isOurTeam }) => (isOurTeam ? "inherit" : "12vw")};
    }
  }
`;

const PlugImg = styled.div<{ size: "small" | "big" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    switch (props.size) {
      case "small": {
        return css`
          width: 4.58vw;
          height: 4.58vw;
        `;
      }
      case "big": {
        return css`
          width: 6.25vw;
          height: 6.25vw;
        `;
      }
      default: {
        return "";
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 15.65vw;
    height: 15.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 17.07vw;
    height: 17.07vw;
  }
`;

const CommandName = styled.div<{ size: "small" | "big" }>`
  text-transform: uppercase;
  text-align: center;
  ${(props) => {
    switch (props.size) {
      case "small": {
        return css`
          font-family: "FCSM Text", sans-serif;
          font-size: 0.63vw;
        `;
      }
      case "big": {
        return css`
          font-family: "FCSM Text", sans-serif;
          font-weight: 700;
          font-size: 0.83vw;
        `;
      }
      default: {
        return "";
      }
    }
  }};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    white-space: break-spaces;
    font-weight: 500;
    font-family: "FCSM Text", sans-serif;
    font-size: 1.56vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.2vw;
  }
`;

const ContainerMatchScope = styled.div`
  color: ${({ theme }) => theme.colors.white_red};
  font-size: 2.08vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  line-height: 2.6vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const ContainerMatchPenalty = styled.p`
  color: ${({ theme }) => theme.colors.white_red};
  white-space: nowrap;
  font-size: 0.73vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.phone}) {
    font-size: 3.73vw;
  }
`;

const TournamentTimeButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 0.52vw;
  }
`;

const TimeToGame = styled.span<{ size: "big" | "small" }>`
  margin: 0;
  /* width: ${(props) => (props.size === "big" ? "10.16vw" : "4.69vw")}; */
  color: ${theme.colors.red};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: ${(props) => (props.size === "big" ? " 2.08vw" : "0.94vw")};
  white-space: nowrap;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    /* width: ${(props) => (props.size === "big" ? "23vw" : "11.73vw")}; */
    font-size: ${(props) => (props.size === "big" ? "5.22vw" : "2.35vw")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    /* width: 30.67vw; */
    font-size: 6.4vw;
  }
`;

const TypeTimeContainer = styled.div<{ size: "big" | "small" }>`
  font-weight: 400;
  font-size: 0.73vw;
  color: ${theme.colors.gray};
  display: ${(props) => (props.size === "big" ? "grid" : "none")};
  justify-content: space-between;
  grid-template-columns: 1fr 1fr 1fr;
  width: 10vw;
  margin: 0 auto;
  span:first-child {
    text-align: left;
  }
  span:nth-child(2n) {
    text-align: center;
  }
  span:last-child {
    text-align: right;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    width: 26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: grid;
    font-size: 2.67vw;
    width: 29.5vw;
  }
`;

const StadiumName = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-weight: 400;
  color: ${theme.colors.gray};
  margin: 0;
  font-size: 0.83vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: break-spaces;
    padding: 0 4.8vw 0;
    /* padding: 0; */
    height: 12.27vw;

    font-size: 4.27vw;
  }
`;

const DesktopTabletVisible = styled.div<{ size?: "small" | "big" }>`
  text-align: center;
  /* width: max-content; */
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 0.4vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: ${({ size }) => (size === "big" ? "none" : "block")};
    padding-top: ${({ size }) => (size === "big" ? "0" : "0.52vw")};
  }
`;

const DesktopSmallCard = styled(DesktopTabletVisible)`
  padding-top: 0.52vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 0;
  }
`;
