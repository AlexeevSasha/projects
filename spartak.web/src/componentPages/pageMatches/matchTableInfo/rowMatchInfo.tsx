import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { IconPlay } from "../../../assets/icon/iconPlay";
import { theme } from "../../../assets/theme/theme";
import { ButtonAddToCalendar } from "../../../components/buttons/buttonAddToCalendar";
// import { ButtonAddToCalendar } from "../../../components/buttons/buttonAddToCalendar";
import { CustomButton } from "../../../components/buttons/customButton";
import { CoefficientWinline } from "../../../components/coefficientWinline/coefficientWinline";
import { ColumnButton } from "./componentRowMatchInfo/columnButton";
import { ColumnClub } from "./componentRowMatchInfo/columnClub";
import { ColumnTur } from "./componentRowMatchInfo/columnTur";
import { IParkingDto } from "../../../api/dto/IParkingDto";
import { ParkingRow } from "./parkingRow";

interface IProps {
  currentMatch: IMatchDto;
  typeMatch: "old" | "new";
  teamId?: string;
  parking?: IParkingDto[];
}

export const RowMatchInfo = (props: IProps) => {
  const { locale = "ru", push, query } = useRouter();
  const ownTeamIsHome = (event: IMatchDto) => event.HomeTeam?.Id === query.team;

  return (
    <Container typeMatch={props.typeMatch}>
      {props.typeMatch === "new" ? (
        <ButtonAddToCalendar
          title={
            getLocalValue(props.currentMatch.HomeTeam.Name, locale) +
            " - " +
            getLocalValue(props.currentMatch.GuestTeam.Name, locale)
          }
          date={new Date(props.currentMatch.Date)}
          location={getLocalValue(props.currentMatch.Stadium, locale)}
        />
      ) : null}
      <ColumnClub
        id={props.currentMatch.Id}
        eventData={props.currentMatch}
        typeMatch={props.typeMatch}
        teamId={props.teamId}
      />

      {props.typeMatch === "new" ? (
        <ContainerCoefficientWinline>
          <CoefficientWinline
            coefficient={props.currentMatch?.Coefficient}
            size="sm"
            withButton
            ownTeamIsHome={ownTeamIsHome(props.currentMatch)}
          />
        </ContainerCoefficientWinline>
      ) : (
        <ContainerScore>
          <Score>
            {props.currentMatch?.Scores?.Home} : {props.currentMatch?.Scores?.Guest}
          </Score>
          <PenaltyText>
            {props.currentMatch?.PenaltyShootoutScores
              ? `(${props.currentMatch?.PenaltyShootoutScores?.Home} : ${
                  props.currentMatch?.PenaltyShootoutScores?.Guest
                } ${lang[locale].matchInfo.penalty.toUpperCase()})`
              : null}
          </PenaltyText>
        </ContainerScore>
      )}

      <ColumnTur
        round={props.currentMatch?.Round}
        date={props.currentMatch?.Date}
        tournament={getLocalValue(props.currentMatch?.Tournament, locale)}
        old={props.typeMatch !== "new"}
      />

      {props.typeMatch === "new" ? (
        <ColumnButton
          type={props.currentMatch?.ButtonEnum}
          typeMatch={props.typeMatch}
          ownTeamIsHome={ownTeamIsHome(props.currentMatch)}
          matchInStatId={props.currentMatch?.EventId}
          withIcon
          size="big"
        />
      ) : (
        <ButtonContainer>
          <RestyledCustomButton
            type={"opacity"}
            withGap
            onClick={() => push(`/matches/${props.currentMatch?.Id}/broadcast`)}
          >
            <IconPlay />

            <span>{lang[locale].button.rep}</span>
          </RestyledCustomButton>
        </ButtonContainer>
      )}
    </Container>
  );
};

export const RowTicketInfo = (props: IProps) => {
  const { locale = "ru", query } = useRouter();
  const ownTeamIsHome = (event: IMatchDto) => event.HomeTeam?.Id === query.team;

  return (
    <>
      <Container typeMatch={props.typeMatch}>
        <>
          <ColumnClub
            id={props.currentMatch?.Id}
            eventData={props.currentMatch}
            typeMatch={props.typeMatch}
            teamId={props.teamId}
          />

          <ContainerCoefficientWinline>
            <CoefficientWinline
              coefficient={props.currentMatch?.Coefficient}
              size="sm"
              withButton
              ownTeamIsHome={ownTeamIsHome(props.currentMatch)}
            />
          </ContainerCoefficientWinline>

          <ColumnTur
            round={props.currentMatch?.Round}
            date={props.currentMatch?.Date}
            tournament={getLocalValue(props.currentMatch?.Tournament, locale)}
            old={props.typeMatch !== "new"}
          />
          <ColumnButton
            ownTeamIsHome={ownTeamIsHome(props.currentMatch)}
            type={"Buy"}
            typeMatch={props.typeMatch}
            withIcon
            size="big"
            matchInStatId={props.currentMatch?.EventId}
          />
        </>
      </Container>

      {props.parking?.map((item: any) => (
        <ParkingRow parking={item} key={item?.Id} />
      ))}
    </>
  );
};

const Container = styled.div<{ typeMatch: "old" | "new" }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.83vw;
  background: ${({ theme }) => theme.colors.blackLight_whiteGray};
  margin-bottom: 0.42vw;
  align-items: center;
  padding: 1.72vw 2.34vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 500;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 2.09vw;

    padding: 4.17vw 5.22vw;
    margin-bottom: 2.09vw;

    article > section > div:nth-of-type(2) > span > div {
      display: none;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: ${({ typeMatch }) => (typeMatch === "old" ? "1fr 1fr" : "1fr")};
    grid-row-gap: 4.27vw;

    padding: 8vw 4.27vw 4.27vw;
    margin-bottom: 3.73vw;
  }
`;

const ContainerCoefficientWinline = styled.div`
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: center;
  }
`;

const ContainerScore = styled.div`
  text-align: center;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    text-align: end;
    margin: 0;
    width: 100%;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: auto;
  }
`;

const Score = styled.span`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 10.67vw;
  }
`;

const RestyledCustomButton = styled(CustomButton)`
  display: flex;
  justify-content: center;
  gap: 0.52vw;
  width: max-content;
  padding: 0.58vw 2.1vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 1.3vw;
    padding: 1.7vw 2.9vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: auto;
    padding: 1.4vw 2.9vw;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const PenaltyText = styled.p`
  color: ${({ theme }) => theme.colors.white_black};
  margin-top: 0;
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
