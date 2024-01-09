import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import { VotingType } from "../../api/MvpVotingRepository";
import { MatchEvent } from "../../api/dto/IMatchDto";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { Icon } from "../../components/icon";
import { ThemeContext } from "../../core/themeProvider";
import { EmptyScreenMatches } from "../pageMatches/emptyScreenMatches/emptyScreenMatches";
import { Voting } from "../voting/components/voting";
import { VotingEntity } from "../voting/interfaces/VotingT";

interface IProps {
  events?: MatchEvent[];
  voting?: VotingEntity;
}

export const MatchInfoListBroadcast = ({ events, voting }: IProps) => {
  const { locale = "ru" } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  //Вычисление добавленного времени
  const calculateAdditionalTime = (time: number, minute: number) => {
    return (
      <>
        {time === 1 && minute > 45
          ? "45" + ` +${minute - 45}`
          : time === 2 && minute > 90
          ? "90" + ` +${minute - 90}`
          : time === 3 && minute > 105
          ? "105" + ` +${minute - 105}`
          : time === 4 && minute > 120
          ? "120" + ` +${minute - 120}`
          : minute}
      </>
    );
  };

  return (
    <Container>
      {voting && <Voting.Banner type={VotingType.match} votingId={voting.Id} />}

      {events?.length ? (
        events?.map((elem, index) => (
          <EventItem
            key={index}
            isGoal={
              elem.ActionType === "Goal" ||
              elem.ActionType === "AutoGoal" ||
              elem.ActionType === "GoalPenaltyInGameTime"
            }
          >
            <EventMinutes>{calculateAdditionalTime(elem.HalfId, elem.Minute)}&apos;</EventMinutes>

            <span>
              <Icon name={elem.ActionType} color={isDarkTheme ? "white" : "black"} />
            </span>

            <EventText>
              {elem.ActionType === "TextTranslation" ? (
                <span>{getLocalValue(elem.Comment, locale)}</span>
              ) : (
                <>
                  <span>{getLocalValue(elem.Description, locale)} </span>
                  <EventComment>{getLocalValue(elem.Comment, locale)}</EventComment>
                </>
              )}
            </EventText>
          </EventItem>
        ))
      ) : (
        <EmptyScreenMatches
          text={lang[locale].profile.matches.translationMissing}
          title={lang[locale].profile.matches.noTranslation}
          srcImg={`/images/emptyScreen/matches/Article${isDarkTheme ? "White" : "Black"}_v1.0.0.png`}
        />
      )}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;
  gap: 0.42vw;
  margin-bottom: 4.17vw;
  margin-top: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 10.43vw;
    margin-top: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 16.53vw;
    margin-top: 8.53vw;
    width: 100vw;
  }
`;

const EventItem = styled.p<{ isGoal?: boolean }>`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1.25vw;
  padding: 1.25vw 1.67vw;

  color: ${({ theme }) => theme.colors.white_black};
  background-color: ${({ isGoal, theme }) =>
    isGoal ? theme.colors.redOpacity_fireEngineRedOpacity : theme.colors.blackLight_white1};
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 2.09vw;
    gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw 4.27vw;
    gap: 2.67vw;
  }
`;

const EventMinutes = styled.span`
  font-weight: 500;
  font-size: 1.25vw;
  font-family: "FCSM Text", sans-serif;
  min-width: 4.58vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
    min-width: 8.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    word-break: break-all;
    min-width: 7.47vw;
  }
`;

const EventText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 0.94vw;
  font-family: Roboto, sans-serif;
  font-weight: 400;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
const EventComment = styled.span`
  color: ${theme.colors.gray};
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
