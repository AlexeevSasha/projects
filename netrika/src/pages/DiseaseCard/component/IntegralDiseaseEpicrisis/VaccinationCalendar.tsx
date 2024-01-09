import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import {
  selectVaccCalendarType,
  selectVaccinationCalendar,
  selectVaccinationList,
  selectVaccinationType,
} from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { Card } from "../../../../common/components/Card/Card";
import { styled } from "../../../../common/styles/styled";
import { SimpleTable, TableHeaderItem, TableRow } from "common/components/SimpleTable";
import { CustomSelect } from "common/ui/Select/CustomSelect";
import { ICustomSelect } from "common/interfaces/ISelect";
import { IVaccCalendarType, IVaccList } from "common/interfaces/IVaccCalendar";
import { FlexContainer } from "common/ui/FlexContainer";
import { IconSuccessViolation } from "common/components/Icon/IconSuccessViolation";
import { IconErrorViolation } from "common/components/Icon/IconErrorViolation";
import { IconWarningViolation } from "common/components/Icon/IconWarningViolation";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";

interface IProps {
  registerId: string;
  patientId: string;
}

export const VaccinationCalendar: React.FC<IProps> = ({ registerId, patientId }) => {
  const dispatch = useDispatch();

  const { vaccCalendarType, loadingVaccCalendarType } = useSelector(selectVaccCalendarType);
  const { vaccinationList, loadingVaccinationList } = useSelector(selectVaccinationList);
  const { vaccinationType, loadingVaccinationType } = useSelector(selectVaccinationType);
  const { vaccinationCalendar, loadingVaccinationCalendar } = useSelector(selectVaccinationCalendar);

  const [selectedCalendarType, setSelectedCalendarType] = useState<ICustomSelect>();

  useEffect(
    function autoSelectCalendarType() {
      if (vaccCalendarType.length > 0 && !selectedCalendarType) {
        setSelectedCalendarType(castVaccCalendarTypeToOption(vaccCalendarType[0]));
      }
    },
    [selectedCalendarType, vaccCalendarType]
  );

  const openCard = useCallback(async () => {
    if (vaccCalendarType.length === 0) {
      await dispatch(DiseaseCardEpicrisisThunk.getDictVaccCalendarType());
    }
    if (vaccinationList.length === 0) {
      await dispatch(DiseaseCardEpicrisisThunk.getVaccinationList(Number(registerId), patientId));
    }
    if (vaccinationType.length === 0) {
      await dispatch(DiseaseCardEpicrisisThunk.getDictVaccType());
    }
    if (vaccinationCalendar.length === 0) {
      await dispatch(DiseaseCardEpicrisisThunk.getDictVaccCalendar());
    }
  }, [
    dispatch,
    patientId,
    registerId,
    vaccCalendarType.length,
    vaccinationCalendar.length,
    vaccinationList.length,
    vaccinationType.length,
  ]);

  const vaccinationByInfCodeAndVacType = useMemo(
    () =>
      vaccinationList.reduce((acc, item) => {
        const key = `${item.infCode || ""}${normalizeCalendarItemVaccType(item.vacType)}`;
        const existItem = acc[key];
        return { ...acc, [key]: existItem ? [...existItem, item] : [item] };
      }, {} as Record<string, IVaccList[]>),
    [vaccinationList]
  );

  const headers = useMemo(() => [FirstHeader, ...vaccinationType.map(castVaccTypeToTableHeader)], [vaccinationType]);

  return (
    <Card
      id="vaccinationСalendar"
      title="Календарь прививок"
      max_height={600}
      min_height={200}
      isEmpty={!!vaccCalendarType.length || !!vaccinationType.length}
      overflowY={"scroll"}
      onClick={openCard}
      contentStyle={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      contentWrapperStyle={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
    >
      {loadingVaccCalendarType || loadingVaccinationType || loadingVaccinationCalendar || loadingVaccinationList ? (
        <IconLoading />
      ) : (
        <FlexContainer direction="column" alignItems="stretch" style={{ marginBottom: "20px" }}>
          <CustomSelect
            htmlID={"calendar_type"}
            SelectValue={selectedCalendarType}
            options={vaccCalendarType.map(castVaccCalendarTypeToOption)}
            onChange={(value: ICustomSelect) => setSelectedCalendarType(value)}
            isDisabled={false}
          />
        </FlexContainer>
      )}
      {!loadingVaccCalendarType &&
        !loadingVaccinationType &&
        !loadingVaccinationCalendar &&
        !loadingVaccinationList &&
        selectedCalendarType && (
          <SimpleTable headers={headers} bordered minWidth={1130}>
            {vaccinationCalendar
              .filter((item) =>
                selectedCalendarType.value === 1
                  ? item.isNational
                  : selectedCalendarType.value === 2
                  ? item.isEpid
                  : false
              )
              .map((calendarItem) => {
                return (
                  <TableRow
                    key={calendarItem.code}
                    bordered
                    cells={[
                      {
                        id: `${calendarItem.code}${calendarItem.display}`,
                        content: <div>{calendarItem.display}</div>,
                      },
                      ...vaccinationType.map((vaccTypeItem) => {
                        const vaccItemArray = vaccinationByInfCodeAndVacType[calendarItem.code + vaccTypeItem];
                        if (!vaccItemArray) return { id: calendarItem.code + vaccTypeItem, content: null };
                        return {
                          id: calendarItem.code + vaccTypeItem,
                          content: (
                            <FlexContainer>
                              {vaccItemArray.map((vaccItem, i) => (
                                <FlexContainer
                                  key={vaccItem.infCode + `${i}`}
                                  direction="row"
                                  spacing={0}
                                  wrap="nowrap"
                                >
                                  <IconContainerFloatingmes title={vaccItem.status} position={"right"} noMarg>
                                    <CalendarIconContainer>
                                      {getCalendarItemIcon(Number(vaccItem.statusCode))}
                                    </CalendarIconContainer>
                                  </IconContainerFloatingmes>
                                  <CalendarDateContainer>
                                    {moment(vaccItem.vaccDate).format("DD.MM.YYYY")}
                                  </CalendarDateContainer>
                                </FlexContainer>
                              ))}
                            </FlexContainer>
                          ),
                        };
                      }),
                    ]}
                  />
                );
              })}
          </SimpleTable>
        )}
    </Card>
  );
};

const castVaccCalendarTypeToOption = (dto: IVaccCalendarType): ICustomSelect => ({
  label: dto.display,
  value: dto.code,
});

const castVaccTypeToTableHeader = (dto: string) => ({
  id: dto,
  title: dto,
  // style: { textAlign: "center" },
});

const normalizeCalendarItemVaccType = (itemVaccType: string) => {
  const withoutSlash = itemVaccType.split("/")[0];
  if (!withoutSlash.includes("RV")) return withoutSlash;
  const vaccNumber = +withoutSlash.split("RV")[1];
  if (vaccNumber > 4) return "RVn";
  return withoutSlash;
};

const getCalendarItemIcon = (statusCode?: number) =>
  statusCode === 1 ? (
    <IconSuccessViolation />
  ) : statusCode === 2 ? (
    <IconWarningViolation />
  ) : statusCode === 3 ? (
    <IconErrorViolation />
  ) : null;

const FirstHeader: TableHeaderItem = { title: "", id: "openGroupBtn", style: { width: "10%" } };

const CalendarDateContainer = styled.div`
  white-space: nowrap;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const CalendarIconContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;
