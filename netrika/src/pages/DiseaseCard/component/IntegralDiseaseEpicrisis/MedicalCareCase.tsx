import { CalendarEventTypeEnum } from "common/interfaces/CalendarEventTypeEnum";
import { css, styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { selectFilteredMedicalCareCase } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconEye } from "common/components/Icon/IconEye";
import { Card } from "common/components/Card/Card";
import { BlockLine } from "../../style/BlockLine";
import { BorderGreen } from "../../style/BorderGreen";
import { Type, Value } from "../../style/Description";
import { CardParamLine, CardParamTitle, CardParamValue } from "../../style/CardParam";
import { getIconCareCase } from "../../helpers/getIconDisaese";
import { IntegralDiseaseEpicrisisApiRequest } from "../../../../api/integralDiseaseEpicrisisApiRequest";
import { saveAs } from "file-saver";
import { errorPopup } from "../../../../common/helpers/toast/error";
import { IconContainerFloatingmes } from "../../../../common/components/Table/UIcomponent/UIcomponent";
import { AppSettings } from "../../../../common/constants/appSettings";
import { Accordion } from "../../../../common/components/Accordion/Accordion";

const COUNT = 2;

export const MedicalCareCase: React.FC = () => {
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();
  const [count, setCount] = useState(COUNT);

  const medicalCareCase = useSelector(selectFilteredMedicalCareCase);
  const visibleCareCase = useMemo(() => medicalCareCase.slice(0, count), [medicalCareCase, count]);

  const handleShowMore = () =>
    setCount(count + COUNT > medicalCareCase.length ? medicalCareCase.length : count + COUNT);

  useEffect(() => {
    setCount(COUNT);
  }, [medicalCareCase]);

  const clickOpenMCC = useCallback(
    (caseBizKey: number) => {
      window.open(
        `${AppSettings.get(
          "REACT_APP_ROOT_FOLDER"
        )}/diseaseCard/${registerId}/${patientId}/${caseBizKey}/medicalCareCaseCard`
      );
    },
    [registerId, patientId]
  );
  const onDownloadDocument = useCallback(async (medDocViewId: string, fileName = "Без имени") => {
    try {
      const result = await new IntegralDiseaseEpicrisisApiRequest().getViewDocument(medDocViewId);
      // @ts-ignore
      if (result?.isError) {
        throw result;
      } else {
        if (result) {
          saveAs(result as Blob, fileName.replaceAll(".", "_"));
        }
      }
    } catch (error) {
      errorPopup(error.message);
    }
  }, []);

  if (!visibleCareCase?.length) return null;
  return (
    <Card
      id={"medical_care_case"}
      title={"Случаи медицинского обслуживания"}
      max_height={600}
      containerStyle={{ flexShrink: 0, marginBottom: 0 }}
      overflowY={"scroll"}
    >
      {visibleCareCase?.map((item) => (
        <BorderGreen key={item.caseBizKey} style={{ overflow: "visible", marginBottom: "5px" }}>
          <Accordion
            hiddenPadding
            hiddenBorder
            title={
              <div>
                <CardParamLine>
                  <div>
                    <CardParamTitle>{item.period}</CardParamTitle>
                    <CardParamTitle>{item.duration}</CardParamTitle>
                  </div>
                  <CardParamValue>
                    <MedCareCaseIconContainer calendarType={item.calendarCaseType}>
                      {getIconCareCase(item.calendarCaseType)}
                    </MedCareCaseIconContainer>
                  </CardParamValue>
                </CardParamLine>

                <CustomStyled>
                  <CardParamTitle>ЛПУ:</CardParamTitle>
                  <CardParamValue>{item.caseLpu}</CardParamValue>
                </CustomStyled>
              </div>
            }
          >
            <BlockLine>
              <Type>Тип СМО:</Type>
              <Value>{item.caseTypeName}</Value>
            </BlockLine>
            {item.deathReason ? (
              <BlockLine>
                <Type>Причина смерти:</Type>
                <Value>{item.deathReason}</Value>
              </BlockLine>
            ) : null}
            {!!item.diagnoses?.length && (
              <>
                <BlockLine>Диагнозы:</BlockLine>
                {item.diagnoses.map((d, index) => (
                  <BorderGreen key={index}>
                    <BlockLine style={{ marginBottom: "4px" }}>
                      <Type style={{ width: "35%" }}>Диагноз:</Type>
                      <Value style={{ width: "65%" }}>{d?.diagnoseName}</Value>
                    </BlockLine>
                    <BlockLine style={{ marginBottom: "4px" }}>
                      <Type style={{ width: "35%" }}>Тип:</Type>
                      <Value style={{ width: "65%" }}>{d?.diagnoseType}</Value>
                    </BlockLine>
                    <BlockLine style={{ marginBottom: "4px" }}>
                      <Type style={{ width: "35%" }}>Стадия:</Type>
                      <Value style={{ width: "65%" }}>{d?.diagnoseState}</Value>
                    </BlockLine>
                  </BorderGreen>
                ))}
              </>
            )}
          </Accordion>

          {!!item.medDoc?.length && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
              <Title>Переданные документы:</Title>
              {item.medDoc?.map((doc) => {
                const docTitle = (
                  <DocTitle key={doc.medDocBizKey} notObservation={!doc.observation?.length}>
                    {doc.header}
                    {doc?.medDocViewId && (
                      <LinkWrapper>
                        <IconContainerFloatingmes
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDownloadDocument(doc.medDocViewId, doc.header);
                          }}
                          id={"open_settings"}
                          title={"Открыть вложение"}
                          position="left"
                        >
                          <IconEye />
                        </IconContainerFloatingmes>
                      </LinkWrapper>
                    )}
                  </DocTitle>
                );
                return !!doc.observation?.length ? (
                  <Accordion key={doc.medDocBizKey} title={docTitle}>
                    <Title>Параметры наблюдения пациента:</Title>
                    <BorderGreen>
                      {doc.observation?.map(({ name, value }) => (
                        <div key={name} style={{ marginBottom: "10px" }}>
                          <span>
                            <strong>
                              {name}:{"  "}
                            </strong>
                            {value}
                          </span>
                        </div>
                      ))}
                    </BorderGreen>
                  </Accordion>
                ) : (
                  docTitle
                );
              })}
            </div>
          )}
          <StyledBorderGreen onClick={() => clickOpenMCC(item.caseBizKey)}>Открыть карту случая</StyledBorderGreen>
        </BorderGreen>
      ))}

      {count < medicalCareCase?.length && <ShowMore onClick={handleShowMore}>Показать больше</ShowMore>}
    </Card>
  );
};

