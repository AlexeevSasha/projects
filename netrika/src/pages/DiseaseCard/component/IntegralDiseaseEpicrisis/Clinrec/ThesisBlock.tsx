import React, { useEffect, useState } from "react";
import { styled } from "../../../../../common/styles/styled";
import { theme } from "../../../../../common/styles/theme";
import { IconArrow } from "../../../../../common/components/Icon/IconArrow";
import {
  IconContainer,
  IconContainerFloatingmes,
} from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { ContainerShow } from "../../../../Proposal/components/DiseaseInfo/styles";
import { IconGroupHide } from "../../../../../common/components/Icon/IconGroupHide";
import { IconGroupShow } from "../../../../../common/components/Icon/IconGroupShow";
import { IClinrecThesis } from "../../../../../common/interfaces/clinrec/IClinrecThesis";
import { CriterionExecuteResultEnum } from "../../../../../common/interfaces/CriterionExecuteResultEnum";
import { IconSuccessViolation } from "../../../../../common/components/Icon/IconSuccessViolation";
import { IconUnknownViolation } from "../../../../../common/components/Icon/IconUnknownViolation";
import { IconErrorViolation } from "../../../../../common/components/Icon/IconErrorViolation";
import { ru } from "../../../../../common/lang/ru";
import { IconEdit } from "../../../../../common/components/Icon/IconEdit";
import { ProposalQualityRequirementsAction } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsAction";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { proposalQualityRequirementsSelector } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsSelector";
import { Access, orderAccess } from "../../../../Proposal/helpers/access";
import { orderStatusSelector } from "../../../../../module/orderStatus/orderStstusSelector";
import { authorizationSelector } from "../../../../../module/authorization/authorizationSelector";
import { IOrderQualityCriterion } from "../../../../../common/interfaces/order/IOrderQualityCriterion";
import { ProposalQualityRequirementsThunk } from "../../../../../module/proposalQualityRequirements/proposalQualityRequirementsThunk";
import moment from "moment";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { IClinrecQualityCriterion } from "../../../../../common/interfaces/clinrec/IClinrecQualityCriterion";
import { IOrderQualityCriterionCurrentItem } from "../../../../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { ActivityBlock } from "./ActivityBlock";
import { css } from "styled-components";
import { modal } from "../../../../../common/helpers/event/modalEvent";
import { ModalAddQualityRequirements } from "../../../../Proposal/components/QualityRequirements/ModalAddQualityRequirements";
import { getTitleModal } from "../../../../../common/helpers/getTitle";

interface IProps {
  id: string;
  thesis: IClinrecThesis;
}

