import { theme } from "common/styles/theme";
import { diseaseCardPatientManagementSelector } from "module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "../../../../../common/styles/styled";
import { IconCross } from "../../../../../common/components/Icon/IconCross";
import { BlockLine } from "../../../style/BlockLine";
import { Type } from "../../../style/Description";
import { ViolationConstructor } from "./ModalMoreInfo/ViolationConstructor";
import { BorderGreen } from "../../../style/BorderGreen";
import { IconContainerFloatingmes } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconEye } from "../../../../../common/components/Icon/IconEye";
import { IntegralDiseaseEpicrisisApiRequest } from "../../../../../api/integralDiseaseEpicrisisApiRequest";
import { saveAs } from "file-saver";
import { errorPopup } from "../../../../../common/helpers/toast/error";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";

interface IProps {
  onClose: () => void;
  bizKey?: number;
}

export const ModalMoreInfo: React.FC<IProps> = (props) => {
  const [activeInfo, setActiveInfo] = useState(true);
  const [activeViolat, setActiveViolat] = useState(false);

  const { calendarDay } = useSelector(diseaseCardPatientManagementSelector);
  const info = calendarDay.find((f) => f.caseId === props.bizKey)?.caseData;
  const statuses = calendarDay.find((f) => f.caseId === props.bizKey)?.statuses;

  const onDownloadDocument = useCallback(async (medDocViewId: string, fileName = "Без имени") => {
    try {
      const result = await new IntegralDiseaseEpicrisisApiRequest().getViewDocument(medDocViewId);
      // @ts-ignore
      if (result?.isError) {
        throw result;
      } else {
        if (result) {
          saveAs(result as Blob, fileName);
        }
      }
    } catch (error) {
      errorPopup(error.message);
    }
  }, []);

  const clickInfo = useCallback(() => {
    setActiveInfo(true);
    setActiveViolat(false);
  }, []);

  const clickViolat = useCallback(() => {
    setActiveInfo(false);
    setActiveViolat(true);
  }, []);

  return (
    <Container>
      <CrossContainer id={"modal_lpu_close"} onClick={props.onClose}>
        <IconCross hideFloatingmes />
      </CrossContainer>

      <Title>Поступление в ЛПУ</Title>

      <MenuContainer>
        <ElementMenu id={"link_info"} active={activeInfo} onClick={clickInfo}>
          Информация
        </ElementMenu>
        <ElementMenu id={"link_violat"} active={activeViolat} onClick={clickViolat}>
          Критерии качества
        </ElementMenu>
      </MenuContainer>
      {activeInfo ? (
        info ? (
          <BlockInfo>
            {info.caseOpenAt && (
              <StyleBlockLine>
                <StyledType>Дата начала:</StyledType>
                <Value id={"date_start"}>{moment(info.caseOpenAt).format("DD MMMM YYYY ")}</Value>
              </StyleBlockLine>
            )}
            {info.caseCloseAt && (
              <StyleBlockLine>
                <StyledType>Дата завершения:</StyledType>
                <Value id={"date_end"}>{moment(info.caseCloseAt).format("DD MMMM YYYY ")}</Value>
              </StyleBlockLine>
            )}
            {info.caseLpu && (
              <StyleBlockLine>
                <StyledType>ЛПУ:</StyledType>
                <Value id={"lpu"}>{info.caseLpu}</Value>
              </StyleBlockLine>
            )}
            {info.caseTypeName && (
              <StyleBlockLine>
                <StyledType>Тип СМО:</StyledType>
                <Value id={"smo"}>{info.caseTypeName}</Value>
              </StyleBlockLine>
            )}

            {!!info.diagnoses?.length && (
              <Accordion styleContainer={{ marginBottom: 12 }} title={<StyledType>Диагнозы:</StyledType>}>
                {info?.diagnoses?.map((d, index) => (
                  <BorderGreen key={index} style={{ margin: 0 }}>
                    {d?.diagnoseName && (
                      <DiagnoseBlockLine>
                        <StyledType style={{ width: "25%" }}>Название диагноза:</StyledType>
                        <DiagnoseValue style={{ width: "75%" }} id={"diagnose_name"}>
                          {d.diagnoseName}
                        </DiagnoseValue>
                      </DiagnoseBlockLine>
                    )}
                    {d?.diagnoseType && (
                      <DiagnoseBlockLine>
                        <StyledType style={{ width: "25%" }}>Тип диагноза:</StyledType>
                        <DiagnoseValue style={{ width: "75%" }} id={"diagnose_type"}>
                          {d.diagnoseType}
                        </DiagnoseValue>
                      </DiagnoseBlockLine>
                    )}
                    {d?.diagnoseState && (
                      <DiagnoseBlockLine>
                        <StyledType style={{ width: "25%" }}>Стадия диагноза:</StyledType>
                        <DiagnoseValue style={{ width: "75%" }} id={"diagnose_state"}>
                          {d.diagnoseState}
                        </DiagnoseValue>
                      </DiagnoseBlockLine>
                    )}
                  </BorderGreen>
                ))}
              </Accordion>
            )}

            {!!info?.medDoc?.length && (
              <Accordion styleContainer={{ marginBottom: 12 }} title={<StyledType>Документы:</StyledType>}>
                <AccordionContent>
                  {info.medDoc.map((item, i) => (
                    <DocumentBlockLine key={i}>
                      {item.header && <NameParam style={{ width: "65%" }}>{item.header}</NameParam>}
                      {item.medDocViewId && (
                        <LinkWrapper style={{ width: "16px" }}>
                          <IconContainerFloatingmes
                            id={"open_settings"}
                            title={"Открыть вложение"}
                            position="left"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              item.medDocViewId && onDownloadDocument(item.medDocViewId, item.header || "");
                            }}
                          >
                            <IconEye />
                          </IconContainerFloatingmes>
                        </LinkWrapper>
                      )}
                    </DocumentBlockLine>
                  ))}
                </AccordionContent>
              </Accordion>
            )}

            {!!info?.servicesAppointed?.length && (
              <>
                <StyleBlockLine>
                  <StyledType>Исполненные услуги:</StyledType>
                </StyleBlockLine>
                {info.servicesAppointed.map((item, index) => (
                  <StyleBlockLine key={index}>
                    <ServicesText
                      id={"servicesAppointed_" + index}
                    >{`${item.serviceTypeCod} - ${item.serviceName}`}</ServicesText>
                  </StyleBlockLine>
                ))}
              </>
            )}
            {!!info?.servicesExecuted?.length && (
              <>
                <StyleBlockLine>
                  <StyledType>Назначенные услуги:</StyledType>
                </StyleBlockLine>
                {info.servicesExecuted.map((item, index) => (
                  <StyleBlockLine key={index}>
                    <ServicesText
                      id={"servicesExecuted_" + index}
                    >{`${item.serviceTypeCod} - ${item.serviceName}`}</ServicesText>
                  </StyleBlockLine>
                ))}
              </>
            )}
            {!!info?.servicesNoStatus?.length && (
              <>
                <StyleBlockLine>
                  <StyledType>Услуги без указания статуса исполнения:</StyledType>
                </StyleBlockLine>
                {info.servicesNoStatus.map((item, index) => (
                  <StyleBlockLine key={index}>
                    <ServicesText
                      id={"servicesExecuted_" + index}
                    >{`${item.serviceTypeCod} - ${item.serviceName}`}</ServicesText>
                  </StyleBlockLine>
                ))}
              </>
            )}
          </BlockInfo>
        ) : (
          <></>
        )
      ) : (
        <>
          {statuses?.length && <ViolationConstructor parentId={0} data={statuses} show={true} bizKey={props.bizKey} />}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border: 1px solid ${theme.colors.grayBlue};
  background: ${theme.colors.white};
  padding: 20px;
  width: 47%;
  z-index: 999;
`;

const CrossContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 101%;
  color: ${theme.colors.black};
  margin-bottom: 14px;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const ElementMenu = styled.div<{ active: boolean }>`
  padding: 16px;
  border-bottom: 2px solid ${(props) => (props.active ? theme.colors.green : theme.colors.white)};
  color: ${(props) => (props.active ? theme.colors.green : "#AEAEBE")};
  cursor: pointer;
`;

export const Value = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: 130%;
  letter-spacing: 0.005em;
  color: ${theme.colors.black};
  margin-bottom: 23px;

  svg {
    margin-left: 8px;
  }
`;
export const DiagnoseValue = styled(Value)`
  margin-bottom: 0;
`;
const DiagnoseBlockLine = styled(BlockLine)`
  margin-bottom: 5px;
`;
const BlockInfo = styled.div`
  text-align: left;
  padding: 15px 0 0;
  overflow: auto;
  max-height: 400px;

  div div {
    font-weight: 100;
  }
`;
const ServicesText = styled(Value)`
  width: 100% !important;
`;
const StyledType = styled(Type)`
  color: ${theme.colors.hightGray};
  width: 35%;
`;

const StyleBlockLine = styled(BlockLine)`
  margin: 0;
`;

const DocumentBlockLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameParam = styled.span`
  color: ${theme.colors.black};
`;

const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkWrapper = styled.div`
  width: 20px;
  align-items: flex-end;

  .iconFloatingmes {
    justify-content: flex-end;
    margin: 0;

    svg {
      width: 30px;

      path {
        fill: ${theme.colors.green};
      }
    }
  }
`;
