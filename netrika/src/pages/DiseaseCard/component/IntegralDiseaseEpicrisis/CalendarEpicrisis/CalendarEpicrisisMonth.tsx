import moment from "moment";
import React, { useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { IMedicalCareCase } from "../../../../../common/interfaces/medical/IMedicalCareCase";
import { HeaderWithScroll } from "./HeaderWithScroll";
import { DaysOfWeek } from "./DaysOfWeek";
import { Days } from "./Days";

interface IProps {
  onClose: () => void;
  month?: moment.Moment;
  updateMonth: (value: number) => void;
  updateYear: (value: number) => void;
  data: IMedicalCareCase[];
  pickDay: (date: moment.Moment, type: "month" | "day") => void;
  violatDate: (string | Date)[];
  dateMetRequirement: (string | Date)[];
}

export const CalendarEpicrisisMonth: React.FC<IProps> = (props) => {
  const [currentDay, setCurrentDay] = useState(moment(props.month) || moment());

  const onClick = (day: moment.Moment) => {
    setCurrentDay(day);
    props.pickDay(day, "day");
  };

  return (
    <>
      <Container>
        <ContainerCalendar>
          <HeaderWithScroll
            month={props.month}
            onUpdateMonth={props.updateMonth}
            onUpdateYear={props.updateYear}
            onClose={props.onClose}
          />
          <ContentContainer>
            <DaysOfWeek />
            {Array<number>(6)
              .fill(1)
              .map((item, week) =>
                props.month ? (
                  <Days
                    key={week}
                    startDay={props.month}
                    week={week}
                    currentDay={currentDay}
                    onClick={onClick}
                    medicalCareCase={props.data}
                    violatDate={props.violatDate}
                    dateMetRequirement={props.dateMetRequirement}
                  />
                ) : (
                  <></>
                )
              )}
          </ContentContainer>
        </ContainerCalendar>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
`;

const ContentContainer = styled.div`
  padding: 0 0 10px 0;
`;

const ContainerCalendar = styled.div`
  display: block;
  background: white;
  width: 100%;
`;
