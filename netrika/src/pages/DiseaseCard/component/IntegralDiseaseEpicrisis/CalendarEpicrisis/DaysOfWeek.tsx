import React from "react";
import { CalendarCell } from "./CalendarCell";
import styled from "styled-components";

export const DaysOfWeek: React.FC = () => {
  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((day, index) => (
    <CalendarCell key={day} value={day} daySelected={false} violatDate={[]} index={index} dateMetRequirement={[]}>
      {day}
    </CalendarCell>
  ));
  return <Container>{daysOfWeek}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
