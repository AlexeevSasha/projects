import moment from "moment";
import React from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";

interface IProps {
  daySelected?: boolean;
  value: string;
  onClick?: (day: moment.Moment) => void;
  day?: moment.Moment;
  color?: string;
}

export const CalendarCell: React.FC<IProps> = ({ value, daySelected, day, onClick, ...props }) => {
  const handlerClick = () => {
    if (day != null && onClick != null) {
      onClick(day);
    }
  };

  return (
    <Container>
      <InnerContainer dayType={daySelected} onClick={handlerClick} id={moment(day).format("DD.MM.YYYY")}>
        <Text textColor={props.color} dayType={daySelected}>
          {value}
        </Text>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const InnerContainer = styled.div<{ dayType?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;

  opacity: ${(props) => (props.dayType ? "0.8" : "1")};
  background-color: ${(props) => (props.dayType ? theme.colors.green : theme.colors.white)};
`;

const Text = styled.span<{ dayType?: boolean; textColor?: string }>`
  font-family: Roboto, sans-serif;
  color: ${(props) => (props.dayType ? "white" : props.textColor ? props.textColor : "#B0BEC5")};
  position: relative;
  user-select: none;
`;
