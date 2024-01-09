import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { CalendarCell } from "./CalendarCell";
import { IMedicalCareCase } from "../../../../../common/interfaces/medical/IMedicalCareCase";
import { theme } from "../../../../../common/styles/theme";
import styled from "styled-components";

interface IProps {
  startDay: moment.Moment;
  week: number;
  currentDay: moment.Moment;
  onClick?: (day: moment.Moment) => void;
  medicalCareCase: IMedicalCareCase[];
  violatDate: (string | Date)[];
  dateMetRequirement: (string | Date)[];
}

export const Days: React.FC<IProps> = ({ startDay, week, onClick, currentDay, ...props }) => {
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
        {days.map((day, index) => (
          <CalendarCell
            index={index}
            key={day.format("D")}
            value={day.format("D")}
            daySelected={getDayType(day)}
            color={startDay.clone().format("MMMM") === day.clone().format("MMMM") ? theme.colors.hightBlue : "white"}
            onClick={startDay.clone().format("MMMM") === day.clone().format("MMMM") ? onClick : undefined}
            violatDate={props.violatDate.filter(
              (item) => moment(item).format("DD MM YYYY") === moment(day).format("DD MM YYYY")
            )}
            dateMetRequirement={props.dateMetRequirement.filter(
              (item) => moment(item).format("DD MM YYYY") === moment(day).format("DD MM YYYY")
            )}
            events={props.medicalCareCase.filter(
              (item) => moment(item.caseOpenAt).format("DD MM YYYY") === moment(day).format("DD MM YYYY")
            )}
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
  justify-content: space-around;
`;