export const ThesisBlock = (props: IProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const stateAuth = useSelector(authorizationSelector);
  const { orderStatus } = useSelector(orderStatusSelector);
  const state = useSelector(proposalQualityRequirementsSelector);

  const [qualityCriterionItem, setQualityCriterionItem] = useState<
    IClinrecQualityCriterion | IOrderQualityCriterionCurrentItem
  >();
  const [access, setAccess] = useState<Access>(Access.View);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccess(orderAccess(stateAuth.login, orderStatus));
  }, [stateAuth.login, orderStatus]);

  const updateQualityRequirements = (data: IOrderQualityCriterion) => {
    dispatch(ProposalQualityRequirementsThunk.update(data, true, (value) => setQualityCriterionItem(value)));
  };

  useEffect(() => {
    if (props.thesis.qualityCriterion) setQualityCriterionItem(props.thesis.qualityCriterion);
  }, [props.thesis.qualityCriterion]);

  const openModalQuality = () => {
    const type = access === "edit" ? "edit" : "view";

    modal.open(
      <ModalAddQualityRequirements
        disabled={type === "view"}
        option={state.queryList}
        onUpdate={updateQualityRequirements}
        options={state.parentCriterion}
        orderId={+id}
        formCrOrPomp={true}
        title={getTitleModal(type, "criteria")}
      />
    );
  };

  return (
    <>
      <ThesisContent>
        <ThesisHeader onClick={() => setOpen(!open)}>
          {props.thesis.qualityCriterion?.status && (
            <ThesisStatus>
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.MetRequirement && (
                <IconSuccessViolation />
              )}
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotEnoughDataRequirement && (
                <IconUnknownViolation />
              )}
              {props.thesis.qualityCriterion?.status === CriterionExecuteResultEnum.NotMetRequirement && (
                <IconErrorViolation />
              )}
            </ThesisStatus>
          )}
          {open ? (
            <ContainerShow id={`close_thesis_${props.id}`}>
              <IconGroupHide />
            </ContainerShow>
          ) : (
            <ContainerShow id={`open_thesis_${props.id}`}>
              <IconGroupShow />
            </ContainerShow>
          )}
          <ThesisText open={open}>{props.thesis.thesisText}</ThesisText>
        </ThesisHeader>
        {open && qualityCriterionItem && (
          <FlexContainer
            direction={"row"}
            justify={"space-between"}
            style={{
              border: `1px solid ${theme.colors.gray}`,
              borderRadius: "10px",
              margin: "5px 0px",
              padding: "8px",
            }}
          >
            <QualityCriterionItem id={"column_baseUrl"}>{qualityCriterionItem.name}</QualityCriterionItem>
            <QualityCriterionItem id={"column_idInternal"}>{qualityCriterionItem.description}</QualityCriterionItem>
            {qualityCriterionItem.updatedAt && (
              <QualityCriterionItem id={"column_systemOid"}>
                {moment(qualityCriterionItem.updatedAt).format("DD MMMM YYYY")}
              </QualityCriterionItem>
            )}
            <IconContainer>
              <IconContainerFloatingmes
                title={ru.floatingmes.edit}
                onClick={() => {
                  dispatch(
                    ProposalQualityRequirementsAction.fullItem.done({
                      params: null,
                      result: { ...qualityCriterionItem, orderId: +id },
                    })
                  );
                  openModalQuality();
                }}
              >
                <IconEdit />
              </IconContainerFloatingmes>
            </IconContainer>
          </FlexContainer>
        )}
        {open && (
          <ThesisTitleContainer style={{ margin: "5px", marginLeft: "9px" }}>
            <span>
              <RowTitle>Номер:</RowTitle> <RowValue> {props.thesis.number || "—"}</RowValue>
            </span>
            <span>
              <RowTitle>Уровень убедительности:</RowTitle> <RowValue> {props.thesis.convincing || "—"}</RowValue>
            </span>
            <span>
              <RowTitle>Уровень доказательности:</RowTitle> <RowValue> {props.thesis.evidential || "—"}</RowValue>
            </span>
            {props.thesis?.stadia && (
              <span>
                <RowTitle>Стадия опухолевого процесса:</RowTitle> <RowValue> {props.thesis.stadia}</RowValue>
              </span>
            )}
            {props.thesis?.tnm && (
              <span>
                <RowTitle>TNM:</RowTitle> <RowValue> {props.thesis.tnm}</RowValue>
              </span>
            )}
          </ThesisTitleContainer>
        )}
        {open && props.thesis.comment && (
          <CustomThesisContent status={null}>
            <ThesisHeader onClick={() => setOpenComment(!openComment)} style={{ justifyContent: "space-between" }}>
              <ThesisTitleContainer>
                <RowTitle>Комментарий</RowTitle>
              </ThesisTitleContainer>

              <IconContainer id={`card_${props.id}_control`}>
                <IconArrow rotate={openComment ? "" : "270deg"} />
              </IconContainer>
            </ThesisHeader>
            {openComment && <>{props.thesis.comment}</>}
          </CustomThesisContent>
        )}

        {open &&
          props.thesis?.activities?.map((item, index) => (
            <ActivityBlock key={index} activity={item} id={props.id + "activityBlock_" + index} first={index === 0} />
          ))}
      </ThesisContent>
    </>
  );
};

const ThesisContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  margin: 10px 12px 0 55px;
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid
    ${({ status }) =>
      status === CriterionExecuteResultEnum.MetRequirement
        ? `${theme.colors.green}`
        : status === CriterionExecuteResultEnum.NotMetRequirement
        ? `${theme.colors.lightRed}`
        : `${theme.colors.gray}`};
`;

const CustomThesisContent = styled.div<{ status?: CriterionExecuteResultEnum | null }>`
  background: ${theme.colors.white};
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid
    ${({ status }) =>
      status === CriterionExecuteResultEnum.MetRequirement
        ? `${theme.colors.green}`
        : status === CriterionExecuteResultEnum.NotMetRequirement
        ? `${theme.colors.lightRed}`
        : `${theme.colors.gray}`};
`;

const ThesisHeader = styled.div`
  display: flex;
  cursor: pointer;
`;
const ThesisTitleContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const ThesisStatus = styled.div<{ first?: boolean; showIconOpenBlock?: boolean }>`
  z-index: 2;
  background: white;
  border-right: none;
  border-top: none;
  bottom: -2px;
  left: -24px;
`;

const QualityCriterionItem = styled.p`
  margin: 0 8px;
`;

const ThesisText = styled.div<{ open: boolean }>`
  margin-left: 5px;
  ${(props) =>
    props.open
      ? css`
          width: 95%;
        `
      : css`
          width: 95%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
`;
const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const RowValue = styled.span`
  margin-right: 10px;
`;
