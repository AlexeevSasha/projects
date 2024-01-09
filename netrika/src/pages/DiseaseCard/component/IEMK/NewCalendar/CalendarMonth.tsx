import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarEventTypeEnum } from "../../../../../common/interfaces/CalendarEventTypeEnum";
import { styled } from "../../../../../common/styles/styled";
import { IconAmb } from "../../../../../common/components/Icon/IconAmb";
import { IconDeath } from "../../../../../common/components/Icon/IconDeath";
import { IconHosp } from "../../../../../common/components/Icon/IconHosp";
import { IconIndicator } from "../../../../../common/components/Icon/IconIndicator";
import { IconShape } from "../../../../../common/components/Icon/IconShape";
import { BlockInfo, ElemContainer } from "./CalendarMonth/CalendarCell";
import { DaysOfWeek } from "./CalendarMonth/DaysOfWeek";
import { Days } from "./CalendarMonth/Days";
import { ModalMoreInfo } from "./ModalMoreInfo";
import { theme } from "../../../../../common/styles/theme";
import { IconPlusMetRequirement } from "../../../../../common/components/Icon/IconPlusMetRequirement";
import { useDispatch, useSelector } from "react-redux";
import { diseaseCardPatientManagementSelector } from "../../../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { diseaseCardPatientManagementThunk } from "../../../../../module/diseaseCardPatientManagement/diseaseCardPatientManagementThunk";
import { useParams } from "react-router";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IMedicalViolationsDayInfo } from "../../../../../common/interfaces/medical/IMedicalViolationsDayInfo";
import { HeaderWithScroll } from "./CalendarMonth/HeaderWithScroll";

interface IProps {
  onClose: () => void;
  month?: moment.Moment;
  updateMonth: (value: number) => void;
  updateYear: (value: number) => void;
  lastActiveDay: IMedicalViolationsDayInfo | null;
}

export const CalendarMonth: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const { loadingCalendarDay, calendarDay } = useSelector(diseaseCardPatientManagementSelector);
  const { loadingCalendarMonth } = useSelector(diseaseCardPatientManagementSelector);

  const [currentDay, setCurrentDay] = useState(moment(props.month) || moment());
  const [keyMoreInfo, setKeyMoreInfo] = useState<number | undefined>();

  const isLastActiveSMOCurrentDay = useMemo(
    () => currentDay.month() === props.month?.month() && Number(currentDay.format("D")) === props.lastActiveDay?.day,
    [currentDay, props.month, props.lastActiveDay]
  );

  useEffect(() => {
    dispatch(
      diseaseCardPatientManagementThunk.getCalendarDay(
        Number(registerId),
        patientId,
        Number(props.month?.format("M")),
        Number(props.month?.format("YYYY")),
        Number(currentDay.format("D"))
      )
    );
  }, [currentDay, registerId, patientId, props.month, dispatch]);

  const onClick = useCallback((day: moment.Moment) => {
    setCurrentDay(day);
  }, []);

  const openMoreInfo = useCallback((key: number) => {
    setKeyMoreInfo(key);
  }, []);

  const closeMoreInfo = useCallback(() => {
    setKeyMoreInfo(undefined);
  }, []);

  return (
    <>
      <Container id={"month_calendar"}>
        <ContainerCalendar>
          <HeaderWithScroll
            month={props.month}
            onUpdateMonth={props.updateMonth}
            onUpdateYear={props.updateYear}
            onClose={props.onClose}
          />
          {loadingCalendarMonth ? (
            <IconLoading height={480} hidePadding heightContainer={"500px"} />
          ) : (
            <ContentContainer>
              <DaysOfWeek />
              {Array<number>(6)
                .fill(1)
                .map((item, week) =>
                  props.month ? (
                    <Days
                      lastActiveDay={props.lastActiveDay}
                      key={`${item}_${week}`}
                      startDay={props.month}
                      week={week}
                      currentDay={currentDay}
                      onClick={onClick}
                    />
                  ) : (
                    <></>
                  )
                )}
            </ContentContainer>
          )}
        </ContainerCalendar>
        <VerticalLine />
        <DescriptionContainer>
          <TitleDescription>Информация</TitleDescription>
          <DateDescription>
            События за <span id={"active_date"}>{moment(currentDay).format("DD.MM.YYYY")}</span>
          </DateDescription>
          <EventContainer>
            {loadingCalendarDay ? (
              <IconLoading height={450} hidePadding />
            ) : (
              calendarDay &&
              calendarDay.map((item, index) => (
                <ElemContainer key={item.caseId}>
                  <BlockInfo
                    isLastActiveSMO={isLastActiveSMOCurrentDay && index === calendarDay.length - 1}
                    id={`event_${index}`}
                    calendarType={item.cases.code}
                    onClick={() => openMoreInfo(item.caseId)}
                    dayType={item.caseId === keyMoreInfo}
                  >
                    {item.cases.code === CalendarEventTypeEnum.Amb ? (
                      <IconAmb />
                    ) : item.cases.code === CalendarEventTypeEnum.Stat ? (
                      <IconHosp />
                    ) : item.cases.code === CalendarEventTypeEnum.Death ? (
                      <IconDeath />
                    ) : item.cases.code === CalendarEventTypeEnum.MCase ? (
                      <IconDeath />
                    ) : (
                      item.cases.code === CalendarEventTypeEnum.Emerg && <IconShape />
                    )}
                    {item.statuses.some((s) => s.status === CriterionExecuteResultEnum.MetRequirement) && (
                      <IconPlusMetRequirement />
                    )}
                    {item.statuses.some((s) => s.status === CriterionExecuteResultEnum.NotMetRequirement) && (
                      <IconIndicator />
                    )}
                  </BlockInfo>
                </ElemContainer>
              ))
            )}
          </EventContainer>
        </DescriptionContainer>
      </Container>
      {!!keyMoreInfo && <ModalMoreInfo onClose={closeMoreInfo} bizKey={keyMoreInfo} />}
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
  overflow: auto;
  width: 100%;
`;

const VerticalLine = styled.div`
  width: 2px;
  background: ${theme.colors.grayBlue};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 99%;
`;
const TitleDescription = styled.div`
  line-height: 130%;
  color: ${theme.colors.hightBlue};
  margin-bottom: 30px;
`;
const DateDescription = styled.div`
  line-height: 130%;
  color: ${theme.colors.grayBlue};
  margin-bottom: 30px;

  span {
    color: #0fcdab;
  }
`;
const EventContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
