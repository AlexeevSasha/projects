import moment from "moment";
import React from "react";
import styled, { css } from "styled-components";
import { IMedicalCareCase } from "../../../../../common/interfaces/medical/IMedicalCareCase";
import { IconHosp } from "../../../../../common/components/Icon/IconHosp";
import { IconDeath } from "../../../../../common/components/Icon/IconDeath";
import { IconPlusMetRequirement } from "../../../../../common/components/Icon/IconPlusMetRequirement";
import { IconAmb } from "../../../../../common/components/Icon/IconAmb";
import { IconContainerFloatingmes } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconShape } from "../../../../../common/components/Icon/IconShape";
import { CalendarEventTypeEnum } from "../../../../../common/interfaces/CalendarEventTypeEnum";
import { IconIndicator } from "../../../../../common/components/Icon/IconIndicator";
import { theme } from "../../../../../common/styles/theme";

interface IProps {
  daySelected?: boolean;
  value: string;
  onClick?: (day: moment.Moment) => void;
  day?: moment.Moment;
  color?: string;
  events?: IMedicalCareCase[];
  violatDate: (string | Date)[];
  dateMetRequirement: (string | Date)[];
  index: number;
}

export const CalendarCell: React.FC<IProps> = (props) => {
  const { value, daySelected } = props;

  const onClick = () => {
    const { day, onClick } = props;
    if (day != null && onClick != null) {
      onClick(day);
    }
  };

  return (
    <Container>
      <InnerContainer id={`day_${value}`} onClick={onClick}>
        <Text textColor={props.color}>{value}</Text>
        {props.color !== "white" && props.events ? (
          props.events.length ? (
            <ElemContainer>
              <IconContainerFloatingmes
                top={"-50px"}
                position={props.index >= 4 ? "left" : "right"}
                title={props.events[0]?.caseTypeName || "Тип случая обслуживания не указан"}
                visible={props.events.length === 1}
              >
                <BlockInfo
                  dayType={daySelected}
                  calendarType={props.events.length > 1 ? CalendarEventTypeEnum.More : props.events[0].calendarCaseType}
                >
                  {props.events.length > 1 ? (
                    <>{props.events.length}</>
                  ) : props.events[0].calendarCaseType === CalendarEventTypeEnum.Amb ? (
                    <IconAmb />
                  ) : props.events[0].calendarCaseType === CalendarEventTypeEnum.Stat ? (
                    <IconHosp />
                  ) : props.events[0].calendarCaseType === CalendarEventTypeEnum.Death ? (
                    <IconDeath />
                  ) : props.events[0].calendarCaseType === CalendarEventTypeEnum.MCase ? (
                    <IconDeath />
                  ) : props.events[0].calendarCaseType === CalendarEventTypeEnum.Emerg ? (
                    <IconShape />
                  ) : (
                    <></>
                  )}
                  {props.dateMetRequirement.length > 0 && <IconPlusMetRequirement />}
                  {props.violatDate.length > 0 && <IconIndicator />}
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

export const BlockInfo = styled.a<{ calendarType: CalendarEventTypeEnum; dayType?: boolean }>`
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
