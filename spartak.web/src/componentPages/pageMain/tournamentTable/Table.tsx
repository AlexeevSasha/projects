import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { ITeam } from "../../../api/dto/ITeam";
import { ITournamentAndSeasons } from "../../../api/dto/ITournamentAndSeasons";
import { ITournamentTable } from "../../../api/dto/ITournamentTable";
import { matchRepository } from "../../../api/matchRepository";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { CustomSelect, SelectOption } from "../../../components/select/select";
import { LoadingScreen } from "../../../ui/LoadingScreen ";
import { PlayoffСap } from "./playoffСap";
import { NextImage } from "../../../ui/nextImage/nextImage";

type Props = {
  tournaments: ITournamentAndSeasons[];
  tableData: ITournamentTable[] | null;
  team?: ITeam;
  setActiveTournament: (value?: ITournamentAndSeasons) => void;
  activeTournament?: ITournamentAndSeasons;
};

export const Table = memo(({ tournaments, tableData, team, setActiveTournament, activeTournament }: Props) => {
  const { locale = "ru" } = useRouter();
  const options = tournaments.map(({ Tournament }) => ({
    value: Tournament.Id,
    label: getLocalValue(Tournament.Name, locale)?.toUpperCase(),
  }));

  const [initTableData, setTableData] = useState(tableData);
  const [status, setStatus] = useState<"start" | "done">("done");

  const onSelect = useCallback(
    async (value: SelectOption | null) => {
      setStatus("start");
      const tournament = tournaments.find(({ Tournament }) => Tournament.Id === value?.value);

      const isPlayOff = (
        await matchRepository.fetchCalendar({
          teamId: team?.Id,
          tournamentId: tournament?.Tournament.Id,
          seasonId: tournament?.Seasons?.[0]?.Id,
          matchListType: "All",
          Status: "Published",
        })
      )?.some(({ Round }) => Round?.IsPlayOff);

      const newTableData = isPlayOff
        ? null
        : await matchRepository
            .fetchTournamentTable({
              tournamentId: tournament?.Tournament?.Id,
              seasonId: tournament?.Seasons?.[0]?.Id,
              teamId: team?.Id?.toString(),
            })
            .then((res) => {
              let result: ITournamentTable[] = res.map((elem, index) =>
                elem.Team.Id === team?.InStatId?.toString()
                  ? { ...elem, index: index + 1, active: true }
                  : { ...elem, index: index + 1 }
              );

              res.find((item, index) => {
                if (item.Team.Id === team?.InStatId?.toString()) {
                  if (index < 4) {
                    result = result.slice(0, 5);
                  } else if (index > res.length - 3) {
                    result = result.slice(-5);
                  } else {
                    result = result.slice(index - 2, index + 3);
                  }
                  return true;
                }
                return false;
              });
              return result;
            });

      setActiveTournament(tournament);
      setTableData(newTableData);
      setStatus("done");
    },
    [tournaments, team, setActiveTournament]
  );

  return (
    <Container>
      <StyledSelect
        value={{
          value: activeTournament?.Tournament?.Id || "",
          label: (
            <SelectLabel>
              <ActiveIcon>
                <NextImage src={activeTournament?.Tournament ? activeTournament?.Tournament?.ImageUrl : ""} alt="" />
              </ActiveIcon>
              <span> {getLocalValue(activeTournament?.Tournament?.Name, locale) || ""}</span>
            </SelectLabel>
          ),
        }}
        onSelect={onSelect}
        options={options}
        id="mainTableSelect"
      />

      {status === "start" ? (
        <LoadingScreen />
      ) : (
        <>
          {initTableData !== null ? (
            initTableData?.map((item, i) => (
              <Row key={i} active={item.active}>
                <Index active={item.active}>{item.index}</Index>
                {item.Team.Logo ? (
                  <ContainerImage>
                    <NextImage src={item.Team?.Logo} alt={getLocalValue(item.Team?.Name, locale)} />
                  </ContainerImage>
                ) : (
                  <div />
                )}
                <Name>{getLocalValue(item.Team?.Name, locale)}</Name>
                <div>{item.Total}</div>
                <div>{item.Points}</div>
              </Row>
            ))
          ) : (
            <PlayoffСap
              teamId={team?.Id}
              tournamentId={activeTournament?.Tournament.Id}
              seasonId={activeTournament?.Seasons[0]?.Id}
            />
          )}
        </>
      )}
    </Container>
  );
});

const Container = styled.div`
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  min-height: 100%;
  display: flex;
  flex-flow: column;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
  }
`;

const StyledSelect = styled(CustomSelect)`
  .react-select__control {
    height: 4.17vw;
    border: none;
    background: ${({ theme }) => theme.colors.blackLight_red};
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 10.43vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 14.93vw;
    }
  }

  .react-select__option {
    height: 1.88vw;
    font-weight: 400;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      height: 4.69vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      height: 9.6vw;
    }
  }

  .react-select__menu {
    border-width: 0.05vw 0 0 0;
    border-color: ${theme.colors.grayDark};
    margin-top: 0;
    background: ${({ theme }) => theme.colors.blackLight_whiteGray};
    color: ${({ theme }) => theme.colors.white_black};
  }
`;

const Row = styled.div<{ active?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 6fr 1fr 1fr;
  column-gap: 0.5vw;
  border-bottom: 1px solid ${theme.colors.grayDark};
  color: ${(props) => (props.active ? props.theme.colors.white_red : props.theme.colors.gray_grayDark1)};
  background-color: ${(props) =>
    props.active ? props.theme.colors.redOpacity_fireEngineRedOpacity : props.theme.colors.none_whiteGray};
  align-items: center;
  padding: 1.25vw 0;
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;

  & > div:not(:nth-child(3)) {
    text-align: center;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding: 3.13vw 0;
    column-gap: 1.25vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 4.27vw 0;
    column-gap: 3.2vw;
  }
`;

const Index = styled.div<{ active?: boolean }>`
  color: ${(props) => (props.active ? theme.colors.red : theme.colors.gray)};
  font-size: 1.67vw;
  font-weight: 700;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    font-family: "FCSM Text", sans-serif;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 1.67vw;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    font-family: "FCSM Text", sans-serif;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.8vw;
  }
`;

const ContainerImage = styled.div`
  width: 3.33vw;
  height: 3.33vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 5.22vw;
    height: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 10.67vw;
    height: 10.67vw;
  }
`;

const SelectLabel = styled.span`
  display: flex;
  align-items: center;
  column-gap: 1.25vw;
  text-transform: uppercase;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    column-gap: 3.13vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    column-gap: 3.2vw;
    font-size: 3.2vw;
    font-weight: 500;
  }
`;

const ActiveIcon = styled.span`
  width: 2.5vw;
  height: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 6.26vw;
    height: 6.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 6.4vw;
    height: 6.4vw;
  }
`;
