import React from "react";
import { CalendarCell } from "./CalendarCell";
import { styled } from "../../../styles/styled";

export const DaysOfWeek: React.FC = () => {
  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day) => (
    <CalendarCell key={day} value={day} daySelected={false}>
      {day}
    </CalendarCell>
  ));
  return <Container>{daysOfWeek}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
