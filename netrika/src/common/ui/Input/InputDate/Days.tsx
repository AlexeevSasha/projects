import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { CalendarCell } from "./CalendarCell";
import { styled } from "../../../styles/styled";

interface IProps {
  startDay: moment.Moment;
  week: number;
  currentDay: moment.Moment;
  onClick?: (day: moment.Moment) => void;
}

export const Days: React.FC<IProps> = ({ startDay, week, onClick, currentDay }) => {
  const days = useMemo(() => {
    const startDayIndex = startDay.day() === 0 ? 7 : startDay.day();
    return Array(7)
      .fill(1)
      .map((item, index) => startDay.clone().add(7 * week + index - startDayIndex + 1, "days"));
  }, [startDay, week]);

  const getDayType = useCallback(
    (day: moment.Moment) => {
      return (
        currentDay
          .clone()
          .startOf("day")
          .toString() ===
        day
          .clone()
          .startOf("day")
          .toString()
      );
    },
    [currentDay]
  );

  if (
    days[0].toDate() <=
    startDay
      .clone()
      .endOf("month")
      .toDate()
  ) {
    return (
      <Container>
        {days.map((day) => (
          <CalendarCell
            key={day.format("D")}
            value={day.format("D")}
            daySelected={getDayType(day)}
            color={startDay.clone().format("MMMM") === day.clone().format("MMMM") ? "#333333" : undefined}
            onClick={onClick}
            day={day}
          />
        ))}
      </Container>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