const Title = styled.div`
  font-weight: bold;
  padding: 0 0 5px;
`;

const DocTitle = styled.div<{ notObservation?: boolean }>`
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin: ${({ notObservation }) => (notObservation ? "0 0 4px 0" : "0 5px 0 0")};
`;

export const MedCareCaseIconContainer = styled.div<{ calendarType: CalendarEventTypeEnum }>`
  background: ${theme.colors.lightRed};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 10px 7px;
  width: fit-content;

  ${(props) => {
    switch (props.calendarType) {
      case CalendarEventTypeEnum.Amb:
        return css`
          background: #a076dc;
          border: 2px solid #a076dc;
        `;
      case CalendarEventTypeEnum.Death:
        return css`
          background: #ebeff2;
          border: 2px solid #686b6d;
        `;
      case CalendarEventTypeEnum.MCase:
        return css`
          background: #ebeff2;
          border: 2px solid #686b6d;
        `;
      case CalendarEventTypeEnum.Emerg:
        return css`
          background: #29a3fd;
          border: 2px solid #29a3fd;
        `;
      case CalendarEventTypeEnum.Stat:
        return css`
          background: ${theme.colors.lightRed};
          border: 2px solid ${theme.colors.lightRed};
        `;
      case CalendarEventTypeEnum.More:
        return css`
          background: linear-gradient(180deg, #0fcdab 4.72%, #05c2b6 98.99%);
          border: 2px solid #0fcdab;
          box-shadow: 0 4px 13px rgba(96, 120, 144, 0.2);
        `;
      case CalendarEventTypeEnum.None:
        return css`
          background: #eceff2;
          border: 2px solid #eceff2;
        `;
    }
  }}
`;

const ShowMore = styled.div`
  text-align: center;
  line-height: 40px;
  border-top: 1px solid ${theme.colors.gray};
  cursor: pointer;
  color: ${theme.colors.green};
`;

const StyledBorderGreen = styled(BorderGreen)`
  color: ${theme.colors.green};
  cursor: pointer;
  margin-bottom: 12px;
  padding: 3px 3px;
  text-align: center;

  &:hover {
    opacity: 0.7;
  }
`;

const CustomStyled = styled(CardParamLine)`
  margin: 0;
`;
const LinkWrapper = styled.div`
  align-self: center;

  .iconFloatingmes {
    justify-content: flex - end;
    margin: 0;

    svg {
      width: 30px;

      path {
        fill: ${theme.colors.green};
      }
    }
  }
`;
