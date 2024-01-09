import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { IEventTickets } from "../../../api/dto/ITickets";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CoefficientWinline } from "../../../components/coefficientWinline/coefficientWinline";
import { ColumnButton } from "./componentRowMatchInfo/columnButton";
import { ColumnClub } from "./componentRowMatchInfo/columnClub";
import { ColumnTur } from "./componentRowMatchInfo/columnTur";
import { ParkingRow } from "./parkingRow";
import { lang } from "../../../../public/locales/lang";

interface IPropsTicket {
  tickets: IEventTickets;
  teamId?: string;
}

export const TicketForMatchOrCalendar = (props: IPropsTicket) => {
  const { locale = "ru", query } = useRouter();
  const ownTeamIsHome = useMemo(() => {
    return props.tickets.Match?.HomeTeam?.Id === query.team;
  }, [query, props.tickets]);

  const renderRow = () => {
    switch (props.tickets.TicketEventType) {
      case "Match": {
        return (
          <Container>
            <ColumnClub
              id={props.tickets.Match?.Id}
              eventData={props.tickets.Match}
              typeMatch="new"
              teamId={props.teamId}
            />

            <ContainerCoefficientWinline>
              <CoefficientWinline
                coefficient={props.tickets.Match?.Coefficient}
                size="sm"
                withButton
                ownTeamIsHome={ownTeamIsHome}
              />
            </ContainerCoefficientWinline>

            <ColumnTur
              round={props.tickets.Match?.Round}
              date={props.tickets.Match?.Date}
              tournament={getLocalValue(props.tickets.Match?.Tournament, locale)}
              old={false}
            />
            <ColumnButton
              ownTeamIsHome={ownTeamIsHome}
              type="Buy"
              typeMatch="new"
              withIcon
              size="big"
              matchInStatId={props.tickets.Match?.EventId}
            />
          </Container>
        );
      }
      case "Event": {
        return <ParkingRow parking={props.tickets} buttonText={lang[locale].button.buyTicket} />;
      }
      default:
        return null;
    }
  };

  return (
    <>
      {renderRow()}

      {props.tickets.Parking?.map((item: any) => (
        <ParkingRow parking={item} key={item?.Id} />
      ))}
    </>
  );
};

const Container = styled.div`
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
    grid-template-columns: 1fr;
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
