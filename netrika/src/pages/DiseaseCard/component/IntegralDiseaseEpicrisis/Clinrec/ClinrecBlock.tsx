import React, { useCallback, useContext, useState } from "react";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IClinrec } from "../../../../../common/interfaces/clinrec/IClinrec";
import moment from "moment";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StageBlock } from "./StageBlock";
import { accessContext } from "../../../../Proposal/PageProposalQualityRequirements";
import { Access } from "../../../../Proposal/helpers/access";
import { ProposalGeneralInfoThunk } from "../../../../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { ModalDeleteWIthIcon } from "../../../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  id: string;
  clinrec: IClinrec;
  showIconOpenBlock?: boolean;
  ItemIndex: number;
}
export const ClinrecBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { access } = useContext(accessContext);
  const { clinrecSelects } = useSelector(dictionaryClinrecPompSelector);

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    await dispatch(ProposalGeneralInfoThunk.deleteOrderClinrec(Number(id), props.clinrec.idClinrec));
  }, [dispatch, id, props.clinrec.idClinrec]);

  return (
    <ClinrecBlockContainer key={props.clinrec.idClinrec} id={props.id}>
      <TitleContainer open={open} child={!!props.clinrec?.stages.length}>
        <LeftContainer>
          {access === Access.Edit && <ModalDeleteWIthIcon position={"right"} onDelete={onDelete} />}
          {props.showIconOpenBlock ? (
            open ? (
              <ContainerShow id={`close_block_${props.clinrec.idClinrec}`} onClick={() => setOpen(false)}>
                <IconGroupHide />
              </ContainerShow>
            ) : (
              <ContainerShow id={`open_block_${props.clinrec.idClinrec}`} onClick={() => setOpen(true)}>
                <IconGroupShow />
              </ContainerShow>
            )
          ) : (
            <ContainerShow />
          )}
          <ClinrecName>{props.clinrec.clinrecName}</ClinrecName>
        </LeftContainer>
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
              </RowValue>
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
                {clinrecSelects.clinrecUsageStatus?.find((s) => Number(s.value) === props.clinrec.usageStatus)?.label ||
                  "Н/Д"}
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
      </TitleContainer>

      {open &&
        props.clinrec.stages?.map((item) => (
          <StageBlock
            key={item.stageCode}
            id={props.id + "_stageBlock_" + item.stageCode}
            stage={item}
            showIconOpenBlock={true}
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
  padding: 10px 24px;
  border: 1px solid ${theme.colors.gray};
`;
const TitleContainer = styled.div<{ open: boolean; child: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ open, child }) => (open && child ? "15px" : "0")};
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
    display: inline-flex;
    &:first-child span {
      margin-bottom: 8px;
    }
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
  word-break: break-word;
  font-weight: 600;
  margin-left: 15px;
  align-self: center;
`;

const LeftContainer = styled.div`
  width: 35%;
  display: flex;
  span {
    align-self: center;
  }
  .iconFloatingmes {
    padding-bottom: 5px;
  }
`;
