import React, { useContext, useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IClinrec } from "../../../../../common/interfaces/clinrec/IClinrec";
import moment from "moment";
import { IconContainer } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import { StageBlock } from "./StageBlock";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";

interface IProps {
  id: string;
  clinrec: IClinrec;
  showIconOpenBlock?: boolean;
}
export const ClinrecBlock = (props: IProps) => {
  const { clinrecSelects } = useSelector(dictionaryClinrecPompSelector);
  const { hideStatusCounter } = useContext(IsOpenCardContext);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <ClinrecBlockContainer key={props.clinrec.idClinrec} id={props.id}>
      <TitleContainer open={open} child={!!props.clinrec?.stages?.length} onClick={() => setOpen(!open)}>
        <LeftContainer>
          <ClinrecName>{props.clinrec.clinrecName}</ClinrecName>
          <ClinrecInfo>
            <InfoColumn width={"120px"}>
              <span>
                <RowTitle>№</RowTitle>
                <RowValue>
                  {props.clinrec.isCustom ? props.clinrec.idRubricatorMz ?? "Н/Д" : props.clinrec.revisionId ?? "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Версия:</RowTitle>
                <RowValue>{props.clinrec.version ?? "Н/Д"}</RowValue>
              </span>
            </InfoColumn>
            <InfoColumn>
              <span>
                <RowTitle style={{ maxWidth: "80px" }}>Возрастная категория:</RowTitle>
                <RowValue>
                  {!!props.clinrec.ageGroup?.length
                    ? props.clinrec.ageGroup?.map((age) => age.description).join(", ")
                    : "Н/Д"}
                </RowValue>{" "}
              </span>
              <span>
                <RowTitle>Тип:</RowTitle>
                <RowValue>{props.clinrec.isCustom ? "Пользовательская" : "Импортированная"}</RowValue>
              </span>
            </InfoColumn>

            <InfoColumn width={"150px"}>
              <span>
                <RowTitle>Год утверждения:</RowTitle>
                <RowValue>
                  {props.clinrec.revisionBdate ? moment(props.clinrec.revisionBdate).format("YYYY") : "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Пересмотр не позднее:</RowTitle>
                <RowValue>
                  {props.clinrec.revisionEdate ? moment(props.clinrec.revisionEdate).format("YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"285px"}>
              <span>
                <RowTitle>Статус:</RowTitle>
                <RowValue>
                  {clinrecSelects.clinrecStatus?.find((s) => Number(s.value) === props.clinrec.status)?.label || "Н/Д"}
                </RowValue>
              </span>
              <span>
                <RowTitle>Статус применения:</RowTitle>
                <RowValue>
                  {clinrecSelects.clinrecUsageStatus?.find((s) => Number(s.value) === props.clinrec.usageStatus)
                    ?.label || "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
            <InfoColumn width={"150px"}>
              <span>
                <RowTitle>Последняя редакция:</RowTitle>
                <RowValue>
                  {props.clinrec.clinrecUpdated ? moment(props.clinrec.clinrecUpdated).format("DD.MM.YYYY") : "Н/Д"}
                </RowValue>
              </span>
            </InfoColumn>
          </ClinrecInfo>
        </LeftContainer>

        <IconContainer id={`pomp_${props.id}`}>
          <IconArrow rotate={open ? "" : "270deg"} />
        </IconContainer>
      </TitleContainer>
      {open &&
        props.clinrec.stages?.map((stage, index) => (
          <StageBlock
            key={props.id + "_stageBlock_" + stage.stageCode}
            id={props.id + "_stageBlock_" + stage.stageCode}
            first={index === 0}
            showStatusCounter={!hideStatusCounter}
            stage={stage}
          />
        ))}
    </ClinrecBlockContainer>
  );
};

const ClinrecBlockContainer = styled.div`
  justify-content: space-between;
  background: ${theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  border: 1px solid ${theme.colors.gray};
`;

const TitleContainer = styled.div<{ open: boolean; child: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ open, child }) => (open && child ? "15px" : "0")};
`;

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
`;
const ClinrecInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoColumn = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "200px")};

  display: flex;
  flex-direction: column;
  padding-right: 5px;

  span {
    &:first-child span {
      margin-bottom: 8px;
    }
    display: inline-flex;
  }
`;

const RowTitle = styled.span`
  max-width: 100px;
  font-weight: bold;
  align-items: baseline;
`;
const RowValue = styled.span`
  margin-left: 2px;
  align-items: end;
`;

const ClinrecName = styled.div`
  min-width: 60px;
  width: 40%;
  word-break: break-word;
  font-weight: 600;
  margin-left: 15px;
  align-self: center;
`;
