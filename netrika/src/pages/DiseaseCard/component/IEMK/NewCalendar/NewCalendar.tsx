import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { diseaseCardPatientManagementSelector } from "../../../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { Card } from "../../../../../common/components/Card/Card";
import { ShowMoreDiv } from "../../../style/ShowMoreDiv";
import { CalendarYear } from "./CalendarYear";
import { CalendarMonth } from "./CalendarMonth";
import { diseaseCardPatientManagementThunk } from "../../../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementThunk";
import { useParams } from "react-router";
import { theme } from "../../../../../common/styles/theme";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { IMedicalViolationsMonthInfo } from "common/interfaces/medical/IMedicalViolationsMonthInfo";
import { getFilteredCalendar } from "../../../helpers/getFilteredCalendar";

export const NewCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useContext(IsOpenCardContext);
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const state = useSelector(diseaseCardPatientManagementSelector);
  const { calendarMonth } = useSelector(diseaseCardPatientManagementSelector);

  const [year, setYear] = useState(new Date().getFullYear());
  const initialState: number[] = new Array(5).fill(null).map((item, index) => year - index);
  const [yearArray, updateYearArray] = useState(initialState);
  const [month, setMonth] = useState<moment.Moment | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<IMedicalViolationsMonthInfo[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const newCalendar = state.newCalendar;

  const lastActiveMonth = useMemo(
    () =>
      isFiltered
        ? !!filteredData?.length
          ? filteredData[filteredData.length - 1]
          : null
        : !!newCalendar?.length
        ? newCalendar[newCalendar.length - 1]
        : null,
    [isFiltered, newCalendar, filteredData]
  );

  const lastActiveDay = useMemo(
    () =>
      !!calendarMonth.length &&
      month &&
      month.month() + 1 === lastActiveMonth?.month &&
      month?.year() === lastActiveMonth?.year
        ? calendarMonth.sort((a, b) => (a.day > b.day ? 1 : -1))[calendarMonth.length - 1]
        : null,
    [calendarMonth, lastActiveMonth, month]
  );

  useEffect(() => {
    if (isOpen("card_pomps")) {
      const data = getFilteredCalendar({
        calendar: newCalendar,
        pomp: state.pomp,
        setIsFiltered,
        isOpen,
      }) as IMedicalViolationsMonthInfo[];
      setFilteredData(data);
    } else {
      setIsFiltered(false);
    }
  }, [isOpen, newCalendar, state.pomp]);

  const showNext = () => {
    if (year < new Date().getFullYear()) {
      setYear(year + 5);
      updateYearArray(new Array(5).fill(null).map((item, index) => year + 5 - index));
    }
  };

  const showPrev = () => {
    if (year > 0) {
      setYear(year - 5);
      updateYearArray(new Array(5).fill(null).map((item, index) => year - 5 - index));
    }
  };

  const updateMonth = (value: number) => {
    if (month) setMonth(month.clone().add(value, "month"));
  };

  const updateYear = (value: number) => {
    if (month) setMonth(month.clone().add(value, "year"));
  };

  const openMonthCalendar = (month: number, year: number) => {
    setMonth(moment(new Date(year, month - 1, 1)));
  };
  useEffect(() => {
    month &&
      dispatch(
        diseaseCardPatientManagementThunk.getCalendarMonth(
          Number(registerId),
          patientId,
          Number(month?.format("M")),
          Number(month?.format("YYYY"))
        )
      );
  }, [month, registerId, patientId, dispatch]);

  return (
    <>
      <Card id={"calendar"} title={"Календарь"} onUpdateChildren={yearArray} max_height={undefined}>
        {state.errorCalendar ? (
          <div style={{ color: theme.colors.opacityGray, marginBottom: "15px" }}>Ошибка получения данных</div>
        ) : state.loadingCalendar && !yearArray.length ? (
          <IconLoading />
        ) : month ? (
          <>
            <CalendarMonth
              lastActiveDay={lastActiveDay}
              onClose={() => setMonth(undefined)}
              updateMonth={updateMonth}
              updateYear={updateYear}
              month={month}
            />
          </>
        ) : (
          <>
            <ShowMoreDiv id={"show_next"} onClick={showNext}>
              Показать позже
            </ShowMoreDiv>
            <CalendarYear
              lastCaseDate={lastActiveMonth}
              yearArray={yearArray}
              calendar={isFiltered ? filteredData : newCalendar}
              clickMonth={openMonthCalendar}
            />
            <ShowMoreDiv id={"show_prev"} onClick={showPrev}>
              Показать ранее
            </ShowMoreDiv>
          </>
        )}
      </Card>
    </>
  );
};
