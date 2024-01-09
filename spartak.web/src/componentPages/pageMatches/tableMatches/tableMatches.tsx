import { useRouter } from "next/router";
import styled from "styled-components";
import { VotingType } from "../../../api/MvpVotingRepository";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { formatDate } from "../../../assets/constants/date";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { MediaBanner } from "../../../components/mediaBanner";
import { Voting } from "../../voting/components/voting";
import { VotingEntity } from "../../voting/interfaces/VotingT";
import { RowMatchInfo, RowTicketInfo } from "../matchTableInfo/rowMatchInfo";

interface IProps {
  matchCalendar: IMatchDto[];
  typeMatch: "old" | "new";
  teamId?: string;
  isTickets?: boolean;
  votings?: VotingEntity[];
}

export const TableMatches = ({ matchCalendar, typeMatch, teamId, isTickets, votings }: IProps) => {
  const { locale = "ru" } = useRouter();

  const objEvent = matchCalendar.reduce((events: { [key: string]: IMatchDto[] }, elem) => {
    const eventsKey = formatDate(elem.Date, "mmmm yyyy", locale);
    events[eventsKey] = [...(events[eventsKey] || []), elem];
    return events;
  }, {});

  return (
    <ContainerTableMatch>
      {Object.keys(objEvent).map((eventsKey, index) => (
        <DropdownList defaultState={isTickets || !index} customTitle={<Title>{eventsKey}</Title>} key={eventsKey}>
          {isTickets
            ? objEvent[eventsKey].map((match) => (
                <RowTicketInfo key={match.Id} currentMatch={match} typeMatch={typeMatch} teamId={teamId} />
              ))
            : objEvent[eventsKey].map((match) => (
                <RowMatchInfo key={match.Id} currentMatch={match} typeMatch={typeMatch} teamId={teamId} />
              ))}

          {isTickets ? (
            <ImgContainer>
              <MediaBanner locationKey="Web.Tickets" />
            </ImgContainer>
          ) : (
            !!votings?.length &&
            !index && (
              <ImgContainer>
                <Voting.Banner type={VotingType.month} votingId={votings[0].Id} />
              </ImgContainer>
            )
          )}
        </DropdownList>
      ))}
    </ContainerTableMatch>
  );
};

const ContainerTableMatch = styled(ContainerContent)`
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4.43vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 6.4vw;
  }
`;

const ImgContainer = styled.div`
  margin: 0.83vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 1.04vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 2.13vw 0 0;
  }
`;

const Title = styled.span`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 1.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.52vw;
  }
`;
