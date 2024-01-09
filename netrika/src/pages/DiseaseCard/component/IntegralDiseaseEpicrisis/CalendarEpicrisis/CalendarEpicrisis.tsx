import moment, { Moment } from "moment";
import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectMedicalCareCase } from "../../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { Card } from "../../../../../common/components/Card/Card";
import { ShowMoreDiv } from "../../../style/ShowMoreDiv";
import { CalendarEpicrisisMonth } from "./CalendarEpicrisisMonth";
import { CalendarEpicrisisYear } from "./CalendarEpicrisisYear";

interface IProps {
  titleCard: string;
  pickDates: (date: Moment, type: "year" | "month" | "day") => void;
  hideMonth?: boolean;
  filters?: ReactNode;
  footer?: ReactNode;
}

export const CalendarEpicrisis: React.FC<IProps> = ({ titleCard, pickDates, hideMonth, filters, footer }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const initialState: number[] = new Array(5).fill(null).map((_, index) => year - index);
  const [yearArray, updateYearArray] = useState(initialState);
  const [month, setMonth] = useState<Moment | undefined>();

  const { medicalCareCase } = useSelector(selectMedicalCareCase);

  const showNext = () => {
    if (year < new Date().getFullYear()) {
      setYear(year + 5);
      updateYearArray(new Array(5).fill(null).map((_, index) => year + 5 - index));
    }
  };

  const showPrev = () => {
    if (year > 0) {
      setYear(year - 5);
      updateYearArray(new Array(5).fill(null).map((_, index) => year - 5 - index));
    }
  };

  const updateMonth = (value: number) => {
    if (month) setMonth(month.clone().add(value, "month"));
  };

  const updateYear = (value: number) => {
    if (month) setMonth(month.clone().add(value, "year"));
  };

  const openMonthCalendar = (month: number, year: number, changeable: boolean) => {
    if (changeable) {
      pickDates(moment(new Date(year, month - 1, 1)), "month");
      if (!hideMonth) setMonth(moment(new Date(year, month - 1, 1)));
    }
  };

  const returnToYear = () => {
    setMonth(undefined);
    pickDates(moment(new Date(year, 1, 1)), "year");
  };

  return (
    <Card
      id={"calendar"}
      title={titleCard}
      onUpdateChildren={yearArray}
      isEmpty={!medicalCareCase}
      containerStyle={{ flexShrink: 0, marginBottom: 0 }}
      contentStyle={!month ? { padding: "2px" } : undefined}
    >
      {filters ? <FitlerContainer>{filters}</FitlerContainer> : null}
      <div>
        {medicalCareCase ? (
          month ? (
            <CalendarEpicrisisMonth
              onClose={returnToYear}
              updateMonth={updateMonth}
              updateYear={updateYear}
              month={month}
              data={medicalCareCase}
              pickDay={pickDates}
              violatDate={[]}
              dateMetRequirement={[]}
            />
          ) : (
            <>
              <CalendarShowMore id={"show_next"} onClick={showNext}>
                Показать позже
              </CalendarShowMore>

              <CalendarEpicrisisYear
                yearArray={yearArray}
                calendar={{
                  events: (medicalCareCase || []).map((item) => ({
                    caseTypeName: item.caseTypeName,
                    type: item.calendarCaseType,
                    date: item.caseOpenAt,
                  })),
                }}
                clickMonth={openMonthCalendar}
                violatDate={[]}
              />

              <CalendarShowMore id={"show_prev"} onClick={showPrev}>
                Показать ранее
              </CalendarShowMore>
            </>
          )
        ) : (
          <IconLoading />
        )}
      </div>
      {footer || null}
    </Card>
  );
};

const CalendarShowMore = styled(ShowMoreDiv)`
  padding: 5px 0;
`;

const FitlerContainer = styled.div`
  margin-bottom: 10px;
`;
