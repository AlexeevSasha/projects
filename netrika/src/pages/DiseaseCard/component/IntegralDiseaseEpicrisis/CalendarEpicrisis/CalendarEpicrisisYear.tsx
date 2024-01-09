import React from "react";
import { css, styled } from "../../../../../common/styles/styled";
import moment from "moment";
import { CalendarEventTypeEnum } from "../../../../../common/interfaces/CalendarEventTypeEnum";
import { IconAmb } from "../../../../../common/components/Icon/IconAmb";
import { IconHosp } from "../../../../../common/components/Icon/IconHosp";
import { IconDeath } from "../../../../../common/components/Icon/IconDeath";
import { IconShape } from "../../../../../common/components/Icon/IconShape";
import { IconIndicator } from "../../../../../common/components/Icon/IconIndicator";
import { theme } from "../../../../../common/styles/theme";
import { FlexContainer } from "common/ui/FlexContainer";

const monthArr = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

interface ICalendar {
  events: { type: CalendarEventTypeEnum; date: Date | string; caseTypeName: string | null }[];
}

interface IProps {
  yearArray: number[];
  calendar: ICalendar;
  clickMonth: (month: number, year: number, changeable: boolean) => void;
  violatDate: (string | Date)[];
}

export const CalendarEpicrisisYear: React.FC<IProps> = (props) => {
  return (
    <Container id={"year_calendar"}>
      <FlexContainer alignItems="stretch" spacing={3}>
        <FlexContainer direction="row" justify="space-around" spacing={3}>
          {/* Пустой элемент под колонку с годом */}
          <ElemContainer />
          {monthArr.map((item, index) => (
            <ElemContainer key={item} id={`month_${index}`}>
              <Text>{item}</Text>
            </ElemContainer>
          ))}
        </FlexContainer>
        {props.yearArray.map((year) => (
          <FlexContainer key={year} direction="row" justify="space-between" spacing={3}>
            <ElemContainer id={`year_${year}`}>
              <Text>{year}</Text>
            </ElemContainer>
            {monthArr.map((_, i) => {
              const monthNumber = i + 1;
              const date = props.calendar.events
                .filter((event) => Number(moment(event.date).format("YYYY")) === year)
                .filter((event) => Number(moment(event.date).format("MM")) === monthNumber);
              const violat = props.violatDate
                .filter((event) => Number(moment(event).format("YYYY")) === year)
                .filter((event) => Number(moment(event).format("MM")) === monthNumber);
              if (date.length > 1) {
                return (
                  <BlockInfo
                    key={monthNumber}
                    title={date[0]?.caseTypeName || "Тип случая обслуживания не указан"}
                    calendarType={CalendarEventTypeEnum.More}
                    onClick={() => props.clickMonth(monthNumber, year, date.length > 0)}
                    id={`year_${year}_month_${monthNumber}`}
                  >
                    <div style={{ fontSize: 25 }}>{date.length}</div>
                  </BlockInfo>
                );
              }
              return (
                <BlockInfo
                  key={monthNumber}
                  title={date[0]?.caseTypeName || "Тип случая обслуживания не указан"}
                  calendarType={date.length > 0 ? date[0].type : CalendarEventTypeEnum.None}
                  onClick={() => props.clickMonth(monthNumber, year, date.length > 0)}
                  id={`year_${year}_month_${monthNumber}`}
                >
                  {date.length > 0 &&
                    (date[0].type === CalendarEventTypeEnum.Amb ? (
                      <IconAmb size={20} />
                    ) : date[0].type === CalendarEventTypeEnum.Stat ? (
                      <IconHosp size={20} />
                    ) : date[0].type === CalendarEventTypeEnum.Death ? (
                      <IconDeath size={20} />
                    ) : date[0].type === CalendarEventTypeEnum.MCase ? (
                      <IconDeath size={20} />
                    ) : date[0].type === CalendarEventTypeEnum.Emerg ? (
                      <IconShape size={20} />
                    ) : (
                      <>3</>
                    ))}
                  {violat.length > 0 && <IconIndicator />}
                </BlockInfo>
              );
            })}
          </FlexContainer>
        ))}
      </FlexContainer>
    </Container>
  );
};

const calendarCellSize = "22px";

const Container = styled.div`
  /* display: grid;
  grid-template-columns: 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69%; */
`;

const ElemContainer = styled.div`
  min-width: ${calendarCellSize};
  text-align: center;
`;

const Text = styled.span`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.005em;
  font-size: 10px;

  color: ${theme.colors.hightBlue};

  mix-blend-mode: normal;
  opacity: 0.6;
`;

const BlockInfo = styled.a<{ calendarType: CalendarEventTypeEnum }>`
  position: relative;
  mix-blend-mode: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: ${calendarCellSize};
  height: ${calendarCellSize};
  cursor: pointer;
  color: white;
  box-sizing: border-box;

  ${(props) => {
      switch (props.calendarType) {
        case CalendarEventTypeEnum.Amb:
          return css`
            background: #a076dc;
            border: 1px solid #a076dc;
          `;
        case CalendarEventTypeEnum.Death:
          return css`
            background: #ebeff2;
            border: 1px solid #686b6d;
          `;
        case CalendarEventTypeEnum.MCase:
          return css`
            background: #ebeff2;
            border: 1px solid #686b6d;
          `;
        case CalendarEventTypeEnum.Emerg:
          return css`
            background: #29a3fd;
            border: 1px solid #29a3fd;
          `;
        case CalendarEventTypeEnum.Stat:
          return css`
            background: ${theme.colors.lightRed};
            border: 1px solid ${theme.colors.lightRed};
          `;
        case CalendarEventTypeEnum.More:
          return css`
            background: linear-gradient(180deg, #0fcdab 4.72%, #05c2b6 98.99%);
            border: 1px solid #0fcdab;
            box-shadow: 0 4px 13px rgba(96, 120, 144, 0.2);
          `;
        case CalendarEventTypeEnum.None:
          return css`
            background: ${theme.colors.hightBlue};
            opacity: 0.12;
            border: 1px solid ${theme.colors.hightBlue};
          `;
      }
    }}
    :hover {
    ${(props) => {
      switch (props.calendarType) {
        case CalendarEventTypeEnum.Amb:
        case CalendarEventTypeEnum.Death:
        case CalendarEventTypeEnum.MCase:
        case CalendarEventTypeEnum.Emerg:
        case CalendarEventTypeEnum.Stat:
        case CalendarEventTypeEnum.More:
          return css`
            opacity: 0.8;
          `;
        case CalendarEventTypeEnum.None:
          return css``;
      }
    }}
  }
`;
