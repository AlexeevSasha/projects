import { useRouter } from "next/router";
import React, { memo } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { EventEntityDto, EventType } from "../../../api/dto/EventEntity";
import { getDaysInMonth, getTimeZoneOffset } from "../../../assets/constants/date";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import AirplaneTilt from "../../../assets/icon/AirplaneTilt.svg";
import House from "../../../assets/icon/House.svg";
import { theme } from "../../../assets/theme/theme";
import { NextLink } from "../../../components/nextLink/nextLink";
import { NextImage } from "../../../ui/nextImage/nextImage";
import { CalendarEntity } from "./calendar";
import { WeekLine } from "./weekLine";

export const CalendarSheet = memo((props: CalendarEntity) => {
  const { locale = "ru" } = useRouter();
  const date = new Date(props.date);
  const prevMonthDays = date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;

  const days = new Array(getDaysInMonth(date.getMonth()) + prevMonthDays).fill(null).map((_, i) => {
    const day = i < prevMonthDays ? "" : i - prevMonthDays + 1;
    const events =
      props.events?.filter(
        (event) => new Date(+new Date(event.DateStart) + getTimeZoneOffset() + 10800000).getDate() === day
      ) || [];

    return {
      day,
      event:
        events.find((e) => e.CalendarEventType === EventType.CustomEvent) ||
        events.find((e) => e.CalendarEventType === EventType.CustomMatch) ||
        events.find((e) => e.CalendarEventType === EventType.InStatMatch) ||
        events[0],
    };
  });

  return (
    <div>
      <Month>{lang[locale].monthList.default[`${date.getMonth()}`]}</Month>

      <Wrapper>
        <WeekLine />

        <Days>
          {days.map(({ day, event }, i) => {
            const isCustomEvent = event?.CalendarEventType === EventType.CustomEvent;
            const href = isCustomEvent ? event.EventUrl || "" : `/matches/${event?.MatchId}/broadcast`;
            return event ? (
              <NextLink url={href} key={i + 1}>
                <Day key={i + 1}>
                  <EventDay event={event}>
                    {event.Image && event.CalendarEventType === EventType.CustomEvent && (
                      <NextImage src={event.Image} />
                    )}
                    {!isCustomEvent ? (
                      new Date(event?.DateStart) > new Date() ? (
                        <>
                          <EventImgContainer>{event.Image && <NextImage src={event.Image} />}</EventImgContainer>
                          <ShortName>{getLocalValue(event?.TournamentShortName, locale)}</ShortName>
                          <EventFooterContainer event={event} />
                        </>
                      ) : (
                        <>
                          <EventImgContainer>{event.Image && <NextImage src={event.Image} />}</EventImgContainer>
                          <PastMatchScore>
                            {!event?.IsHomeMatch
                              ? `${event?.OppositeTeamScoredGoals} : ${event?.OwnTeamScoredGoals}`
                              : `${event?.OwnTeamScoredGoals} : ${event?.OppositeTeamScoredGoals}`}
                          </PastMatchScore>
                        </>
                      )
                    ) : null}
                  </EventDay>
                </Day>
              </NextLink>
            ) : (
              <Day key={i + 1}>{day}</Day>
            );
          })}
        </Days>
      </Wrapper>
    </div>
  );
});

const Month = styled.h3`
  color: ${({ theme }) => theme.colors.white_black};
  text-transform: capitalize;
  font-family: "FCSM text", sans-serif;
  font-weight: 600;
  font-size: 3.23vw;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    padding-left: 0.26vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    line-height: 1;
  }
`;

const Wrapper = styled.div`
  padding: 1.66vw 1.46vw 0.6vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 4.69vw 0 2.61vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0 5.6vw;
  }
`;

const Days = styled.div`
  display: grid;
  grid: auto / 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  grid-gap: 0.8vw;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    justify-content: end;
  }
`;

const Day = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  height: 3.43vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.67vw;
  font-family: "FCSM Text", sans-serif;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 5.22vw;
    height: 8.6vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
    height: 12.27vw;
  }
`;

const EventDay = styled.div<{ event: EventEntityDto }>`
  text-decoration: none;
  background: no-repeat center ${({ theme }) => theme.colors.blackLight_whiteGray};
  background-size: 2.6vw;
  height: 3.43vw;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  position: relative;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-size: 6.52vw;
    height: 8.6vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    background-size: 6.4vw;
    height: 12.27vw;
  }
`;

const EventImgContainer = styled.div`
  position: absolute;
  top: 0.15vw;
  width: 100%;
  height: 50%;
  height: 1.46vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    top: 0.36vw;
    height: 3.65vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    top: 0.27vw;
    height: 5.87vw;
  }
`;

const EventFooterContainer = styled.div<{ event: EventEntityDto }>`
  width: 1.25vw;
  height: 1.25vw;
  background-image: ${({ event }) => `url("${event.IsHomeMatch ? House.src : AirplaneTilt.src}")`};
  background-size: cover;
  margin-left: ${({ event: e }) => (e.TournamentShortName ? "50%" : "unset")};
  position: absolute;
  bottom: 0.3vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 3.13vw;
    height: 3.13vw;
    bottom: 0.8vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 4.27vw;
    height: 4.27vw;
    margin-left: unset;
  }
`;

const ShortName = styled.span`
  position: absolute;
  color: ${theme.colors.gray};
  overflow: hidden;
  max-width: 40%;
  bottom: 0;
  margin-right: 50%;
  height: 1.25vw;
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.13vw;
    font-size: 2.08vw;
    bottom: 0.5vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: none;
  }
`;

const PastMatchScore = styled.span`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.red};
  color: ${theme.colors.white};
  width: 100%;
  height: 1.67vw;
  font-size: 0.83vw;
  font-weight: 700;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 3.91vw;
    font-size: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 5.33vw;
    font-size: 3.73vw;
    font-weight: 600;
  }
`;
