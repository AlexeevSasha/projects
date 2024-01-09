import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { IMatchDto, MatchEvent } from "../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { calculateAdditionalTime } from "../../../components/calculateAdditionalTime/calculateAdditionalTime";
import { Icon } from "../../../components/icon";
import { checkImgFunk } from "../../../helpers/checkImgFunk";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  matchInfo?: IMatchDto;
}

export const LineMatchInfo = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  const additionalTimes = !!(
    props.matchInfo?.GuestTeam?.Events?.find((elem) => elem.HalfId > 2) ||
    props.matchInfo?.HomeTeam?.Events?.find((elem) => elem.HalfId > 2)
  );

  const renderCard = useCallback(
    (time: 1 | 2 | 3 | 4, value?: MatchEvent[], position?: "bottom" | "top") => {
      //Вычисляем положение события в зависивости от тайма
      const calculateLeft = (minute: string, time?: number) => {
        return (
          (+minute - (time === 1 ? 0 : time === 2 ? 45 : time === 3 ? 90 : 105)) /
          (time == 1 ? 0.45 : time == 2 ? 0.45 : time == 3 ? 0.15 : 0.156)
        );
      };

      //Если несколько событий вне основного времени - группируются в одно
      const collectEventsIntoOne = (minute: number) => {
        return minute >= 45 && time === 1
          ? 45
          : minute >= 90 && time === 2
          ? 90
          : minute >= 105 && time === 3
          ? 105
          : minute > 120 && time === 4
          ? 120
          : minute;
      };

      // Сортирую события по времени и создаю новый объект
      const sortValue: Record<MatchEvent["Minute"], MatchEvent[]> = {};
      value
        ?.filter((elem) => elem.HalfId === time)
        .filter((elem) => (elem.PlayerId || elem.CoachId) && elem.TeamId)
        .forEach((elem) => {
          sortValue[collectEventsIntoOne(elem.Minute)] = sortValue[collectEventsIntoOne(elem.Minute)]
            ? [...sortValue[collectEventsIntoOne(elem.Minute)], elem]
            : [elem];
        });

      return Object.keys(sortValue).map((minute) => (
        <EventContainer key={minute} left={calculateLeft(minute, time)}>
          <EventCard position={position} open={time === 1 ? "right" : "left"} isMulti={sortValue[+minute].length > 1}>
            {sortValue[+minute].map((elem, index) =>
              index === 0 ? (
                <EventLineDescription key={minute + "_" + index}>
                  <EventIcon>
                    <Icon name={elem.ActionType} color="black" />
                  </EventIcon>

                  <EventText>
                    <span>{calculateAdditionalTime(+elem.Minute, time)}&apos;</span>
                    <span>{getLocalValue(elem.PlayerName || elem.CoachName, locale)}</span>
                  </EventText>
                </EventLineDescription>
              ) : (
                <EventLineAddParam key={minute + "_" + index}>
                  <EventIcon>
                    <Icon name={elem.ActionType} color="black" />
                  </EventIcon>

                  <EventText>
                    <span>{calculateAdditionalTime(+elem.Minute, time)}&apos;</span>
                    <span>{getLocalValue(elem.PlayerName, locale)}</span>
                  </EventText>
                </EventLineAddParam>
              )
            )}
          </EventCard>
        </EventContainer>
      ));
    },
    [props]
  );

  return (
    <LineContainer additionalTimes={additionalTimes}>
      <LineLogoContainer>
        {props.matchInfo?.HomeTeam?.Logo && checkImgFunk(props.matchInfo?.HomeTeam?.Logo) ? (
          <ImgPlug>
            <NextImage
              src={props.matchInfo?.HomeTeam?.Logo}
              loading="lazy"
              alt={getLocalValue(props.matchInfo?.HomeTeam?.Name, locale)}
            />
          </ImgPlug>
        ) : (
          <ImgPlug />
        )}
        {props.matchInfo?.GuestTeam?.Logo && checkImgFunk(props.matchInfo?.GuestTeam?.Logo) ? (
          <ImgPlug>
            <NextImage
              src={props.matchInfo?.GuestTeam?.Logo}
              loading="lazy"
              alt={getLocalValue(props.matchInfo?.HomeTeam?.Name, locale)}
            />
          </ImgPlug>
        ) : (
          <ImgPlug />
        )}
      </LineLogoContainer>

      <LineTime>
        45&apos;
        {renderCard(1, props.matchInfo?.HomeTeam?.Events, "top")}
        {renderCard(1, props.matchInfo?.GuestTeam?.Events, "bottom")}
      </LineTime>

      <LineTime>
        90&apos;
        {renderCard(2, props.matchInfo?.HomeTeam?.Events, "top")}
        {renderCard(2, props.matchInfo?.GuestTeam?.Events, "bottom")}
      </LineTime>

      {additionalTimes ? (
        <>
          <LineTime>
            105&apos;
            {renderCard(3, props.matchInfo?.HomeTeam?.Events, "top")}
            {renderCard(3, props.matchInfo?.GuestTeam?.Events, "bottom")}
          </LineTime>

          <LineTime>
            120&apos;
            {renderCard(4, props.matchInfo?.HomeTeam?.Events, "top")}
            {renderCard(4, props.matchInfo?.GuestTeam?.Events, "bottom")}
          </LineTime>
        </>
      ) : null}
    </LineContainer>
  );
};

