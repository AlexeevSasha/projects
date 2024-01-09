import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { LineUpPlayer, MatchEvent } from "../../api/dto/IMatchDto";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { Icon } from "../../components/icon";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";
import { calculateAdditionalTime } from "../../components/calculateAdditionalTime/calculateAdditionalTime";

interface IProps {
  player: LineUpPlayer;
  events?: MatchEvent[];
}

export const PlayerInComposition = (props: IProps) => {
  const { locale = "ru", push } = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);
  const playerEvents = useMemo(
    () =>
      props.events?.map((elem, index) => {
        const otherPlayerName = getLocalValue(elem.OtherPlayerName, locale).replace(/^[A-ZА-Я]+?\s/i, " ");

        return (
          <EventBlock key={index} title={elem.Minute + otherPlayerName}>
            <EventIcon>
              <Icon name={elem.ActionType} color={isDarkTheme ? "white" : "black"} />
            </EventIcon>

            <EventInfo>
              {calculateAdditionalTime(elem.Minute, elem.HalfId)}&apos;
              {elem.ActionType === "Replace" && <p> {otherPlayerName}</p>}
            </EventInfo>
          </EventBlock>
        );
      }),
    [props.events]
  );

  return (
    <LineupItem
      profileExist={props.player.ProfileExist}
      onClick={props.player.ProfileExist ? () => push(`/player/${props.player.Id}`) : undefined}
    >
      <PlayerData>
        <Number>{props.player.Num}</Number>

        <PhotoContainer>
          <NextImage src={props.player.Avatar || "/images/NoData_v1.0.0.svg"} />
        </PhotoContainer>

        <InfoBlock>
          <FullName>{`${getLocalValue(props.player.FullName, locale)}`}</FullName>

          <Position>{getLocalValue(props.player.Position, locale)}</Position>
        </InfoBlock>
      </PlayerData>

      <PlayerEventsBlock>{playerEvents}</PlayerEventsBlock>
    </LineupItem>
  );
};

const LineupItem = styled.div<{ profileExist?: boolean }>`
  padding: 0 1.25vw;
  height: 4.17vw;
  background: ${({ theme }) => theme.colors.blackLight_white1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ profileExist }) => (profileExist ? "pointer" : "auto")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 3.13vw;
    height: 10.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: unset;
    padding: 3.2vw;
  }
`;

const PlayerData = styled.div`
  display: flex;
  gap: 1.25vw;
  align-items: center;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
  }
`;

const Number = styled.span`
  width: 1.77vw;
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 3.13vw;
    width: 4.43vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-weight: 600;
    width: 6.13vw;
    font-size: 4.27vw;
  }
`;

const PhotoContainer = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 50%;
  overflow: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 6.26vw;
    height: 6.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8.53vw;
    height: 8.53vw;
  }
`;

const InfoBlock = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.21vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 0.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 0;
  }
`;

const FullName = styled.span`
  margin: 0;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 0.83vw;
  text-transform: uppercase;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-family: "FCSM Text", sans-serif;
    font-size: 3.2vw;
    width: max-content;
  }
`;

const Position = styled.span`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;

const PlayerEventsBlock = styled.div`
  display: flex;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 2.13vw;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const EventBlock = styled.p`
  margin: 0;
  display: flex;
  flex-direction: column;
  width: max-content;
  align-items: center;
`;

const EventInfo = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.white_black};
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;

  p {
    margin: 0 0 0 0.3vw;
    width: 2.6vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;

    p {
      margin-left: 0.5vw;
      width: 6.518vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 2.67vw;

    p {
      margin-left: 1vw;
      width: 13.33vw;
    }
  }
`;

const EventIcon = styled.div`
  display: flex;
  padding-bottom: 0.42vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 0.91vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 0;
  }
`;
