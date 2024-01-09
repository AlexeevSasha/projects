import React from "react";
import { css, styled } from "../../../../../common/styles/styled";
import { CalendarEventTypeEnum } from "../../../../../common/interfaces/CalendarEventTypeEnum";
import { IconAmb } from "../../../../../common/components/Icon/IconAmb";
import { IconHosp } from "../../../../../common/components/Icon/IconHosp";
import { IconDeath } from "../../../../../common/components/Icon/IconDeath";
import { IconShape } from "../../../../../common/components/Icon/IconShape";
import { IconContainerFloatingmes } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { theme } from "../../../../../common/styles/theme";
import { IconPlusMetRequirement } from "../../../../../common/components/Icon/IconPlusMetRequirement";
import { IMedicalViolationsMonthInfo } from "../../../../../common/interfaces/medical/IMedicalViolationsMonthInfo";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconIndicator } from "../../../../../common/components/Icon/IconIndicator";

const monthName = ["", "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

interface IProps {
  yearArray: number[];
  calendar: IMedicalViolationsMonthInfo[];
  lastCaseDate: IMedicalViolationsMonthInfo | null;
  clickMonth: (month: number, year: number) => void;
}

export const CalendarYear: React.FC<IProps> = (props) => {
  return (
    <>
      <Container id={"year_calendar"}>
        {monthName.map((item, index) => (
          <ElemContainer key={item} id={`month_${index}`}>
            <Text>{item}</Text>
          </ElemContainer>
        ))}
        {props.yearArray?.map((year) => (
          <React.Fragment key={year}>
            <ElemContainer id={`year_${year}`}>
              <Text>{year}</Text>
            </ElemContainer>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
              const date =
                props.calendar?.find((item) => item.month === month && item.year === year) ||
                ({ year, month, cases: [], status: [], caseCount: 0 } as IMedicalViolationsMonthInfo);

              if (date?.caseCount > 1) {
                return (
                  <ElemContainer key={month}>
                    <IconContainerFloatingmes position={month >= 7 ? "left" : "right"} title={""} visible={false}>
                      <BlockInfoMonth
                        isLastActiveSMO={
                          date.year === props.lastCaseDate?.year && date.month === props.lastCaseDate?.month
                        }
                        calendarType={CalendarEventTypeEnum.More}
                        onClick={() => {
                          date?.caseCount > 0 && props.clickMonth(month, year);
                        }}
                        id={`year_${year}_month_${month}`}
                      >
                        <div style={{ fontSize: "40px" }}>{date.caseCount}</div>
                        {date.status.find((s) => s === CriterionExecuteResultEnum.MetRequirement) && (
                          <IconPlusMetRequirement />
                        )}
                        {date.status.find((s) => s === CriterionExecuteResultEnum.NotMetRequirement) && (
                          <IconIndicator />
                        )}
                      </BlockInfoMonth>
                    </IconContainerFloatingmes>
                  </ElemContainer>
                );
              }
              return (
                <ElemContainer key={month}>
                  <IconContainerFloatingmes
                    position={month >= 7 ? "left" : "right"}
                    title={date?.cases?.[0]?.name || "Тип случая обслуживания не указан"}
                    visible={date.caseCount === 1}
                  >
                    <BlockInfoMonth
                      isLastActiveSMO={
                        date.year === props.lastCaseDate?.year && date.month === props.lastCaseDate?.month
                      }
                      calendarType={date?.cases?.[0]?.code || CalendarEventTypeEnum.None}
                      onClick={() => {
                        date?.caseCount > 0 && props.clickMonth(month, year);
                      }}
                      id={`year_${year}_month_${month}`}
                    >
                      {date.cases?.length > 0 &&
                        (date.cases[0].code === CalendarEventTypeEnum.Amb ? (
                          <IconAmb />
                        ) : date.cases[0].code === CalendarEventTypeEnum.Stat ? (
                          <IconHosp />
                        ) : date.cases[0].code === CalendarEventTypeEnum.Death ? (
                          <IconDeath />
                        ) : date.cases[0].code === CalendarEventTypeEnum.MCase ? (
                          <IconDeath />
                        ) : date.cases[0].code === CalendarEventTypeEnum.Emerg ? (
                          <IconShape />
                        ) : (
                          <></>
                        ))}
                      {date.status.find((s) => s === CriterionExecuteResultEnum.MetRequirement) && (
                        <IconPlusMetRequirement />
                      )}
                      {date.status.find((s) => s === CriterionExecuteResultEnum.NotMetRequirement) && <IconIndicator />}
                    </BlockInfoMonth>
                  </IconContainerFloatingmes>
                </ElemContainer>
              );
            })}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69% 7.69%;
  min-width: 1352px;
`;

const ElemContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 20px;
`;

const Text = styled.span`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  letter-spacing: 0.005em;
  color: ${theme.colors.hightBlue};
  mix-blend-mode: normal;
  opacity: 0.6;
`;

export const BlockInfoMonth = styled.a<{ calendarType: CalendarEventTypeEnum; isLastActiveSMO?: boolean }>`
  position: relative;
  mix-blend-mode: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  height: 60px;
  width: 60px;
  cursor: pointer;
  color: white;
  font-size: 40px;

  margin-top: 20px;
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
  ${(props) => {
    if (props.isLastActiveSMO) {
      return css`
        border: 5px solid ${theme.colors.green} !important;
        padding: 4px !important;
      `;
    } else return css``;
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
