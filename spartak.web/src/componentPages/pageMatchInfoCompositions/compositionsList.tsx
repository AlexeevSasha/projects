import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { VotingType } from "../../api/MvpVotingRepository";
import { LineUp, MatchEvent } from "../../api/dto/IMatchDto";
import { LocaleType } from "../../api/dto/LocaleType";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { Voting } from "../voting/components/voting";
import { VotingEntity } from "../voting/interfaces/VotingT";
import { EmptyCompositionList } from "./emptyCompositionList";
import { PlayerInComposition } from "./playerInComposition";

interface IProps {
  lineUp?: LineUp;
  events?: MatchEvent[];
  reserveNames?: {
    homeTeam?: LocaleType;
    guestTeam?: LocaleType;
  };
  voting?: VotingEntity;
}

export const CompositionsList = ({ lineUp, events, reserveNames, voting }: IProps) => {
  const { locale = "ru" } = useRouter();
  const [activeTeam, setActiveTeam] = useState<number>(0);

  const filterAndSortEvents = (events?: MatchEvent[], playerId?: string) => {
    return events?.filter((event) => event.PlayerId === playerId || event.CoachId === playerId).reverse();
  };

  return (
    <Container>
      <TeamsTabsBlock>
        <TeamName active={!activeTeam} onClick={() => setActiveTeam(0)}>
          {getLocalValue(lineUp?.HomeTeamLineup?.Team?.Name ?? reserveNames?.homeTeam, locale)}
        </TeamName>

        <TeamName active={!!activeTeam} onClick={() => setActiveTeam(1)}>
          {getLocalValue(lineUp?.GuestTeamLineup?.Team?.Name ?? reserveNames?.guestTeam, locale)}
        </TeamName>
      </TeamsTabsBlock>

      <TeamsSection>
        <TeamBlock active={activeTeam === 0}>
          <LineupTitle>{lang[locale].profile.matches.mainSquad}</LineupTitle>

          {lineUp?.HomeTeamLineup?.Main.length ? (
            lineUp?.HomeTeamLineup?.Main?.map((player) => {
              return (
                <PlayerInComposition key={player.Id} events={filterAndSortEvents(events, player.Id)} player={player} />
              );
            })
          ) : (
            <EmptyCompositionList />
          )}

          {!!lineUp?.HomeTeamLineup?.Substitute?.length && (
            <>
              <LineupTitle>{lang[locale].profile.matches.spareSquad}</LineupTitle>

              {lineUp?.HomeTeamLineup?.Substitute?.map((player) => {
                return (
                  <PlayerInComposition
                    key={player.Id}
                    events={filterAndSortEvents(events, player.Id)}
                    player={player}
                  />
                );
              })}
            </>
          )}

          {console.log("Coach", lineUp?.HomeTeamLineup?.Coach)}
          {!!lineUp?.HomeTeamLineup?.Coach && (
            <>
              <LineupTitle>{lang[locale].profile.matches.coachSquad}</LineupTitle>

              <PlayerInComposition
                key={lineUp?.HomeTeamLineup?.Coach.Id}
                events={filterAndSortEvents(events, lineUp?.HomeTeamLineup?.Coach.Id)}
                player={lineUp?.HomeTeamLineup?.Coach}
              />
            </>
          )}
        </TeamBlock>

        <TeamBlock active={activeTeam === 1}>
          <LineupTitle>{lang[locale].profile.matches.mainSquad}</LineupTitle>

          {lineUp?.GuestTeamLineup?.Main.length ? (
            lineUp?.GuestTeamLineup?.Main?.map((player) => {
              return (
                <PlayerInComposition key={player.Id} events={filterAndSortEvents(events, player.Id)} player={player} />
              );
            })
          ) : (
            <EmptyCompositionList />
          )}

          {!!lineUp?.GuestTeamLineup?.Substitute?.length && (
            <>
              <LineupTitle>{lang[locale].profile.matches.spareSquad}</LineupTitle>

              {lineUp?.GuestTeamLineup?.Substitute?.map((player) => {
                return (
                  <PlayerInComposition
                    key={player.Id}
                    events={filterAndSortEvents(events, player.Id)}
                    player={player}
                  />
                );
              })}
            </>
          )}

          {!!lineUp?.GuestTeamLineup?.Coach && (
            <>
              <LineupTitle>{lang[locale].profile.matches.coachSquad}</LineupTitle>

              <PlayerInComposition
                key={lineUp?.GuestTeamLineup?.Coach.Id}
                events={filterAndSortEvents(events, lineUp?.GuestTeamLineup?.Coach.Id)}
                player={lineUp?.GuestTeamLineup?.Coach}
              />
            </>
          )}
        </TeamBlock>
      </TeamsSection>

      {voting && <Voting.Banner type={VotingType.match} votingId={voting.Id} />}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin-bottom: 4.17vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 11.08vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;

const TeamsTabsBlock = styled.p`
  gap: 1.25vw;
  width: inherit;
  display: flex;
  margin-bottom: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: flex;
    gap: 0;
    margin: 3.13vw 0;
    border: 0.13vw solid ${({ theme }) => theme.colors.grayDark_grayLight};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw auto;
    border: 0.27vw solid ${({ theme }) => theme.colors.grayDark_grayLight};
  }
`;

const TeamsSection = styled.section`
  width: inherit;
  display: flex;
  justify-content: space-between;
  gap: 1.25vw;
  margin-bottom: 3.75vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    gap: 1.04vw;
    margin-bottom: 6.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
    margin-bottom: 6.13vw;
    width: 100vw;
  }
`;

const TeamBlock = styled.div<{ active?: boolean }>`
  width: 50%;
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 0.42vw;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: ${({ active }) => (active ? "flex" : "none")};
    width: inherit;

    & > *:not(:last-child) {
      margin-bottom: 1.04vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    & > *:not(:last-child) {
      margin-bottom: 2.13vw;
    }
  }
`;

const TeamName = styled.span<{ active: boolean }>`
  width: 50%;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 3.23vw;
  padding: 1.25vw 0;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    cursor: pointer;
    font-family: "FCSM Text", sans-serif;
    background-color: ${({ active, ...props }) =>
      active ? theme.colors.red : props.theme.colors.blackLight_whiteGray};
    color: ${({ active, ...props }) => (active ? theme.colors.white : props.theme.colors.white_black)};
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    margin: 0;
    width: 50%;
    padding: 1.56vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.6vw 0;
  }
`;

const LineupTitle = styled.span`
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  margin: 0;
  padding: 0.42vw 0;
  color: ${theme.colors.grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    padding: 1.04vw 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    padding: 2.13vw 4.27vw;
    font-weight: 600;
  }
`;
