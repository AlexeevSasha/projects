import React, { useCallback, useContext, useState } from "react";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IPompResponse } from "../../../../../common/interfaces/IPompResponse";
import moment from "moment";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ProposalGeneralInfoThunk } from "../../../../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { GraphBlock } from "./GraphBlock";
import { Access } from "../../../../Proposal/helpers/access";
import { accessContext } from "../../../../Proposal/PageProposalQualityRequirements";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { ModalDeleteWIthIcon } from "../../../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  id: string;
  pomp: IPompResponse;
  showIconOpenBlock?: boolean;
  index: number;
}
export const PompBlock = (props: IProps) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { access } = useContext(accessContext);
  const { profiles } = useSelector(dictionaryClinrecPompSelector);

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    await dispatch(ProposalGeneralInfoThunk.deleteOrderPomp(Number(id), props.pomp.idPomp));
  }, [dispatch, props.pomp.idPomp, id]);

  return (
    <ClinrecBlockContainer key={props.id} id={props.id}>
      <TitleContainer open={open} child={!!props.pomp?.graphs?.length}>
        <LeftContainer>
          {access === Access.Edit && <ModalDeleteWIthIcon position={"right"} onDelete={onDelete} />}
          {props.showIconOpenBlock ? (
            open ? (
              <ContainerShow id={`close_block_${props.pomp.idPomp}`} onClick={() => setOpen(false)}>
                <IconGroupHide />
              </ContainerShow>
            ) : (
              <ContainerShow id={`open_block_${props.pomp.idPomp}`} onClick={() => setOpen(true)}>
                <IconGroupShow />
              </ContainerShow>
            )
          ) : (
            <ContainerShow />
          )}
          <PompName>{props.pomp.name}</PompName>
        </LeftContainer>
        <PompInfo>
          <InfoColumn width={"170px"}>
            <span>
              <RowTitle>№ </RowTitle>
              <RowValue>{props.pomp.revisionId || "Н/Д"}</RowValue>
            </span>
            <span>
              <RowTitle>Тип:</RowTitle>
              <RowValue>{props.pomp.isCustom ? "Пользовательская" : "Импортированная"}</RowValue>
            </span>
          </InfoColumn>
          <InfoColumn width={"285px"}>
            <span>
              <RowTitle>Профиль:</RowTitle>
              <RowValue>{profiles.find((p) => Number(p.value) === props.pomp.profile)?.label || "Н/Д"}</RowValue>
            </span>
            <span>
              <RowTitle>Статус:</RowTitle>
              <RowValue>{props.pomp?.status || "Н/Д"}</RowValue>
            </span>
          </InfoColumn>

          <InfoColumn>
            <span>
              <RowTitle>Дата утверждения:</RowTitle>
              <RowValue>
                {" "}
                {props.pomp.revisionBdate ? moment(props.pomp.revisionBdate).format("DD.MM.YYYY") : "Н/Д"}
              </RowValue>
            </span>
            <span>
              <RowTitle>Утратил силу:</RowTitle>
              <RowValue>
                {props.pomp.revisionEdate ? moment(props.pomp.revisionEdate).format("DD.MM.YYYY") : "Н/Д"}
              </RowValue>
            </span>
          </InfoColumn>
          <InfoColumn width={"150px"}>
            <span>
              <RowTitle>Последняя редакция:</RowTitle>
              <RowValue>
                {props.pomp.pompUpdated ? moment(props.pomp.pompUpdated).format("DD.MM.YYYY") : "Н/Д"}
              </RowValue>
            </span>
          </InfoColumn>
        </PompInfo>
      </TitleContainer>
      {open ? (
        <>
          {props.pomp.graphs.map((item, index) => (
            <GraphBlock
              key={props.id + "_graphBlock_" + item.idGraph}
              id={props.id + "_graphBlock_" + item.idGraph}
              pompId={props.index}
              index={index}
              graph={item}
              showIconOpenBlock={true}
            />
          ))}
        </>
      ) : null}
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
const PompInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoColumn = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "200px")};
  display: flex;
  flex-direction: column;
  margin-right: 10px;
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
  margin-right: 5px;
`;
const RowValue = styled.span`
  margin-left: 2px;
  align-items: end;
`;

const PompName = styled.div`
  word-break: break-word;
  font-weight: 600;
  margin-left: 15px;
  align-self: center;
`;

const LeftContainer = styled.div`
  width: 45%;
  display: flex;
  span {
    align-self: center;
  }
  .iconFloatingmes {
    padding-bottom: 5px;
  }
`;