const LineContainer = styled.div<{ additionalTimes: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.additionalTimes ? "4.5vw 3fr 3fr 1fr 1fr" : "4.5vw 1fr 1fr")};
  grid-column-gap: 0.21vw;
  width: 100%;
  align-items: center;
  min-width: 950px;
  margin: 3.13vw 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: ${(props) => (props.additionalTimes ? "6.26vw 3fr 3fr 1fr 1fr" : "6.26vw 1fr 1fr")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: ${(props) => (props.additionalTimes ? "4.26vw 3fr 3fr 1fr 1fr" : "4.26vw 1fr 1fr")};
    margin: 13.13vw 0 6.4vw;
  }
`;

const LineLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 5.52vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 10.67vw;
  }
`;

const ImgPlug = styled.div`
  width: 2.5vw;
  height: 2.5vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 6.26vw;
    height: 6.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 8.53vw;
    height: 8.53vw;
  }
`;

const LineTime = styled.div`
  width: 100%;
  background-color: ${theme.colors.red};
  height: 1.25vw;
  position: relative;
  font-size: 0.83vw;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.41vw;
  box-sizing: border-box;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.13vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 6.4vw;
    font-size: 4.27vw;
  }
`;

const EventContainer = styled.div<{ left: number }>`
  position: absolute;
  width: 0.05vw;
  height: 100%;
  background-color: ${theme.colors.black};
  left: ${(props) => (props.left > 90 ? 100 : props.left)}%;
  cursor: pointer;
`;

const EventText = styled.div`
  font-size: 0.83vw;
  color: ${theme.colors.black};
  font-family: Roboto, sans-serif;
  font-weight: 400;
  opacity: 0;
  width: 0;
  max-width: fit-content;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  display: flex;
  transition: all 0.4s ease-in-out;
  gap: 0.42vw;
  padding: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 0;
  }
`;

const EventLineAddParam = styled.div`
  display: flex;
  height: 0;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
`;

const EventLineDescription = styled.div`
  display: flex;
`;

const EventCard = styled.div<{ position?: "top" | "bottom"; open?: "left" | "right"; isMulti?: boolean }>`
  position: absolute;
  background-color: ${theme.colors.white};
  border-radius: 0.1vw;
  padding: 0.31vw;
  display: flex;
  flex-direction: column;
  box-shadow: ${(props) =>
    props.isMulti
      ? props.position === "top"
        ? "0 0 1px #fff, 1px -1px 1px rgb(0 0 0 / 10%), 2px -2px 1px #fff, 3px -3px 1px rgb(0 0 0 / 10%), 4px -4px 1px #fff"
        : "0 0 1px #fff, 1px 1px 1px rgb(0 0 0 / 10%), 2px 2px 1px #fff, 3px 3px 1px rgb(0 0 0 / 10%), 4px 4px 1px #fff"
      : "0px 0px 5px #000"};

  ${(props) =>
    props.position === "top"
      ? css`
          top: -0.83vw;
          transform: translate(0, -100%);
        `
      : css`
          bottom: -0.83vw;
          transform: translate(0, 100%);
        `}

  ${(props) =>
    props.open === "left"
      ? css`
          right: -0.9vw;
        `
      : css`
          left: -0.9vw;
        `}

  &:before {
    content: "";
    position: absolute;
    ${(props) =>
      props.open === "left"
        ? css`
            right: 0.45vw;
          `
        : css`
            left: 0.45vw;
          `}
    width: 0;
    height: 0;
    border: 0.42vw solid #0000;
    ${(props) =>
      props.position === "top"
        ? css`
            top: calc(100% - 1px);
            border-top: 0.42vw solid ${theme.colors.white};
          `
        : css`
            bottom: calc(100% - 1px);
            border-bottom: 0.42vw solid ${theme.colors.white};
          `}

    pointer-events: none;
  }

  &:hover {
    z-index: 10;
    ${EventText} {
      width: fit-content;
      padding-left: 0.52vw;
      padding-right: 0.42vw;
      opacity: 1;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        padding-left: 0;
      }
    }

    ${EventLineAddParam} {
      height: fit-content;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    ${(props) =>
      props.position === "top"
        ? css`
            top: -2.09vw;
            transform: translate(50%, -100%);
          `
        : css`
            bottom: -2.09vw;
            transform: translate(50%, 100%);
          `}
    right: 0;
    left: auto;
    border-radius: 0.26vw;
    padding: 0.78vw;
    &:before {
      border: 1.04vw solid #0000;
      ${(props) =>
        props.position === "top"
          ? css`
              border-top: 1.04vw solid ${theme.colors.white};
            `
          : css`
              border-bottom: 1.04vw solid ${theme.colors.white};
            `}

      transform: translate(50%, 0);
      right: 50%;
      left: auto;
    }

    &:hover {
      z-index: 10;

      ${EventText} {
        width: 0;
        opacity: 0;
        padding: 0;
      }

      ${EventLineAddParam} {
        height: 0;
      }
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border-radius: 0.53vw;
    padding: 1.07vw;
    &:before {
      border: 2.13vw solid #0000;
      ${(props) =>
        props.position === "top"
          ? css`
              border-top: 2.13vw solid ${theme.colors.white};
            `
          : css`
              border-bottom: 2.13vw solid ${theme.colors.white};
            `}
    }
  }
`;

const EventIcon = styled.div`
  display: flex;
`;
