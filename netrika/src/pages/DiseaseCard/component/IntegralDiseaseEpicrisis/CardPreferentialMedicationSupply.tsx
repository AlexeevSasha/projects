import { selectPreferentialMedicationSupply } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { BlockLine } from "../../style/BlockLine";
import { BorderGreen } from "../../style/BorderGreen";
import { Type, Value } from "../../style/Description";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import moment from "moment";
import { theme } from "../../../../common/styles/theme";
import { styled } from "../../../../common/styles/styled";
import { Accordion } from "../../../../common/components/Accordion/Accordion";

interface IProps {
  registerId: string;
  patientId: string;
}

export const CardPreferentialMedicationSupply: React.FC<IProps> = ({ registerId, patientId }) => {
  const dispatch = useDispatch();
  const { preferentialMedicationSupply, loadingPreferentialMedicationSupply } = useSelector(
    selectPreferentialMedicationSupply
  );
  const preferentialMedicationSupplyList = Object.entries(preferentialMedicationSupply);

  const openCard = useCallback(() => {
    if (Object.keys(preferentialMedicationSupply).length === 0 && preferentialMedicationSupply.constructor === Object) {
      dispatch(DiseaseCardEpicrisisThunk.getPreferentialMedicationSupply(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, preferentialMedicationSupply]);

  const infoList = useMemo(() => {
    return preferentialMedicationSupplyList.map((medBlock, index) => (
      <Accordion hiddenPadding hiddenBorder key={`LLO_${index}`} title={`${medBlock[0]}`}>
        <div key={`${medBlock[0]}_${index}`}>
          {medBlock[1]?.map((item, index) => (
            <BorderGreen key={`llo_item_${index}`}>
              {item.issuedDate ? (
                <BlockLine>
                  <Type>Дата выдачи рецепта /назначения на препарат:</Type>
                  <Value>{moment(item.issuedDate).format("DD.MM.YYYY hh:mm")}</Value>
                </BlockLine>
              ) : null}
              {item.prescribedMedOrganization ? (
                <BlockLine>
                  <Type>МО медицинского работника:</Type>
                  <Value>{item.prescribedMedOrganization}</Value>
                </BlockLine>
              ) : null}
              {item.fullName ? (
                <BlockLine>
                  <Type>ФИО медицинского работника:</Type>
                  <Value>{item.fullName}</Value>
                </BlockLine>
              ) : null}
              {item.status ? (
                <BlockLine>
                  <Type>Статус:</Type>
                  <Value>{item.status}</Value>
                </BlockLine>
              ) : null}
              {item.series ? (
                <BlockLine>
                  <Type>Серия рецепта/назначения:</Type>
                  <Value>{item.series}</Value>
                </BlockLine>
              ) : null}
              {item.number ? (
                <BlockLine>
                  <Type>Номер рецепта/назначения:</Type>
                  <Value>{item.number}</Value>
                </BlockLine>
              ) : null}
              {item.courseDose ? (
                <BlockLine>
                  <Type>Доза курса:</Type>
                  <Value>{item.courseDose}</Value>
                </BlockLine>
              ) : null}
              {item.medicineName ? (
                <BlockLine>
                  <Type>Наименование препарата:</Type>
                  <Value>{item.medicineName}</Value>
                </BlockLine>
              ) : null}
              {item.medicineUseWay ? (
                <BlockLine>
                  <Type>Способ применения:</Type>
                  <Value>{item.medicineUseWay}</Value>
                </BlockLine>
              ) : null}
              {item.anatomicTherapeuticChemicalClassificationCode ? (
                <BlockLine>
                  <Type>Сведения о препарате:</Type>
                  <Value>{item.anatomicTherapeuticChemicalClassificationCode}</Value>
                </BlockLine>
              ) : null}
            </BorderGreen>
          ))}
        </div>
      </Accordion>
    ));
  }, [preferentialMedicationSupplyList]);

  return (
    <Card
      id={"preferentialMedicationSupply"}
      title={"Льготное лекарственное обеспечение"}
      max_height={600}
      isEmpty={preferentialMedicationSupplyList.length === 0 || preferentialMedicationSupply.items?.length === 0}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingPreferentialMedicationSupply ? (
        <IconLoading />
      ) : (
        <>
          {preferentialMedicationSupplyList.length ? (
            <AccordionContainer>{infoList}</AccordionContainer>
          ) : (
            <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>
              Нет льготного лекарственного обеспечения
            </div>
          )}
        </>
      )}
    </Card>
  );
};

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
