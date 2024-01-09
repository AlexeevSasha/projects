import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../../../common/styles/theme";
import { CalendarEventTypeEnum } from "../../../../../../common/interfaces/CalendarEventTypeEnum";
import { IconAmb } from "../../../../../../common/components/Icon/IconAmb";
import { IconHosp } from "../../../../../../common/components/Icon/IconHosp";
import { IconDeath } from "../../../../../../common/components/Icon/IconDeath";
import { IconShape } from "../../../../../../common/components/Icon/IconShape";
import { css } from "../../../../../../common/styles/styled";
import { IconIndicator } from "../../../../../../common/components/Icon/IconIndicator";
import { IconContainerFloatingmes } from "../../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconPlusMetRequirement } from "../../../../../../common/components/Icon/IconPlusMetRequirement";
import { useSelector } from "react-redux";
import { diseaseCardPatientManagementSelector } from "../../../../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import { CriterionExecuteResultEnum } from "../../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { getFilteredCalendar } from "../../../../helpers/getFilteredCalendar";
import { IMedicalViolationsDayInfo } from "common/interfaces/medical/IMedicalViolationsDayInfo";

interface IProps {
  daySelected?: boolean;
  value: string;
  onClick?: (day: moment.Moment, dayNumber: number) => void;
  day?: moment.Moment;
  color?: string;
  index: number;
  isDaysOfWeek?: boolean;
  isActiveDay?: boolean;
}

const initialStateCalendar = {
  caseCount: 0,
  status: [],
  cases: [],
  day: 0,
};

export const CalendarCell: React.FC<IProps> = ({ value, daySelected, ...props }) => {
  const { isOpen } = useContext(IsOpenCardContext);
  const { calendarMonth: calendar, pomp } = useSelector(diseaseCardPatientManagementSelector);

  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<IMedicalViolationsDayInfo>(initialStateCalendar);

  const getCalendarMonth = (calendar: IMedicalViolationsDayInfo[]) => {
    const calendarMonth = calendar.find((m) => m.day === Number(value));
    return calendarMonth || initialStateCalendar;
  };

  useEffect(() => {
    if (calendar) {
      const filteredCalendar = getFilteredCalendar({
        month: calendar,
        pomp,
        isOpen,
        setIsFiltered,
      }) as IMedicalViolationsDayInfo[];
      if (isOpen("card_pomps") && isFiltered) {
        setCalendarMonth(getCalendarMonth(filteredCalendar));
      } else {
        setCalendarMonth(getCalendarMonth(calendar));
      }
    } else {
      setCalendarMonth(initialStateCalendar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, calendar, isFiltered, pomp]);

  const onClick = () => {
    const { day, onClick } = props;
    if (day != null && onClick != null && calendarMonth) {
      onClick(day, calendarMonth.day);
    }
  };

  return (
    <Container>
      <InnerContainer id={`day_${value}`} onClick={onClick}>
        <Text textColor={props.color}>{value}</Text>
        {props.color !== "white" && !props.isDaysOfWeek ? (
          calendarMonth?.caseCount ? (
            <ElemContainer>
              <IconContainerFloatingmes
                top={"-50px"}
                position={props.index >= 4 ? "left" : "right"}
                title={calendarMonth?.cases?.[0].name || "Тип случая обслуживания не указан"}
                visible={calendarMonth.caseCount === 1}
              >
                <BlockInfo
                  isLastActiveSMO={props.isActiveDay}
                  dayType={daySelected}
                  calendarType={calendarMonth.caseCount > 1 ? CalendarEventTypeEnum.More : calendarMonth.cases[0].code}
                >
                  {calendarMonth.caseCount > 1 ? (
                    <>{calendarMonth.caseCount}</>
                  ) : calendarMonth.cases[0].code === CalendarEventTypeEnum.Amb ? (
                    <IconAmb />
                  ) : calendarMonth.cases[0].code === CalendarEventTypeEnum.Stat ? (
                    <IconHosp />
                  ) : calendarMonth.cases[0].code === CalendarEventTypeEnum.Death ? (
                    <IconDeath />
                  ) : calendarMonth.cases[0].code === CalendarEventTypeEnum.MCase ? (
                    <IconDeath />
                  ) : calendarMonth.cases[0].code === CalendarEventTypeEnum.Emerg ? (
                    <IconShape />
                  ) : (
                    <></>
                  )}
                  {calendarMonth?.status?.find((s) => s === CriterionExecuteResultEnum.MetRequirement) && (
                    <IconPlusMetRequirement />
                  )}
                  {calendarMonth.status?.find((s) => s === CriterionExecuteResultEnum.NotMetRequirement) && (
                    <IconIndicator />
                  )}
                </BlockInfo>
              </IconContainerFloatingmes>
            </ElemContainer>
          ) : (
            <ElemContainer>
              <BlockInfo calendarType={CalendarEventTypeEnum.None} dayType={daySelected} />
            </ElemContainer>
          )
        ) : (
          <ElemContainer>
            <span style={{ width: "60px" }} />
          </ElemContainer>
        )}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Text = styled.span<{ textColor?: string }>`
  font-family: Roboto, sans-serif;
  color: ${(props) => (props.textColor ? props.textColor : "#B0BEC5")};
  position: relative;
  user-select: none;
  opacity: 0.6;
`;

export const ElemContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 15px;
`;

export const BlockInfo = styled.a<{
  calendarType: CalendarEventTypeEnum;
  dayType?: boolean;
  isLastActiveSMO?: boolean;
}>`
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

  ${(props) => {
    if (props.isLastActiveSMO) {
      return css`
        border: 5px solid ${theme.colors.green} !important;
        padding: 4px !important;
      `;
    } else return css``;
  }}

  ${(props) => {
    switch (props.calendarType) {
      case CalendarEventTypeEnum.Amb:
        return css`
          background: #a076dc;
          border: 2px solid #a076dc;
        `;
      case CalendarEventTypeEnum.Death:
        return css`
          background: #ebeff2;
          border: 2px solid #686b6d;
        `;
      case CalendarEventTypeEnum.MCase:
        return css`
          background: #ebeff2;
          border: 2px solid #686b6d;
        `;
      case CalendarEventTypeEnum.Emerg:
        return css`
          background: #29a3fd;
          border: 2px solid #29a3fd;
        `;
      case CalendarEventTypeEnum.Stat:
        return css`
          background: ${theme.colors.lightRed};
          border: 2px solid ${theme.colors.lightRed};
        `;
      case CalendarEventTypeEnum.More:
        return css`
          background: linear-gradient(180deg, #0fcdab 4.72%, #05c2b6 98.99%);
          border: 2px solid #0fcdab;
          box-shadow: 0 4px 13px rgba(96, 120, 144, 0.2);
        `;
      case CalendarEventTypeEnum.None:
        return css`
          background: #eceff2;
          border: 2px solid #eceff2;
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

  border: ${(props) => (props.dayType ? `2px solid ${theme.colors.green}` : `1px solid ${theme.colors.white}`)};
`;
