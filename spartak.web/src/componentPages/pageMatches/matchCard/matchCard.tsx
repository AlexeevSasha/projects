import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconPlay } from "../../../assets/icon/iconPlay";
import { theme } from "../../../assets/theme/theme";
import { CustomButton } from "../../../components/buttons/customButton";
import { CoefficientWinline } from "../../../components/coefficientWinline/coefficientWinline";
import { WinlineBunner } from "../../../components/winlineBanner";
import { showHours } from "../../../helpers/showHours";
import { ColumnButton } from "../matchTableInfo/componentRowMatchInfo/columnButton";
import { MatchScope } from "./componentMatchCard/matchScope";
import { ButtonAddToCalendar } from "../../../components/buttons/buttonAddToCalendar";

interface IProps {
  size: "small" | "big";
  matchInfo: IMatchDto;
  matchKind: string;
  teamId?: string;
  type?: "tickets";
}

export const MatchCard = (props: IProps) => {
  const { locale = "ru", push, query } = useRouter();
  const ownTeamIsHome = useMemo(
    () => props.matchInfo.HomeTeam?.Id === query.team || props.matchInfo.HomeTeam?.Id === props.teamId,
    [props.matchInfo]
  );

  return (
    <ContainerCard size={props.size}>
      <CardBlock onClick={() => push(`/matches/${props.matchInfo.Id}/broadcast`)}>
        <DataTitleBlock size={props.size}>
          <CardTitle>
            {props.matchInfo?.Round?.Name && getLocalValue(props.matchInfo?.Round?.Name, locale) + " | "}
            {getLocalValue(props.matchInfo?.Tournament, locale)}
          </CardTitle>

          <InfoDate dateTime={props.matchInfo?.Date}>{showHours(props.matchInfo?.Date, locale)}</InfoDate>
        </DataTitleBlock>

        <MatchScope
          type={"tickets"}
          size={props.size}
          homeTeam={props.matchInfo?.HomeTeam}
          guestTeam={props.matchInfo?.GuestTeam}
          score={`${props.matchInfo?.Scores?.Home} : ${props.matchInfo?.Scores?.Guest}`}
          penalty={
            props.matchInfo?.PenaltyShootoutScores
              ? `( ${props.matchInfo?.PenaltyShootoutScores?.Home} : ${
                  props.matchInfo?.PenaltyShootoutScores?.Guest
                } ${lang[locale].matchInfo.penalty.toUpperCase()})`
              : ""
          }
          tournament={getLocalValue(props.matchInfo.Tournament, locale)}
          matchKind={props.matchKind}
          stadium={getLocalValue(props.matchInfo?.Stadium, locale)}
          timer={props.matchInfo.Date}
          typeOfButton={props.matchInfo.ButtonEnum}
          matchInStatId={props.matchInfo.EventId}
          hasCoefficient={!!props.matchInfo.Coefficient}
          ourTeamId={props.teamId}
        />
        {props.matchKind === "Future" ? (
          <ButtonAddToCalendar
            title={
              getLocalValue(props.matchInfo.HomeTeam.Name, locale) +
              " - " +
              getLocalValue(props.matchInfo.GuestTeam.Name, locale)
            }
            date={new Date(props.matchInfo.Date)}
            location={getLocalValue(props.matchInfo.Stadium, locale)}
          />
        ) : null}
      </CardBlock>
      {props.matchInfo.Coefficient && Object.keys(props.matchInfo.Coefficient).length > 0 && (
        <>
          <CoefficientWinline
            coefficient={props.matchInfo.Coefficient}
            size="lg"
            cardSize={props.size}
            ownTeamIsHome={ownTeamIsHome}
          />

          {props.matchInfo.Coefficient?.EventUrl ? (
            <WinlineBunner matchDate={props.matchInfo?.Date} eventUrl={props.matchInfo.Coefficient?.EventUrl} />
          ) : null}
        </>
      )}

      {props.size == "small" ? (
        <ButtonBlock>
          {props.matchKind === "Past" ? (
            <RestyledCustomButton
              type={"opacity"}
              withGap
              onClick={() => push(`/matches/${props.matchInfo.Id}/broadcast`)}
            >
              <IconPlay />
              <span>{lang[locale].button.rep}</span>
            </RestyledCustomButton>
          ) : (
            !props.matchInfo.Coefficient && (
              <ButtonStyleBock>
                <ColumnButton
                  type={props.matchInfo.ButtonEnum}
                  typeMatch={"new"}
                  size={props.size}
                  matchInStatId={props.matchInfo.EventId}
                />
              </ButtonStyleBock>
            )
          )}
        </ButtonBlock>
      ) : null}
    </ContainerCard>
  );
};

const ContainerCard = styled.div<{ size: "small" | "big" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow.none_gray};
  background: ${({ theme }) => theme.colors.blackLight_white};
  color: ${({ theme }) => theme.colors.white_black};
  box-sizing: border-box;
  cursor: default;
  height: 20.31vw;

  & > div > *:nth-child(2) {
    width: ${({ size }) => (size === "big" ? "40.63vw" : "19.69vw")};
    box-sizing: border-box;
  }

  &:hover {
    transform: scale(1.02, 1.02);
    transition: all 0.2s ease-in-out;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 50.85vw;

    & > div > *:nth-child(2) {
      width: ${({ size }) => (size === "big" ? "93.87vw" : "49.28vw")};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 83.2vw;
    & > div > *:nth-child(2) {
      width: 91.47vw;
    }
  }
`;

const CardBlock = styled.div`
  height: inherit;
  flex: 1;
  position: relative;
`;

const DataTitleBlock = styled.div<{ size: "small" | "big" }>`
  padding: ${({ size }) => (size === "big" ? "1.67vw 1.25vw 0.5vw" : "1.67vw 0.83vw 1.25vw")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.blackLight_white};

  & > :not(:last-child) {
    margin-bottom: 0.42vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      margin-bottom: 1.06vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      margin-bottom: 2.13vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: ${({ size }) => (size === "big" ? "4.27vw 0 2.27vw" : "4.27vw 0 4.27vw")};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 8vw 0 4.27vw;
  }
`;

const CardTitle = styled.h3`
  color: ${theme.colors.gray};
  margin: 0;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 0.84vw;
  line-height: 1.04vw;
  text-align: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
    line-height: 2.87vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;

const InfoDate = styled.time`
  text-transform: uppercase;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};
  line-height: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    line-height: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    line-height: 5.87vw;
  }
`;

const RestyledCustomButton = styled(CustomButton)`
  justify-content: center;
  padding: 0.58vw 3.21vw;
  margin: 0 0 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.7vw 8.27vw;
    margin: 0 0 7.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    min-height: 10.13vw;
    padding: 0 17.7vw;
    margin: 0 0 13.4vw;
  }
`;
const ButtonBlock = styled.div`
  text-align: center;
`;
const ButtonStyleBock = styled.div`
  margin: 0 0 3.33vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 7.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 13.4vw;
  }
`;
